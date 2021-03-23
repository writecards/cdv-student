// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)
console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data!=='undefined'?data:"nothing here");
console.log(typeof data!=='undefined'?"seems like it ;-) it comes from the dataManager.js script.":"...damnit! let's see what is going wrong in the dataManager.js script.");

let w = 800;
let h = 500;
let padding = 50;

let viz = d3.select("#container")
    .append("svg")
    .style("width",w)
    .style("height",h)
    ;

    // x axis

let allNames = data.map(function(d){return d.key});
// d3 makes a scale, taking each name (key values) and mapping it to a point on the x axis. 
// paddingInner creates space in between each spot
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w-padding])
    .paddingInner(0.1)
;

let xAxis = d3.axisBottom(xScale);
// puts emoji names instead of key names
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});

let xAxisGroup = viz.append("g").classed("xAxis", true);
xAxisGroup.call(xAxis);

xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
xAxisGroup.selectAll("line").remove();
xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")"); // thank you for the code leon

// y scale
let yMax = d3.max(data, function(d){return d.value});
yDomain = [0, yMax];
let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2])
// group that holds the actual graph

let graphGroup = viz.append("g").classed("graphGroup", true);
/// this selection gives us access to enter, exit, and update group arrays in the object 
// basically gives us things we can control  in the visualization
let elementsForPage = graphGroup.selectAll(".datapoint").data(data);
//console.log("D3's assessment of whats needed on the page:", elementsForPage);

let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();

console.log("enteringElements", enteringElements);
console.log("exitingElements", exitingElements);

let enteringDataGroups = enteringElements.append("g").classed("datapoint",true);

enteringDataGroups.attr("transform",function(d,i){
    return "translate(" + xScale(d.key) + "," + (h-padding) + ")"
});

enteringDataGroups.append("rect")
    .attr("width",function(){
        return xScale.bandwidth();
    })
    .attr("height", function(d){
        return yScale(d.value);
    })
    .attr("y",function(d,i){
        return -yScale(d.value);
    })
    .attr("fill","black")
    ;

function add(){
    addDatapoints(1);
    console.log("new data", data);

    //updates the list of keys
    allNames = data.map(function(d){
        return d.key;
    });

    xScale.domain(allNames);
    //updating the x axis
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);

    //updating the y axis

    yMax = d3.max(data, function(d){
        return d.value
    });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    elementsForPage = graphGroup.selectAll(".datapoint").data(data);
    console.log(elementsForPage);
    // don't use let bc variables already declared earlier
    enteringElements = elementsForPage.enter();
    exitingElements = elementsForPage.exit();

    elementsForPage.transition().duration(800).attr("transform", function(d, i){
        return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
      });

      // only updating things that are impacted by the new data
      // 'updating' = write the code again so that it can run again with the updated dataset

    elementsForPage.select("rect")
      .transition()
      .delay(100)
      .duration(1000)
      .attr("fill", "#F27294")
      .attr("width", function(){
          return xScale.bandwidth();
      })
      .attr("y",function(d,i){
          return -yScale(d.value);
      })
      .attr("height", function(d, i){
          return yScale(d.value);
      })

    let incomingDataGroups = enteringElements.append("g")
        .classed("datapoint",true)
        ;
    incomingDataGroups.attr("transform",function(d, i){
        return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });
    incomingDataGroups.append("rect")
        .attr("y", function(d,i){
        return 0;
      })
        .attr("height", function(d, i){
        return 0;
      })
        .attr("width", function(){
        return xScale.bandwidth();
      })
        .attr("fill", "#F27294")
        .transition()
        .delay(600)
        .duration(500)
        .attr("y", function(d,i){
        return -yScale(d.value);
      })
        .attr("height", function(d, i){
        return yScale(d.value);
      })
        .attr("fill", "#F27294")
        ;
}

document.getElementById("buttonA").addEventListener("click",add);

function remove(){
    removeDatapoints(1);
     //updates the list of keys
     allNames = data.map(function(d){
        return d.key;
    });

    xScale.domain(allNames);
    //updating the x axis
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);

    //updating the y axis

    yMax = d3.max(data, function(d){
        return d.value
    });

    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    elementsForPage = graphGroup.selectAll(".datapoint").data(data);
    console.log(elementsForPage);
    // don't use let bc variables already declared earlier
    enteringElements = elementsForPage.enter();
    exitingElements = elementsForPage.exit();
    //need to fix my remove function

    // let leavingDataGroups = exitingElements
    //   .append("g")
    //   .classed("datapoint", true)
    // ;

    exitingElements.transition().duration(100).ease(d3.easeLinear).attr("height","0")
    .remove();

    exitingElements.select(".ticks").remove();

    elementsForPage.transition().duration(800).attr("transform", function(d, i){
      return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });

    // only updating things that are impacted by the new data
    // 'updating' = write the code again so that it can run again with the updated dataset

  elementsForPage.select("rect")
    .transition()
    .delay(500)
    .duration(1000)
    .attr("fill","#04ADBF")
    .attr("width", function(){
        return xScale.bandwidth();
    })
    .attr("y",function(d,i){
        return -yScale(d.value);
    })
    .attr("height", function(d, i){
        return yScale(d.value);
    })

  }
  document.getElementById("buttonB").addEventListener("click", remove);
  
  function removeAndAdd(){
    removeAndAddDatapoints(1,1); //idk how to approach this one
    add(1);
    remove(1);
    
    
    
    
  }
  document.getElementById("buttonC").addEventListener("click", removeAndAdd);
  
  function sortData(){
    sortDatapoints();
    allNames = data.map(function(d){
      return d.key;
  });

  xScale.domain(allNames);
  //updating the x axis
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);

  //updating the y axis

  yMax = d3.max(data, function(d){
      return d.value
  });

  yDomain = [0, yMax + yMax * 0.1];
  yScale.domain(yDomain);

  elementsForPage = graphGroup.selectAll(".datapoint").data(data);
  console.log(elementsForPage);
  // don't use let bc variables already declared earlier
  enteringElements = elementsForPage.enter();
  exitingElements = elementsForPage.exit();

  elementsForPage.transition().duration(800).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });
  elementsForPage.select("rect")
  .transition()
  .delay(100)
  .duration(1000)
  .attr("fill","#aa6af3")
  .attr("width", function(){
      return xScale.bandwidth();
  })
  .attr("y",function(d,i){
      return -yScale(d.value);
  })
  .attr("height", function(d, i){
      return yScale(d.value);
  })

  }
  document.getElementById("buttonD").addEventListener("click", sortData);
  
  function shuffleData(){
    shuffleDatapoints();
    allNames = data.map(function(d){
      return d.key;
  });

  xScale.domain(allNames);
  //updating the x axis
  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);

  //updating the y axis

  yMax = d3.max(data, function(d){
      return d.value
  });

  yDomain = [0, yMax + yMax * 0.1];
  yScale.domain(yDomain);

  elementsForPage = graphGroup.selectAll(".datapoint").data(data);
  console.log(elementsForPage);
  // don't use let bc variables already declared earlier
  enteringElements = elementsForPage.enter();
  exitingElements = elementsForPage.exit();

  elementsForPage.transition().duration(800).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });
  elementsForPage.select("rect")
  .transition()
  .delay(100)
  
  .duration(1000)
  .attr("fill","#F24C27")
  
  .attr("width", function(){
      return xScale.bandwidth();
  })
  .attr("y",function(d,i){
      return -yScale(d.value);
  })
  .attr("height", function(d, i){
      return yScale(d.value);
  })
  }
  document.getElementById("buttonE").addEventListener("click", shuffleData);

  function getRandomColor(){
      let r = Math.random()*255;
      let g = Math.random()*255;
      let b = Math.random()*255;
      return "rgb(" + r + "," + g + "," + b + ")";
  }

  function randomButton(){
    allNames = data.map(function(d){
        return d.key;
    });
  
    xScale.domain(allNames);
    //updating the x axis
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
    xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);
  
    //updating the y axis
  
    yMax = d3.max(data, function(d){
        return d.value
    });
  
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);
  
    elementsForPage = graphGroup.selectAll(".datapoint").data(data);
    console.log(elementsForPage);
    // don't use let bc variables already declared earlier
    enteringElements = elementsForPage.enter();
    exitingElements = elementsForPage.exit();
  
    elementsForPage.transition().duration(800).attr("transform", function(d, i){
      return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });
    elementsForPage.select("rect")
    .transition()
    .delay(100)
    .duration(1000)
    .attr("fill",getRandomColor)
    .attr("width", function(){
        return xScale.bandwidth();
    })
    .attr("y",function(d,i){
        return -yScale(d.value);
    })
    .attr("height", function(d, i){
        return yScale(d.value);
    })
  }
  document.getElementById("buttonF").addEventListener("click", randomButton);


