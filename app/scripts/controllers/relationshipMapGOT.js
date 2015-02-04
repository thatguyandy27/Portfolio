'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('relationshipMapGOTCtrl', ['$scope', function ($scope) {
    var width = 1000,
        height = 600;

    var characters = [ {
            'name': "Walder Frey",
            'image': 'http://awoiaf.westeros.org/images/e/e6/Old_Walder_Frey.jpg',
            'id': 0,
            x: width/2,
            y: height/2
        },
        {
            'name': 'Perra Royce',
            'image': 'http://awoiaf.westeros.org/images/e/ed/Royce.png',
            'id':1
        },
        {
            'name': 'Stevron Frey',
            'image': 'http://awoiaf.westeros.org/images/f/fa/Stevron_Frey.png',
            'id':2
        },
        {
            name: 'Emmon Frey',
            'image':  'http://awoiaf.westeros.org/images/thumb/6/6e/Emmon_Frey_TheMico.jpg/250px-Emmon_Frey_TheMico.jpg', 
            id: 3
        },
        {
            name: 'Bethany Rosby',
            image: 'http://awoiaf.westeros.org/images/3/3f/House_Rosby.PNG', 
            id: 4
        },
        {
            name: 'Roslin Frey', 
            image: 'http://awoiaf.westeros.org/images/thumb/9/95/Roslin.jpg/300px-Roslin.jpg',
            id: 5
        },
        {
            name: 'Edmure Tully',
            image: 'http://awoiaf.westeros.org/images/5/56/Edmure_Tully.jpg',
            id: 6
        }
    ];

    var links = [{
        source: 0, target:1, type:'Marrage'
    },
    {
        source:0, target:2, type: 'Child'
    },
    {
        source:1, target:2, type: 'Child'
    },
    {
        source:3, target:2, type: 'Sibling'
    },
    {
        source:0, target:3, type: 'Child'
    },
    {
        source:1, target:3, type: 'Child'
    },
    {
        source: 0, target:4, type:'Marrage'
    },
    {
        source:0, target:5, type: 'Child'
    },
    {
        source:4, target:5, type: 'Child'
    },
    {
        source:2, target:5, type: 'Sibling'
    },
    {
        source:3, target:5, type: 'Sibling'
    },
    {
        source: 5, target:6, type:'Marrage'
    }];

    var svg = d3.select('.svgContainer').append('svg')
        .attr('width', width)
        .attr('height', height);


    var force = d3.layout.force()
        .size([width, height])
        .nodes(characters)
        .links(links);

    force.linkDistance(width/3);
    
    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');

    var node = svg.selectAll('.node')
        .data(characters)
        .enter().append('circle')
        .attr('class', 'node');


    force.on('end', function() {

        // When this function executes, the force layout
        // calculations have concluded. The layout will
        // have set various properties in our nodes and
        // links objects that we can use to position them
        // within the SVG container.

        // First let's reposition the nodes. As the force
        // layout runs it updates the `x` and `y` properties
        // that define where the node should be centered.
        // To move the node, we set the appropriate SVG
        // attributes to their new values. We also have to
        // give the node a non-zero radius so that it's visible
        // in the container.

        node.attr('r', width/100)
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });

        // We also need to update positions of the links.
        // For those elements, the force layout sets the
        // `source` and `target` properties, specifying
        // `x` and `y` values in each case.

        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

    });

    // Okay, everything is set up now so it's time to turn
    // things over to the force layout. Here we go.

    force.start();
}]);
