let viz2width = 950;
let viz2height = 400;

let xpadding = 100;
let ypadding = 50;

let viz2 = d3.select("#viz2-container")
  .append("svg")
    .style("width", viz2width)
    .style("height", viz2height)
   // .style("outline", "solid black")

let data = d3.json("viz2data.json").then(gotData);
let viz2tooltip = d3.select("#viz-2-tooltip")
console.log(viz2tooltip)


function gotData(incomingData){
  
    //x scale

    let minYear = incomingData[0].date;
    let maxYear = incomingData[19].date;

    let xDomain = [minYear, maxYear];
    let yDomain = d3.extent(incomingData, d => d.structures)

    let xScale = d3.scaleLinear().domain(xDomain).range([50,500])
    let xAxis = d3.axisBottom(xScale);

    let yScale = d3.scaleLinear().domain(yDomain).range([viz2height-100,20])
    let yAxis = d3.axisLeft(yScale);
    
    let xAxisGroup = viz2.append("g").attr("class", "xaxis");
    //xAxisGroup.call(xAxis);

    let yAxisGroup = viz2.append("g").attr("class", "yaxis");
   // yAxisGroup.call(yAxis);

    
    let colorScale = d3.scaleLinear().domain([0, 3, 6, 15, 25]).range(["orange","orangered","red","maroon"])

    function getTranslate(d,i){
        let x = i*45;
        //let y = Math.random() * 100;
        let y = yScale(d.structures)
      // let y = d3.scaleLinear().domain([d.deaths])
        return "translate(" + x + "," + y + ")";
    }

    let acres = d3.extent(incomingData, d => d.acres)
   let r = d3.scaleLinear().domain(acres).range([20, 400]);
   
       

   let dataGroups = viz2.selectAll(".datagroup").data(incomingData).enter()
            .append("g")
            .attr("class","datagroup")
            .attr("transform", getTranslate)
            ;
    // let tooltipLine = dataGroups.append("line")
    //         .attr("x1", 0)
    //         .attr("y1", 0)
    //         .attr("x2", 0)
    //         .attr("y2",viz2height)
    //         .attr("stroke","black")
    //         .attr("id", "tooltipLine")
    //         .style("visibility", "hidden")
          
            
            
            
      
        let circles = dataGroups.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", d => d.acres/10000)
            .attr("class","datacircle")
            .attr("fill", d => colorScale(d.deaths))
            .on("mouseover", function(d){
              console.log(d.date)
              dataGroups.filter(function(datapoint){
                if(datapoint == d){
                  return false
                }else{
                  return true
                }
              }).transition().attr("opacity", 0.1)
              
              viz2tooltip.transition()
                      .style("visibility", "visible")
              viz2tooltip.text(d.date)
             

          })
          .on("mouseout", function(d){
              viz2tooltip.transition()
                      .style("visibility", "hidden")
              dataGroups.attr("opacity", 1);
            
           
          })
         
            ;

          
        let fireName = dataGroups.append("text")
            .attr("x",0)
            .attr("y", 15)
            .text( d => d.fireName)
            .style("font-family","roboto")

            

    

        



                
                 
                  
              
              
            
      

        
}
