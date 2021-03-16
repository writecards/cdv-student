console.log("hi");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382

let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 100;

let graphInterval = 500;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "black")
;


function gotData(incomingData){
  console.log(incomingData);

  // min max fertility rate (for xScale)
  let fertExtent = d3.extent(incomingData, function(d, i){
    return d.fert;
  });

  console.log("fertExtent", fertExtent);

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain(fertExtent).range([xPadding, w-xPadding]);


  // min max life expectancy
  let lifeExtent = d3.extent(incomingData, function(d, i){
    return d.life;
  });
  console.log("lifeExtent", lifeExtent);

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain(lifeExtent).range([h-yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // min max Population
  let popExtent = d3.extent(incomingData, function(d, i){
    return d.pop;
  });
  console.log("popExtent", popExtent);
  // you may use this scale to define a radius for the circles
  let rScale = d3.scaleLinear().domain(popExtent).range([5,50]);
 




  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function(acc,d,i){
    if(!acc.includes(d.year)){
      acc.push(d.year)
    }
    return acc
  }, [])

  console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  function filterYear(d, i){
    if(d.year == currentYear){
      return true;
    }else{
      return false;
    }
  }

  // make a group for all things visualization:

  let vizGroup = viz.append("g").attr("class", "vizGroup");

  //// translate functions
  function getGroupLocation(d,i){
    let x = xScale(d.fert);
    let y = yScale(d.life);
    //console.log("d.fert:", d.fert)
    return "translate(" + x + "," + y + ")";
  }

 



  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal with both updating and entering element.
    function drawViz(){
     

      let currentYearData = incomingData.filter(filterYear);

      function assignKeys(d, i){ //is key same as element ID?
        return d.Country;
      }
  

   // console.log("---\nthe currentYearData array now carries the data for year", currentYear);

      
                                                      //.data(currentYearData)
      let dataGroups = vizGroup.selectAll(".datagroup").data(currentYearData, assignKeys)
          //  .append("g")
          //  .attr("class","datagroup")
      ;


      

    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    // bind currentYearData to elements
    
    
  
   
   // dataGroups.attr("transform",getGroupLocation);
  

// need to find a way to update circle pos based on current year index !!!!!
       

    // take care of entering elements

let enteringElements = dataGroups.enter()
        .append("g")
        .attr("class","datagroup")
        ;

 enteringElements.append("circle")
          .attr("cx", 0)
          .attr("cy",0)
          .attr("r",getRadius)
          .attr("fill",getContinentColor)
          ;


      
      function getRadius(d){
        let r = rScale(d.pop)
        return r;
      }

     
 enteringElements.transition().duration(graphInterval).attr("transform", getGroupLocation);
      



    let exitingElements = dataGroups.exit().remove();
       // exitingElements.attr("transform", exitingGroupLocation);
    
                        
    // take care of updating elements
   
  
  dataGroups.transition().duration(graphInterval).ease(d3.easeLinear).attr('transform', getGroupLocation);


  }

function getContinentColor(d,i){
  let continent = d.continent;

  if(continent == "Asia"){
    return "rgb(217, 84, 7)"
  }else if(continent == "Africa"){
    return "rgb(222, 242, 73)"
  }else if(continent == "Americas"){
    return "rgb(10, 173, 191)"
    
  }else if(continent == "Oceania"){
    return "rgb(242, 41, 115)"
  }else if(continent == "Europe"){
    return "rgb(115, 13, 13)"
  }
  console.log(continent)
}


  // this puts the YEAR onto the visualization
  let year = viz.append("text")
      .text("")
      .attr("x", 100)
      .attr("y", 650)
      .attr("opacity","0.4")
      .attr("font-family", "sans-serif")
      .attr("font-size", "8em")
      .attr("fill","white")

  ;

  viz.append("circle")
    .attr("cx",70)
    .attr("cy",740)
    .attr("r",8)
    .attr("fill","rgb(217, 84, 7)")

  viz.append("text")
    .attr("x",85)
    .attr("y",745)
    .text("Asia")
    .attr("fill","white")
    .style("font-family","sans-serif")

    viz.append("circle")
    .attr("cx",70)
    .attr("cy",760)
    .attr("r",8)
    .attr("fill","rgb(222, 242, 73)")

    viz.append("text")
    .attr("x",85)
    .attr("y",765)
    .text("Africa")
    .attr("fill","white")
    .style("font-family","sans-serif")

    viz.append("circle")
    .attr("cx",160)
    .attr("cy",740)
    .attr("r",8)
    .attr("fill","rgb(10, 173, 191)")

    viz.append("text")
    .attr("x",175)
    .attr("y",745)
    .text("Americas")
    .attr("fill","white")
    .style("font-family","sans-serif")

    viz.append("circle")
    .attr("cx",160)
    .attr("cy",760)
    .attr("r",8)
    .attr("fill","rgb(242, 41, 115)")

    viz.append("text")
    .attr("x",175)
    .attr("y",765)
    .text("Oceania")
    .attr("fill","white")
    .style("font-family","sans-serif")


    viz.append("circle")
    .attr("cx",260)
    .attr("cy",740)
    .attr("r",8)
    .attr("fill","rgb(115, 13, 13)")

    viz.append("text")
    .attr("x",275)
    .attr("y",745)
    .text("Europe")
    .attr("fill","white")
    .style("font-family","sans-serif")

  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function(){
    currentYearIndex++;
    if(currentYearIndex>dates.length){
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    year.text(currentYear)
    drawViz();
  }, graphInterval);






}


// load data
d3.csv("data.csv").then(gotData);





// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale).ticks(8);


  let xAxisGrid = d3.axisBottom(xScale).tickSize(-h+(yPadding*2)).tickFormat('').ticks(8);
 
  let xAxisGridGroup = viz.append("g").attr("class","xGrid")
        .attr("transform","translate(0," + (h-yPadding)+ ")")
        .call(xAxisGrid)       
        ;
  xAxisGridGroup.selectAll("line")
  .attr("stroke","gray")
  .attr("stroke-width",1)
  //.style("stroke-dasharray",(3,15))
  ;
  xAxisGroup.call(xAxis);
  
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")
  ;

  xAxisGroup.selectAll(".tick")
    .attr("stroke","white")
    ;

  
  xAxisGroup.select(".domain")
    .attr("stroke","white")
    .attr("stroke-width",2)
    ;

    
 
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+w/2+", 40)")
    .style("stroke","white")
    .append("text")
    .attr("fill", "white")
    .text("fertility")
    .attr("font-family", "sans-serif")
    .attr("font-size", "2em")

  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale).ticks(15);

  let yAxisGrid = d3.axisLeft(yScale).tickSize(-w+100).tickFormat('').ticks(15);
  let yAxisGridGroup = viz.append("g").attr("class","yGrid")
        .attr("transform","translate(" + (52)+ ",0)")
        .call(yAxisGrid)       
        ;
  yAxisGridGroup.selectAll("line")
  .attr("stroke","gray")
  .attr("stroke-width",1)
  .style("stroke-dasharray",(5,8))
  ;
 

  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)");

  yAxisGroup.selectAll(".tick")
    .attr("stroke","white")
    ;
  yAxisGroup.select(".domain")
    .attr("stroke","white")
    ;

  yAxisGroup.append("g").attr('class', 'xLabel')
  
    .attr("transform", "translate(-33, "+h/2+") rotate(-90)")
    .append("text")
    .attr("fill", "white")
    .text("life expectancy")
    .attr("font-family", "sans-serif")
    .attr("font-size", "2em")
   

  ;
}
