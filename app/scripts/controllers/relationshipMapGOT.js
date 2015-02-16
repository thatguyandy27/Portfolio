'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('relationshipMapGOTCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {
   
   $scope.isLoading = true;
   $scope.message = "Retrieving data";

   $q.all([
        $http.get('../../data/got/nodes.json'),
        $http.get('../../data/got/links.json'),
    ]).then(function(responses){

        var nodes = responses[0].data;
        var links = responses[1].data;
        var width = 2000,
            height = 1000

        var svg = d3.select(".svgContainer").append("svg")
            .attr("width", width)
            .attr("height", height).append("g")
                .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom));

        function zoom() {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
        var force = d3.layout.force()
            .gravity(.05)
            .distance(100)
            .charge(-200)
            .theta(.1)
            .size([width, height]);

         force.nodes(nodes)
              .links(links)
              .start();


        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", "link");

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

         // node.append("image")
         //     .attr("xlink:href",function(d){ 
         //        if (d.image != 'none')
         //            return "http://awoiaf.westeros.org/" + d.image;
         //        else
         //            return "http://awoiaf.westeros.org/images/thumb/e/e7/Map_of_westeros.jpg/264px-Map_of_westeros.jpg";
         //        })
         //     .attr("x", -8)
         //     .attr("y", -8)
         //     .attr("width", 32)
         //     .attr("height", 32);

        node.append("text")
              .attr("dx", 24)
              .attr("dy", ".35em")
              .text(function(d) { return d.name });


        $scope.isLoading = true;
        $scope.message = "Generating Graph";


        // Use a timeout to allow the rest of the page to load first.
        setTimeout(function() {

              // Run the layout a fixed number of times.
              // The ideal number of times scales with graph complexity.
              // Of course, don't run too long—you'll hang the page!
            var n = 10;
            force.start();
            for (var i = n * n; i > 0; --i) force.tick();
            force.stop();

            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            // force.on("tick", function() {
            //     link.attr("x1", function(d) { return d.source.x; })
            //         .attr("y1", function(d) { return d.source.y; })
            //         .attr("x2", function(d) { return d.target.x; })
            //         .attr("y2", function(d) { return d.target.y; });

            //     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            // });


            $scope.isLoading = false;
        }, 100);

    });    
}]);


    // var characters = [ {
    //         'name': "Walder Frey",
    //         'image': 'http://awoiaf.westeros.org/images/e/e6/Old_Walder_Frey.jpg',
    //         'id': 0,
    //         x: width/2,
    //         y: height/2
    //     },
    //     {
    //         'name': 'Perra Royce',
    //         'image': 'http://awoiaf.westeros.org/images/e/ed/Royce.png',
    //         'id':1
    //     },
    //     {
    //         'name': 'Stevron Frey',
    //         'image': 'http://awoiaf.westeros.org/images/f/fa/Stevron_Frey.png',
    //         'id':2
    //     },
    //     {
    //         name: 'Emmon Frey',
    //         'image':  'http://awoiaf.westeros.org/images/thumb/6/6e/Emmon_Frey_TheMico.jpg/250px-Emmon_Frey_TheMico.jpg', 
    //         id: 3
    //     },
    //     {
    //         name: 'Bethany Rosby',
    //         image: 'http://awoiaf.westeros.org/images/3/3f/House_Rosby.PNG', 
    //         id: 4
    //     },
    //     {
    //         name: 'Roslin Frey', 
    //         image: 'http://awoiaf.westeros.org/images/thumb/9/95/Roslin.jpg/300px-Roslin.jpg',
    //         id: 5
    //     },
    //     {
    //         name: 'Edmure Tully',
    //         image: 'http://awoiaf.westeros.org/images/5/56/Edmure_Tully.jpg',
    //         id: 6
    //     }
    // ];

    // var links = [{
    //     source: 0, target:1, type:'Marrage'
    // },
    // {
    //     source:0, target:2, type: 'Child'
    // },
    // {
    //     source:1, target:2, type: 'Child'
    // },
    // {
    //     source:3, target:2, type: 'Sibling'
    // },
    // {
    //     source:0, target:3, type: 'Child'
    // },
    // {
    //     source:1, target:3, type: 'Child'
    // },
    // {
    //     source: 0, target:4, type:'Marrage'
    // },
    // {
    //     source:0, target:5, type: 'Child'
    // },
    // {
    //     source:4, target:5, type: 'Child'
    // },
    // {
    //     source:2, target:5, type: 'Sibling'
    // },
    // {
    //     source:3, target:5, type: 'Sibling'
    // },
    // {
    //     source: 5, target:6, type:'Marrage'
    // }];

