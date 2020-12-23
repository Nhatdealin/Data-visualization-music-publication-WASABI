function sortByProperty(property){  
    return function(a,b){  
       if(parseInt(a[property]) < parseInt(b[property]))  
          return 1;  
       else if(parseInt(a[property]) > parseInt(b[property]))  
          return -1;  
   
       return 0;  
    }  
 }

 function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function generalSummary(year){

    var svgRace = d3.selectAll('#Totalsummary').attr('width',document.getElementById('generalDiv').offsetWidth);
        //Using this selection to update the SVG everytime the function is called
    svgRace.selectAll("*").remove();
    var data = data_year.filter(function(item){
        return item.year == year})
    var sorted_data = data.sort(sortByProperty('count_song'));
    console.log(sorted_data)
    var sorted_3_first = [sorted_data[0], sorted_data[1], sorted_data[2]];
    var sorted_3_second = [sorted_data[3], sorted_data[4], sorted_data[5]];

    var svgRace = d3.selectAll('#Totalsummary')
                    .attr('height', document.getElementById('Totalsummary').offsetHeight)

    width = document.getElementById('generalDiv').offsetWidth
    height = document.getElementById('generalDiv').offsetHeight*0.95

    console.log(numberWithCommas(total_summary.total_song))

    svgRace.append('g')
        .data(['General summary'])
        .append('text')
        .text(['General summary'])
        .style('fill', 'white')
        .style('font-size', (0.08*width)+'px')
        .attr('x', width/7)
        .attr('y', 0.08*height);

    svgRace.append('g')
        .data(['General summary'])
        .append('text')
        .text("Total Songs:  " + numberWithCommas(total_summary.total_song))
        .style('fill', 'white')
        .attr('y',0.38*height)
        .attr('text-anchor','left')
        .style('font-size', (0.072*width)+'px')
        .attr('x', width/10);
    svgRace.append('g')
        .data(['General summary'])
        .append('text')
        .text("Total Albums:  " + numberWithCommas(total_summary.total_album))
        .style('fill', 'white')
        .attr('y',0.58*height)
        .attr('text-anchor','left')
        .style('font-size', (0.072*width)+'px')
        .attr('x', width/10);
    svgRace.append('g')
        .data(['General summary'])
        .append('text')
        .text("Total Artists:  " + numberWithCommas(total_summary.total_artist))
        .style('fill', 'white')
        .attr('y',0.78*height)
        .attr('text-anchor','left')
        .style('font-size', (0.072*width)+'px')
        .attr('x', width/10);

}
