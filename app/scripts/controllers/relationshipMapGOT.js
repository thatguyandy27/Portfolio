import d3 from 'd3';

const RelationshipMapGOTCtrl = function ($scope, sixDegreesOfWesterosService) {
   
    var startingRecords = [
       // 1927, //walder frey
        498, // eddard stark
        1863, // tywin lannister
        808, // hoster tully
        1549, //Robert Baratheon
        906, //jon arryn
        165, //Balon Greyjoy
     //   849, // jamie lannister
        385, // daenerys targaryn 
        471, //Doran Martell
        611 //Garlan Tyrell

    ];
    var indexMap = [];

    var nodes = [], 
        links = [],
        svg, 
        force, 
        link, 
        node;

    $scope.isLoading = true;
    $scope.message = "Retrieving data";

    var characterService  = sixDegreesOfWesterosService.getCharacterService();

    function initChart(){
        var width = 2000,
            height = 1000

        // create SVG and add zoom behavior
        svg = d3.select(".svgContainer").append("svg")
            .attr("width", width)
            .attr("height", height).append("g")
            .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
            .append("g");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height);

        function zoom() {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        // create force chart
        force = d3.layout.force()
            .size([width, height])
            .gravity(.05)
            .distance(200)
            .charge(-400)
            .on("tick", tick);

         // force.nodes(nodes)
         //    .links(links)
         //    .start();

        link = svg.selectAll(".link");

        node = svg.selectAll(".node");

        function tick() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            // node.attr("x", function(d) { return d.x; })
            //     .attr("y", function(d) { return d.y; });
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        }

    }

    function updateLayout(){

        force.nodes(nodes)
            .links(links)
            .start();

        // Update the links…
        link = link.data(links, function(d) { return d.target.id + "_" + d.source.id; });

        // Exit any old links.
        link.exit().remove();

        // Enter any new links.
        link.enter().insert("line", ".node")
            .attr("class", "link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        // Update the nodes…
        node = node.data(nodes, function(d) { return d.id; });//.style("fill", color);

        // Exit any old nodes.
        node.exit().remove();

            // Enter any new nodes.
        node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        node.append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });


        node.append("circle")
         //   .attr("cx", function(d) { return d.x; })
         //   .attr("cy", function(d) { return d.y; })
            .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });
           
//            .style("fill", color)
//            .on("click", click)
            //.call(force.drag);

  //      node.enter() .



        // force.nodes(nodes)
        //     .links(links)
        //     .start();

        // node = svg.selectAll(".node");


        // node.append("image")
        //      .attr("xlink:href",function(d){ 
        //         if (d.image != 'none')
        //             return "http://awoiaf.westeros.org/" + d.image;
        //         else
        //             return "http://awoiaf.westeros.org/images/thumb/e/e7/Map_of_westeros.jpg/264px-Map_of_westeros.jpg";
        //         })
        //      .attr("x", -8)
        //      .attr("y", -8)
        //      .attr("width", 32)
        //      .attr("height", 32);

        // node.append("text")
        //       .attr("dx", 24)
        //       .attr("dy", ".35em")
        //       .text(function(d) { return d.name });

    }


    characterService.retrieveData().then(function(responses){

        //add all of the starting characters and any links between them 
        var newNodes = []
        for( var i = 0; i < startingRecords.length; i++){
            // add the starting characters
            nodes.push(characterService.characters[startingRecords[i]]);
            indexMap[nodes[i].id]  = i;

            for (var j = 0; j < nodes.length - 1; j++){
                var newLinks = characterService.findLinkBetweenCharacters(
                    startingRecords[i], 
                    nodes[j].id);
                
                if (newLinks.length ==0){
                    console.log("link 0");
                }
                // see if link already exists if not add it. 
                for(var k = 0; k < newLinks.length; k++){
                    var newLink = newLinks[k];
                    // link isn't there
                    if (links.indexOf(newLink) == -1){
                        links.push(newLink);
                        //update the reference  
                        //Add inbetween nodes and update references.

                        if (newLink.target == null){
                            newLink.target = characterService.characters[newLink.id1];
                        }
                        if (newLink.source == null){
                            newLink.source = characterService.characters[newLink.id2];
                        }

                        if ( indexMap[newLink.id1] == null){
                            newNodes.push(newLink.target);
                            indexMap[newLink.id1] = true;
                        }
                        if ( indexMap[newLink.id2] == null){
                            newNodes.push(newLink.source);
                            indexMap[newLink.id2] = true;

                        }
                    }
                }
            }
        }

        // adding new nodes at the end
        Array.prototype.splice.apply(nodes, [nodes.length, 0].concat(newNodes));

       



        //links.push({target:0, source:1});

        // var nodes = characterService.characters;
        // var links = characterService.links;
        initChart();
        updateLayout();
        $scope.isLoading = true;
        $scope.message = "Generating Graph";


        // Use a timeout to allow the rest of the page to load first.
        // setTimeout(function() {

        //       // Run the layout a fixed number of times.
        //       // The ideal number of times scales with graph complexity.
        //       // Of course, don't run too long—you'll hang the page!
        //     // var n = 10;
        //     // force.start();
        //     // for (var i = n * n; i > 0; --i) force.tick();
        //     // force.stop();

        //     link.attr("x1", function(d) { return d.source.x; })
        //         .attr("y1", function(d) { return d.source.y; })
        //         .attr("x2", function(d) { return d.target.x; })
        //         .attr("y2", function(d) { return d.target.y; });

        //     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        //     // force.on("tick", function() {
        //     //     link.attr("x1", function(d) { return d.source.x; })
        //     //         .attr("y1", function(d) { return d.source.y; })
        //     //         .attr("x2", function(d) { return d.target.x; })
        //     //         .attr("y2", function(d) { return d.target.y; });

        //     //     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        //     // });


            $scope.isLoading = false;
        // }, 100);

    });    
};

RelationshipMapGOTCtrl.$inject = ['$scope', 'sixDegreesOfWesterosService'];

export default RelationshipMapGOTCtrl;

