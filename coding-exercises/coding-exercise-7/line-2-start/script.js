d3.json("births.json").then(gotData);


let w = 900;
let h = 500;

let xpadding = 100;
let ypadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

function gotData(incomingData){
  // the following function is defined below
  // it allows for us to NOT WORRY about parsing
  // time strings and creating JS date objects
  // in the following script
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);

  function key(d){
    return d.country;
  }

  // temporarily flatten data to get the minima/maxima:
  let flatData = d3.merge(incomingData)
  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(flatData, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(flatData, function(d){
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);
//treid to make a separeate line function for usa line. need to find out how to update the each time button is clicked to improt the new points based ont he coutnry selected
  let lineUSA = d3.line()
    .x(function(d,i){
        if(d[0].country == "United States"){
        return xScale(d[0].year);
        }
    })
    .y(function(d,i){

      if(d[0].country == "United States"){
      return yScale(d[0].birthsPerThousand);
      }
    });

  let lineMaker = d3.line()
    .x(function(d,i){
      return xScale(d.year);
    })
    .y(function(d,i){
      return yScale(d.birthsPerThousand);
    });


   let graphGroup = viz.append("g").attr("class", "graphGroup");

   function getSeparateCountries(){
      dataFromUSA = [];
        dataFromUSA.push(incomingData[0]);
      dataFromChina = [];
        dataFromChina.push(incomingData[1]);
  
    
   }
  
  

  function switchToUSA(){
    getSeparateCountries();
     graphGroup.selectAll(".line").data(dataFromUSA).enter()
          .append("path")
          .attr("d",lineMaker)
          .attr("fill","none")
          .attr("stroke","blue")
          .attr("stroke-width",5)
          .attr("stroke-linejoin","round")
          .attr("stroke-linecap","round")
          .attr("class","line")

              
    graphGroup.selectAll('.line').data(dataFromUSA).transition().ease(d3.easeElastic).duration(1600)
      .attr("d", lineMaker)
      .attr("stroke", "blue");
      
      // let pathLength = graphGroup.selectAll(".line").node().getTotalLength();
      // console.log(pathLength)

      //     graphGroup.selectAll(".line").attr("stroke-dasharray", pathLength)
      //           .attr("stroke-dashoffset",pathLength)
      //           .transition().duration(1000)
      //           .attr("stroke-dashoffset",0)
      }


    function switchToChina(){
      getSeparateCountries();
      let  currentLine = graphGroup.selectAll(".line").data(dataFromChina).enter()
        .append("path")
        .attr("d",lineMaker)
        .attr("fill","none")
        .attr("stroke","red")
        .attr("stroke-width",5)
        .attr("class","line")

        graphGroup.selectAll('.line').data(dataFromChina).transition().ease(d3.easeElastic).duration(1600)
        .attr("d", lineMaker)
        .attr("stroke", "red");
      
                // let pathLength = graphGroup.selectAll(".line").node().getTotalLength();
                // console.log(pathLength)

                // graphGroup.selectAll(".line").attr("stroke-dasharray", pathLength)
                // .attr("stroke-dashoffset",pathLength)
                // .transition().duration(1000)
                // .attr("stroke-dashoffset",0)

        

      }
       
      document.getElementById("usa").addEventListener("click", switchToUSA);
      document.getElementById("china").addEventListener("click",  switchToChina);

  }



// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}



