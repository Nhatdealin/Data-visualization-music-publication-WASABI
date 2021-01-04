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
function getCountryName(d){
    if (typeof d !== 'undefined'){
        if(d['name'] =='United Kingdom'){
            return 'UK'
            }
        if (d['name'] == 'South Africa'){
            return 'South A.'
        }
        if (d['name'] == 'United States Of America'){
            return 'US'
        }
        return d['name'];
    }
    
    return '';
}


function top6(){

    var svgRace = d3.selectAll('#Top6').attr('width',document.getElementById('top6Div').offsetWidth);
        //Using this selection to update the SVG everytime the function is called
    svgRace.selectAll("*").remove();

    var sorted_data = filtered_result.sort(sortByProperty('count_song'));
    var sorted_6_first = [sorted_data[0], sorted_data[1], sorted_data[2], sorted_data[3], sorted_data[4], sorted_data[5]];
    var sorted_6_rank = ["1st" , "2nd", "3rd", "4th", "5th", "6th"];

    var svgRace = d3.selectAll('#Top6')
                    .attr('height', document.getElementById('Top6').offsetHeight)

    width = document.getElementById('top6Div').offsetWidth
    height = document.getElementById('top6Div').offsetHeight*0.95


    svgRace.append('g')
        .data(['Ranking countries (Song)'])
        .append('text')
        .text(['Ranking countries (Song)'])
        .style('fill', 'white')
        .style('font-size', (0.06*width)+'px')
        .style('font-weight', 'bold')
        .attr('x', width/7)
        .attr('y', 0.08*height);
    svgRace.selectAll('body')
        .data(sorted_6_rank)
        .enter()
        .append('text')
        .text(function(d,i){
            return d
        })
        .style('fill', 'white')
        .attr('text-anchor','center')
        .style('font-size', function(d,i){
            return ((0.068-(i*0.006))*width)+'px';
        })
        .attr('x', (0.005*width + width/12))
        .attr('y', function(d,i){
            return i*(0.13*height) + (0.25*height);
        });

    svgRace.selectAll('body')
        .data(sorted_6_first)
        .enter()
        .append('text')
        .text(function(d,i){
            return getCountryName(d)
        })
        .style('fill', 'white')
        .attr('text-anchor','center')
        .style('font-size', function(d,i){
            return ((0.098-(i*0.008))*width)+'px';
        })
        .style('font-weight', 'bold')
        .attr('x', (0.07*width + width/6))
        .attr('y', function(d,i){
            return i*(0.13*height) + (0.26*height);
        });

    svgRace.selectAll('body')
        .data(sorted_6_first)
        .enter()
        .append('text')
        .text(function(d,i){
            if(typeof d !== 'undefined') return numberWithCommas(d['count_song'])
                 else return numberWithCommas("")
        })
        .style('fill', 'white')
        .attr('text-anchor','left')
        .style('font-size', function(d,i){
            return ((0.088-(i*0.008))*width)+'px';
        })
        .attr('x', (0.53*width + width/6))
        .attr('y', function(d,i){
            return i*(0.13*height) + (0.255*height);
        });

}
