function totalWorld(){

    var document_width = document.getElementById('latestCaseDiv').offsetWidth
    // set the dimensions and margins of the graph
    var margin = {top: 50, right: 20, bottom: 70, left: 0.10152284*document_width},
    width = document.getElementById('latestCaseDiv').offsetWidth - margin.left - margin.right,
    height = document.getElementById('latestCaseDiv').offsetHeight - margin.top - margin.bottom;

    d3.selectAll("#latestCasesNode").selectAll('*').remove()
        
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#latestCasesNode").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")");

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    data = [total_summary.total_song, total_summary.total_album, total_summary.total_artist]

    ordinals = ['Total songs', 'Total albums', 'Total artist']

    // Scale the range of the data in the domains
    x.domain(ordinals.map(function(d,i) { 
        return ordinals[i]; 
    }));
    y.domain([0, d3.max(data, function(d,i) { 
        return 1.1*Math.max(data[i], data[i+1]); 
    })]);

    var colors = ['#EAD8BD', '#5A8895', '#9ECAE1'];

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { 
            return x(ordinals[i]) + 0.04376*width; 
        })
        .attr("width", x.bandwidth()/2)
        .attr('rx', 10)
        .attr("y", function(d,i) { 
            return y(data[i]); 
        })
        .attr("height", function(d,i) { 
            return height - y(data[i]); 
        })
        .style('fill', function(d,i){
            return colors[i]
        });

    var titles = ['Total songs', 'Total albums', 'Total artist']



    svg.selectAll('svg')
        .data(titles)
        .enter()
        .append('text')
        .attr('class','.text1')
        .text(function(d,i){
            return titles[i];
        })
        .style('fill','white')
        .attr('x', function(d,i){
            return x(ordinals[i]) + 0.04564*width;
        })
        .attr('y', function(d,i){
            return 1.177*height;
        })
        .style('font-size', (0.04*width)+'px');


    svg.selectAll('svg')
        .data(data)
        .enter()
        .append('text')
        .text(function(d,i){
            return data[i];
        })
        .style('fill','white')
        .attr('x', function(d,i){
            return x(ordinals[i]) + 0.04564*width;
        })
        .attr('y', function(d,i){
            return 1.103*height;
        })
        .style('font-size', (0.04*width)+'px');


    svg.append('g')
        .append('text')
        .text("TOTAL WORLD STATISTIC")
        .attr("text-anchor", "middle")
        .attr('x', "42%")
        .style('fill', 'white')
        .style('font-size', (0.07*width)+'px');

}