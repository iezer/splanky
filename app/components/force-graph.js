/* eslint-disable ember-rules/no-function-prototype-extension-calls */
import Component from 'ember-component';
import d3 from 'd3';

export default Component.extend({
  classNames: [ 'force-graph' ],

  graph: null,
  selectedArtist: null,

  didRender() {
    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d) { return d.id; }))
          .force("charge", d3.forceManyBody().strength(function() { return -4; }))
          .force("center", d3.forceCenter(width / 2, height / 2))
//          .alphaDecay(0.05)
          .velocityDecay(0.5);
    window.simulation = simulation;
    let graph = this.get('graph');

    var link = d3.select("svg g.force-graph__links")
          .selectAll("line")
          .data(graph.links);

    var node = d3.select("svg g.force-graph__nodes")
          .selectAll("g.node")
          .data(graph.nodes)
          .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked)
      .on("end", () => {
        simulation.nodes().forEach(n => {
          n.fx = n.x;
          n.fy = n.y;
        });
      });

    simulation.force("link")
      .links(graph.links);

    let radius = 5;
    function ticked() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("transform", function(d) {
          d.x = Math.max(radius, Math.min(width - radius, d.x));
          d.y = Math.max(radius, Math.min(height - radius, d.y));
          return "translate(" + d.x + "," + d.y + ")";
        });
    }

    function dragstarted(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }

      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(/* d */) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }

      // d.fx = null;
      // d.fy = null;
    }
  }
});
