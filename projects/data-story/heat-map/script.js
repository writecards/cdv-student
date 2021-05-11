let heatmapWidth = 800;
let heatmapHeight = 600;

let req = new XMLHttpRequest();

let values;

let xScaleHeatmap;
let yScaleHeatmap;
let padding = 60;
let date;
let fireMonth;
let fireYear;

let numYears, minYear, maxYear;

let tooltip = d3.select("#heatmap-tooltip")

let heatmapviz = d3.select("#heatmap-container")
 .append("svg")
    .attr("width",heatmapWidth)
    .attr("height",heatmapHeight)
    .attr("id","viz")
    .style("background-color","lightyellow")
    ;



let wildfireData = d3.csv("mapdataall.csv").then(gotWildfireData);

function gotWildfireData(incomingData){

    let transformedData = transformData(incomingData);
                    function transformData(dataToTransform){
                        let newData = dataToTransform.filter(filterFunction);
                        return newData;
                    }

        
    console.log(transformedData)


                    let maxAcres = d3.max(transformedData, d => d.incident_acres_burned)
                    console.log(maxAcres)

            ///let xDomain = d3.extent(transformedData, getFireYear)
            // let xDomain = d3.extent(transformedData, d => d.incident_date_created)
           
            minYear = d3.min(transformedData, getFireYear)
            
            maxYear = d3.max(transformedData, getFireYear) 
            let numYears = maxYear-minYear;
           
            
             xScaleHeatmap = d3.scaleLinear().domain([minYear, maxYear+1]).range([padding, heatmapWidth-(padding)]);
         //xScaleHeatmap = d3.scaleTime().domain(xDomain).range([padding, heatmapWidth-(padding)]);
 

            // let xAxis = d3.axisBottom(xScaleHeatmap).tickFormat(d3.format(".0f"));
            let xAxis = d3.axisBottom(xScaleHeatmap).tickFormat(d3.format("d"));
           // let xAxis = d3.axisBottom(xScaleHeatmap)
            let xAxisGroup = heatmapviz.append("g").attr("class", "xaxis")
            xAxisGroup.call(xAxis);

            let xAxisPos = heatmapHeight - padding;
            xAxisGroup.attr("transform", "translate(0,"+ xAxisPos +")");

            
            //y scale is months
                                                    // js reads first date as 0, last as 11 but put 12 to fit cells
            yScaleHeatmap = d3.scaleTime().domain([new Date(0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
                        .range([padding, heatmapHeight-padding])
          
            let yAxis = d3.axisLeft(yScaleHeatmap).tickFormat(d3.timeFormat("%B"))
            let yAxisGroup = heatmapviz.append("g").attr("class", "yaxis")
            yAxisGroup.call(yAxis).attr("transform", "translate(" + padding + ", 0)");
 
    

    
  
        let acresDomain = d3.extent(transformedData, d => d.incident_acres_burned)
       
        console.log(acresDomain)
            
            dataGroup = heatmapviz.selectAll(".dataGroup").data(transformedData).enter()
                        .append("g")
                        .attr("class", "datagroup")
         
             dataGroup.append("rect")
                      .attr("fill", getColorScale)
                      .attr("fire-year", getFireYear)
                      .attr("fire-month", getFireMonth)
                        .attr("fire-acres", function(d){
                        d.incident_acres_burned
                    })
                        .attr("height", (heatmapHeight - (2 * padding)) / 12)
                        .attr("y", function(d){
                            let  date = new Date(d.incident_date_created);
                        let fireMonth = date.getMonth();
                        
                            return yScaleHeatmap(new Date(0, fireMonth, 0, 0, 0, 0, 0))
                        })
                        .attr("width", function(d,i){
                            //return(Math.random()*90)
                            let w =  (heatmapWidth - (2*padding)) / (numYears*12)
                            return w;
                            
                            return (heatmapWidth - (2*padding)) / (numYears+1);
                        })
                        .attr("x", function(d,i){
                            // let year = getFireYear(d)
                            // return xScaleHeatmap(year)

                            let year = getFireYear(d)
                            let month = getFireMonth(d)
                            let parseMonth = d3.timeParse("%m")
                            //console.log(parseMonth(month))
                            
                            let randomAdd = Math.random()*80
                            return xScaleHeatmap(year)+randomAdd
                        })
                        .on("mouseover", function(d){
                            console.log("mouse over")
                            tooltip.transition()
                                    .style("visibility", "visible")
                            tooltip.text(d.incident_name)
                        })
                        .on("mouseout", function(d){
                            tooltip.transition()
                                    .style("visibility", "hidden")
                        })

}



function filterFunction(d){
    if(d.incident_acres_burned > 150){
        return true;
    }else{
        return false;
    }
  }

  function getColorScale(d){

      let acres = d.incident_acres_burned;
      
    if(acres <= 300){
        return "rgb(252, 224, 151)";
    }else if(acres > 300 && acres <= 1000){
        return "rgb(255, 186, 8)";
    }else if(acres > 1000 && acres <= 2000){
        return "rgb(250, 163, 7)";
    }else if(acres > 2000 && acres <= 3000){
        return "rgb(244, 140, 6)";
    }else if(acres > 3000 && acres <= 4000){
        return "rgb(232, 93, 4)";
    }else if(acres > 4000 && acres <= 5000){
        return "rgb(220, 47, 2)";
    }else if(acres > 5000 && acres <= 6000){
        return "rgb(208, 0, 0)";
    }else if(acres > 6000 && acres <= 7000){
        return "rgb(157, 2, 8)";
    }else if(acres > 7000 && acres <= 8000){
        return "rgb(55, 6, 23)";
    }else if(acres > 8000 && acres <= 9000){
        return "rgb(3, 7, 30)";
    }else if(acres > 9000 && acres <= 10000){
        return "rgb(97, 0, 3)";
    }else if(acres > 10000){
        return "rgb(0,0,2)";
    }
   }
     

   function getFireYear(d){
     date = new Date(d.incident_date_created);
     fireYear = date.getFullYear(); 
     return fireYear;
   }

   function getFireMonth(d){
     date = new Date(d.incident_date_created);
    fireMonth = date.getMonth();
    return fireMonth;
   }



   let keySVG = d3.select("#heatmap-key-container").append("svg")
                        .attr("width", 300)
                        .attr("height", 100)
                        //.style("background-color", "pink")
   let keyGroup = keySVG.select(".keyclass").append("g")
                .attr("class","keyclass")
               
                keySVG.append("rect")
                        .attr("x", 0)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(252, 224, 151)")

                        keySVG.append("rect")
                        .attr("x", 30)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(255, 186, 8)")

                        keySVG.append("rect")
                        .attr("x", 60)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(250, 163, 7)")

                        keySVG.append("rect")
                        .attr("x", 90)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(244, 140, 6)")

                        keySVG.append("rect")
                        .attr("x", 120)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(232, 93, 4)")

                        keySVG.append("rect")
                        .attr("x", 150)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(220, 47, 2)")

                        keySVG.append("rect")
                        .attr("x", 180)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(208, 0, 0)")

                        keySVG.append("rect")
                        .attr("x", 210)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(157, 2, 8)")

                        keySVG.append("rect")
                        .attr("x", 240)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(97, 0, 3)")

                        keySVG.append("rect")
                        .attr("x", 270)
                        .attr("y", 30)
                        .attr("width", 30)
                        .attr("height",30)
                        .attr("fill","rgb(3, 7, 30)")

                        keySVG.append("text")
                        .text("acres burned")
                        .attr("x", 100)
                        .attr("y", 20)

                        keySVG.append("text")
                            .text("300")
                            .attr("x", 3)
                            .attr("y", 75)

                        keySVG.append("text")
                            .text("10000+")
                            .attr("x", 250)
                            .attr("y", 75)

                       