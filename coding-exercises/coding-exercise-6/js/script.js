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


function assignkeys(d) {
    return d.key;
}


updateNew()

    
function updateNew(){
    //updates the list of keys
    allNames = data.map(function(d){
        return d.key;
    });

    xScale.domain(allNames);
    //updating the x axis
    xAxis = d3.axisBottom(xScale);
    xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
   
    xAxisGroup.transition().delay(800).call(xAxis).selectAll("text");
    xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
    xAxisGroup.selectAll("line").remove();
    //updating the y axis

    yMax = d3.max(data, function(d){
        return d.value
    });
    yDomain = [0, yMax + yMax * 0.1];
    yScale.domain(yDomain);

    elementsForPage = graphGroup.selectAll(".datapoint").data(data,assignkeys);
    // console.log(elementsForPage);
    // don't use let bc variables already declared earlier
    enteringElements = elementsForPage.enter();
    exitingElements = elementsForPage.exit();

    // 1. deal with exiting
    exitingElements.select("rect")
        .transition()
        .duration(800)  
        .attr("height", function(d, i){
            return 0
        })
    ;
    exitingElements.transition().delay(800).remove()

    // 2. dealing with updates
    elementsForPage.transition().delay(800).duration(800).attr("transform", function(d, i){
        return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
        });

        // only updating things that are impacted by the new data
        // 'updating' = write the code again so that it can run again with the updated dataset

    elementsForPage.select("rect")
        .transition()
        .delay(800)
        .duration(800)
        // .attr("fill", "#F27294")
        .attr("width", function(){
            return xScale.bandwidth();
        })
        .attr("y",function(d,i){
            return -yScale(d.value);
        })
        .attr("height", function(d, i){
            return yScale(d.value);
        })

    // 3. deal with incoming elements

    let enteringDataGroups = enteringElements.append("g").classed("datapoint",true);

    enteringDataGroups.attr("transform",function(d,i){
        return "translate(" + xScale(d.key) + "," + (h-padding) + ")"
    });

    enteringDataGroups.append("rect")
        .attr("width",function(){
            return xScale.bandwidth();
        })
        .attr("height", function(d){
            return 0;
        })
        .attr("y",function(d,i){
            return -yScale(d.value);
        })
        .attr("fill","black")
        .transition().delay(1600)
        .attr("height", function(d){
            return yScale(d.value);
        })
    ;

}

function add(){
    addDatapoints(1);
    updateNew()
}
document.getElementById("buttonA").addEventListener("click", add);

function remove(){
    removeDatapoints(1);
    updateNew()
}
document.getElementById("buttonB").addEventListener("click", remove);

function removeAndAdd(){
    removeAndAddDatapoints(1,1);
    updateNew()
}
document.getElementById("buttonC").addEventListener("click", removeAndAdd);

function sortData(){
    sortDatapoints();
    updateNew()
}
document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData(){
    shuffleDatapoints();
    updateNew()
}
document.getElementById("buttonE").addEventListener("click", sortData);


