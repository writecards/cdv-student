

let svgWidth = 600;
let svgHeight = 800;
let padding = 100;
let graphInterval = 1000;



let mapviz = d3.select("#viz1-container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","mapviz")
    
    ;

    mapviz.append("text")
      .text("Active Wildfires 2013-2020")
      .attr("y", svgHeight-100)
      .attr("x", 180)
      .attr("fill","black")
      .attr("font-size", 16)
    

// let clipPath = mapviz.html(`
// <defs>
//   <clipPath id="californiaClip">
//     <path></path>
//   </clipPath>
// </defs>
// `).select("clipPath");


let mapLayer = mapviz.append("g");
let voronoiLayer = mapviz.append("g");
let clipLayer = mapviz.append("g").attr("clip-path", "url(#myClip)")

 let caliMapData = d3.json("https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/CA-06-california-counties.json").then(gotCaliMapData);

function gotCaliMapData(data){
  // console.log(data.objects.cb_2015_california_county_20m);
  let cali_counties = topojson.feature(data, data.objects.cb_2015_california_county_20m)
    let projection = d3.geoMercator()
                    .center([0,0])
                    .translate([100+svgWidth/2, 100+svgHeight/2])
                    .fitSize([svgWidth - padding, svgHeight - padding], cali_counties)
                    
    let pathGenerator = d3.geoPath().projection(projection);
    let paths = mapviz.selectAll('path').data(cali_counties.features)
                .enter().append('path')
                .attr('d', pathGenerator)
                .attr("fill","none")
              //   .attr("stroke","black")
                // .attr("stroke-width",3)
                //keep commented vvv
                // .attr("id", "californiaClip")

    let clip = mapviz.append("clipPath")
        .attr("id", "myClip")
        .selectAll("path")
        .data(cali_counties.features)
        .enter().append("path")
        .attr("d", pathGenerator)

    

        let fireData = d3.csv("California_Fire_Incidents.csv").then(gotFireData);
            function gotFireData(incomingData){
              //this gotFireData function is inside the caliMap function because it uses the cali map projection to map the cordinates for where the fires are burning.
              let transformedData = transformMapData(incomingData);

                    function transformMapData(dataToTransform){
                        let newmapData = dataToTransform.filter(filterFunction);
                        return newmapData;
                    }

                
                //// here i animate based on year (based on leon's code in coding exercise 5)

                let dates = transformedData.reduce(function(acc, d, i){
                  if(!acc.includes(d.ArchiveYear)){
                    acc.push(d.ArchiveYear)
                  }
                  return acc
                }, [])
              
            

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
              //  console.log("---\nthe currentYearData array now carries the data for year", currentYear);
                  let fireGroup = mapviz.selectAll(".fireGroup").data(currentYearData, assignKeys)
                
    

                let enteringElements = fireGroup.enter()
                      .append("g")
                      .attr("class", "fireGroup")
                      ;
    //hide pls
                  // enteringElements.append("circle")
                  //       .attr("r",3)
                  //       .attr("fill","red")
                  //       .attr("cx", 0)
                  //       .attr("cy", 0)
                  //       .attr("transform", function(d){
                  //             return "translate(" + projection([d.Longitude, d.Latitude]) + ")";
                  //           })
                  //     ;

                    
                        let exitingElements = fireGroup.exit().transition().attr("opacity",0).remove();

                        fireGroup.transition().duration(graphInterval).ease(d3.easeLinear).attr("transform", function(d){
                          return "translate(" + projection([d.Longitude, d.Latitude]) + ")";
                        });

                let color = function(){
                  return d3.interpolateOranges(Math.random()); // random oranges for now
                }

                let voronoiColor = d3.scaleLinear()
                                    .domain([0, 50, 100, 150, 200, 250])
                                    .range(["green", "yellow", "orange", "red", "maroon", "maroon"])
                  //voronoi creates cells based on distace to each point. 
                  //i want to create voronoi diagram based on fire locations
                let points = [];
                currentYearData.forEach(d =>{
                  points.push(projection([d.Longitude, d.Latitude])) // points are locations of wildfires
                })
            
                console.log(points.length)
                
              let voronoi = d3.voronoi().extent([[0,0],[svgWidth, svgHeight]]);
                
         
        
             let polygons = voronoi.polygons(points);
    


            clipLayer.selectAll("path").data(polygons).enter()
                    .append("path")
                    .attr("d", polygonToPath)
                    .attr("stroke", "black")
                    .transition()
                    .attr("fill", color)
                    
 
    

                function polygonToPath(polygon){
                  return polygon ? "M" + polygon.join("L") + "Z" : null;
                }

          



             


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

