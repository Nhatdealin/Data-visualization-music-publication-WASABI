 function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function generalSummary(year){
    var svgRace = d3.selectAll('#Totalsummary').attr('width',(document.getElementById('Totalsummary').offsetWidth));
        //Using this selection to update the SVG everytime the function is called
    svgRace.selectAll("*").remove();
    var data = data_year.filter(function(item){
        return item.year == year})
    var svgRace = d3.selectAll('#Totalsummary')
                    .attr('height', document.getElementById('Totalsummary').offsetHeight)

    width = document.getElementById('generalDiv').offsetWidth*0.95
    height = document.getElementById('generalDiv').offsetHeight*0.95
    svgRace.append('text')
        .text('General summary (' + year + ')')
        .style('fill', 'white')
        .attr("text-anchor", "middle")
        .style('font-size', (0.09*width)+'px')
        .attr('x', "50%")
        .attr('y', 0.08*height);

    svgRace.append('text')
        .text("Song")
        .style('fill', 'white')
        .attr('y',0.20*height)
        .attr('text-anchor','middle')
        .style('font-size', (0.072*width)+'px')
        .attr('x', "50%");
    svgRace.append('text')
        .text(numberWithCommas(d3.sum(data_song.values())))
        .style('fill', 'white')
        .attr('y',0.35*height)
        .attr('text-anchor','middle')
        .style('font-weight', 'bold')
        .style('font-size', (0.12*width)+'px')
        .attr('x', "50%");
    svgRace.append('text')
        .text("Album")
        .style('fill', 'white')
        .attr('y',0.5*height)
        .attr('text-anchor','middle')
        .style('font-size', (0.072*width)+'px')
        .attr('x', "50%");
    svgRace.append('text')
        .text(numberWithCommas(d3.sum(data_album.values())))
        .style('fill', 'white')
        .attr('y',0.65*height)
        .style('font-weight', 'bold')
        .attr('text-anchor','middle')
        .style('font-size', (0.12*width)+'px')
        .attr('x', "50%");
    svgRace.append('text')
        .text("Artist")
        .style('fill', 'white')
        .attr('y',0.8*height)
        .attr('text-anchor','middle')
        .style('font-size', (0.072*width)+'px')
        .attr('x', "50%");
    svgRace.append('text')
        .text(numberWithCommas(d3.sum(data_artist.values())))
        .style('fill', 'white')
        .attr('y',0.95*height)
        .style('font-weight', 'bold')
        .attr('text-anchor','middle')
        .style('font-size', (0.12*width)+'px')
        .attr('x', "50%");

}
