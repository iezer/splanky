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
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

    let graph = this.get('graph');

    var link = d3.select("svg g.force-graph__links")
          .selectAll("line")
          .data(graph.links);

    var node = d3.select("svg g.force-graph__nodes")
          .selectAll("circle")
          .data(graph.nodes)
          .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(graph.links);

    function ticked() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

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

    function dragended(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }

      d.fx = null;
      d.fy = null;
    }
  }
});
