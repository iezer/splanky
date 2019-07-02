/* eslint-disable ember-rules/no-function-prototype-extension-calls */
import Component from '@ember/component';
import d3 from 'd3';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Component.extend({
  classNames: [ 'force-graph' ],

  graph: null,
  selectedArtist: null,

  metrics: service(),
  router: service(),
  fastboot: service(),

  hoverArtist: null,
  mouseMove(event) {
    if(event.target.tagName === 'circle') {
      let artistId = event.target.getAttribute('dd-artist');
      if (artistId === this.get('hoverArtist.id')) { return; }
      let artist = this.get('graph.nodes').findBy('id', artistId);
      this.set('hoverArtist', artist);
    } else {
      this.set('hoverArtist', null);
    }
  },

  didReceiveAttrs() {
    if (this.get('fastboot.isFastBoot')) { return; }
    schedule('afterRender', () => this.doGraph());
  },

  doGraph() {
    let parent = document.querySelector('.index-container__column');
    let width = parent.offsetWidth;
    let height = parent.offsetHeight;
    this.setProperties({ height, width });


    let svg = d3.select("svg");

    let strength = this.selectedArtist ? -40 : -13;
    var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d) { return d.id; }))
          .force("charge", d3.forceManyBody().strength(function() { return strength; }))
          .force("center", d3.forceCenter(width / 2, height / 2))
//          .alphaDecay(0.04)
          .velocityDecay(0.5);
    window.simulation = simulation;
    let graph = this.graph;

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
    .on("tick", ticked);

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
  },

  actions: {
    selectArtist(artist) {
      let value = artist ? artist.get('id') : 'clear';

      this.metrics.trackEvent({
        category: 'ui-interaction',
        action: `select-artist-${value}`,
        label: 'force-graph'
      });

      if (artist) {
        this.router.transitionTo('artist', value);
      } else {
        this.router.transitionTo('index');
      }
    }
  }
});
