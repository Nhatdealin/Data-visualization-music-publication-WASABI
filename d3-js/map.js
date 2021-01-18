
function updateMap(world, data_song, data_album, data_artist){
    var svg = d3.selectAll('#node').attr('width',document.getElementById('nodeDiv').offsetWidth);
        //Using this selection to update the SVG everytime the function is called
    svg.selectAll("*").remove();

    removeElementsByClass('d3-tip n');
    console.log(data_artist)
    
    var margin = {top: 0, right: 0, bottom: 0, left: 10};
    var width = document.getElementById('nodeDiv').offsetWidth - margin.left - margin.right;
    var height = document.getElementById('nodeDiv').offsetHeight - margin.top - margin.bottom;
    var format = d3.format(",");

// Set tooltips
    var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Songs: </strong><span class='details'>" + format(data_song.get(d.id) || 0) +"<br></span>"
                + "<strong>Albums: </strong><span class='details'>" + format(data_album.get(d.id) || 0) +"<br></span>"
                + "<strong>Artis: </strong><span class='details'>" + format(data_artist.get(d.id) || 0) +"<br></span>";
                })

    var color = d3.scaleThreshold()
        .domain([1, 11, 21 ,51, 101, 501, 1001, 5001, 10001])
        .range(d3.schemeBlues[9]);
    var g = svg.append("g")
        .attr("class", "legendThreshold")
        .attr("transform", "translate(20, 50)");
    g.append("text")
    .data(d3.range(10))
        .attr("class", "caption")
        .attr("x", 0)
        .attr("y", -6)
        .attr("class", "caption")
        .text("Number of songs")
        .style('fill', 'white')
        .style("font-weight", "bold")
    var labels = ['0', "1-10", '11-20', '21-50', '51-100', "101-501", "501-1000", "1001-5000", "5001-10K","> 10K"];


    var legend = d3.legendColor()
        .labels(function (d) { return labels[d.i]; })
        .shapePadding(4)
        .scale(color);

    svg.select(".legendThreshold")
        .style('fill', 'white')
        .style('font-size', '10px')
        .call(legend);


    var path = d3.geoPath();



    zoomed = ()=>{
        const {x,y,k} = d3.event.transform
        let t = d3.zoomIdentity
       t =  t.translate(x,y).scale(k).translate(50,50)
        svg.attr("transform", t)
      }
    var zoom = d3.zoom()
      .scaleExtent([1, 30])
      .on("zoom", zoomed);

    var svg = d3.select("#node")
                .attr("width", width)
                .attr("height", height)
                .call(zoom)
                .append('g')
                .attr('class', 'map')
                .append("g").attr('transform','translate(50,50)');
              
    // function zoomFn() {
    //     d3.select('#divBox').select('svg').select('g').attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
    // }

    var projection = d3.geoMercator()
                    .scale(0.03939*width + 0.084166*height+10)
                    .translate( [width/1.8, height /2.7]);

    var path = d3.geoPath().projection(projection);

    svg.call(tip);
    ready(world, data_song, data_album, data_artist)
    function ready(world, data_song, data_album, data_artist) {

    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(world.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", function (d){
                // Pull data for this country
                d.count = data_song.get(d.id) || 0;
                // Set the color
                return color(d.count);
            })
        .style('stroke', 'white')
        .style('stroke-width', 0.5)
        .style("opacity",1)
        // tooltips
            .style("stroke","white")
            .style('stroke-width', 0.3)
            .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
                .style("opacity", 0.8)
                .style("stroke","#85929E")
                .style("stroke-width",1.5);

            d3.select(this).style('cursor', 'pointer')
            })
            .on('click',function(d){
                tip.show(d);
    
                d3.select(this)
                    .style("opacity", 0.4)
                    .style("stroke","white")
                    .style("stroke-width",3)
                    .transition()
                    .duration(200)
                    .style('opacity', 0.8);

                    // d3.selectAll('.arrow').attr('visibility','visible')

                    document.getElementById('resetButton').style.visibility = 'visible';
                    selected_country = d.properties.name
                    countrySpecificBar(d.properties.name, gender)



            })
            .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
                .style("opacity", 1)
                .style("stroke","white")
                .style("stroke-width",0.3);
            });
    
}}
