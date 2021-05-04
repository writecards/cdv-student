





let svgWidth = 500;
let svgHeight = 400;
let padding = 100;
let graphInterval = 1200;


let mapviz = d3.select("#viz1-container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","mapviz")
    .style("background-color","midnightblue")
    ;

let clipPath = mapviz.html(`
<defs>
  <clipPath id="californiaClip">
    <path></path>
  </clipPath>
</defs>
`).select("clipPath");
console.log(clipPath);

let mapLayer = mapviz.append("g");
let voronoiLayer = mapviz.append("g");

// let caliMapData = d3.json("https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/CA-06-california-counties.json").then(gotCaliMapData);

function gotCaliMapData(data){
  // console.log(data.objects.cb_2015_california_county_20m);
  let cali_counties = topojson.feature(data, data.objects.cb_2015_california_county_20m)
    let projection = d3.geoMercator()
                    .center([0,0])
                    .translate([svgWidth/2, svgHeight/2])
                    .fitSize([svgWidth - padding, svgHeight - padding], cali_counties)
                    
    let pathGenerator = d3.geoPath().projection(projection);
    let paths = mapviz.selectAll('path').data(cali_counties.features)
                .enter().append('path')
                .attr('d', pathGenerator)
                .attr("fill","none")
                .attr("stroke","black")
                .attr("stroke-width",3)
                // .attr("id", "californiaClip")
    clipPath.selectAll("path").data(cali_counties.features)
      .enter().append('path')
      .attr('d', pathGenerator)
      .attr("fill","none")
      .attr("stroke","black")
      .attr("stroke-width",3)

let fireData = d3.csv("California_Fire_Incidents.csv").then(gotFireData);
        function gotFireData(incomingData){
          //this gotFireData function is inside the caliMap function because it uses the cali map projection to map the cordinates for where the fires are burning.
          let transformedData = transformData(incomingData);
          console.log(transformedData);


          function transformData(dataToTransform){
              let newData = dataToTransform.filter(filterFunction);
              return newData;
          }

          
            
            //// here i animate based on year (shoutout leon's code in coding exercise 5)

            let dates = transformedData.reduce(function(acc, d, i){
              if(!acc.includes(d.ArchiveYear)){
                acc.push(d.ArchiveYear)
              }
              return acc
            }, [])
          
            console.log("dates", dates);

            let currentYearIndex = 0;
            let currentYear = dates[currentYearIndex];
            function filterYear(d,i){
              if(d.ArchiveYear == currentYear){
                return true;
              }else{
                return false;
              }
            }

            function drawViz(){
              let currentYearData = transformedData.filter(filterYear);
              function assignKeys(d,i){
                return d.UniqueId; // should i use this for the key?
              }
              console.log("---\nthe currentYearData array now carries the data for year", currentYear);
              let fireGroup = mapviz.selectAll(".fireGroup").data(currentYearData, assignKeys)
             

            // fireGroup.append("circle")
            //   .attr("class","locationDot")
            //   .attr("r",3)
            //   .attr("fill","red")
            //   .attr("cx",0)
            //   .attr("cy",0)
            //   .attr("transform", function(d){
            //     return "translate(" + projection([d.Longitude, d.Latitude]) + ")";
            //   })
            //   ;      

            let enteringElements = fireGroup.enter()
                  .append("g")
                  .attr("class", "fireGroup")
                  ;

              enteringElements.append("circle")
                    .attr("r",3)
                    .attr("fill","red")
                    .attr("cx",0)
                    .attr("cy",0)
                    .attr("transform", function(d){
                          return "translate(" + projection([d.Longitude, d.Latitude]) + ")";
                        })
                   ;

                // enteringElements.transition().duration(graphInterval).attr("transform", function(d){
                //       return "translate(" + projection([d.Longitude, d.Latitude]) + ")";
                //     })

                    let exitingElements = fireGroup.exit().transition().attr("opacity",0).remove();

                    fireGroup.transition().duration(graphInterval).ease(d3.easeLinear).attr("transform", function(d){
                      return "translate(" + projection([d.Longitude, d.Latitude]) + ")";
                    });

            let color = function(){
              return d3.interpolateOranges(Math.random()); // random oranges for now
            }

              //voronoi creates cells based on distace to each point. 
              //i want to create voronoi diagram based on fire locations
            let points = [];
            transformedData.forEach(d =>{
              points.push(projection([d.Longitude, d.Latitude]))
            })
        
           let voronoi = d3.voronoi().extent([[0,0],[svgWidth, svgHeight]]);
    
           let polygons = voronoi.polygons(points);
           
           mapviz.append("g").selectAll("path").data(polygons).enter()
              .append("path")
              .attr("d", polygonToPath)
              .attr("fill", color)
              .attr("clip-path", "url(#californiaClip)");
             

            function polygonToPath(polygon){
              return polygon ? "M" + polygon.join("L") + "Z" : null;
            }

            //next: clip path??



             


            }

            setInterval(function(){
              currentYearIndex++;
              if(currentYearIndex>dates.length){
                currentYearIndex = 0;
              }
              currentYear = dates[currentYearIndex];
              
              drawViz();
            }, graphInterval); 
        }

}



function filterFunction(d){
  if(d.AcresBurned > 500){
      return true;
  }else{
      return false;
  }
}




