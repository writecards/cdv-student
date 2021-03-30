d3.csv("data.csv").then(gotData);

let svgWidth = window.innerWidth;
let svgHeight = window.innerHeight;

let viz = d3.select("#viz-container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
    .style("background-color","midnightblue")
    ;

function filterFunction(d){
    if(d.popularity > 90){
        return true;
    }else{
        return false;
    }

}

function gotData(incomingData){
    
    let transformedData = transformData(incomingData);
    console.log(transformedData);

    function transformData(dataToTransform){
        let newData = dataToTransform.filter(filterFunction);
        return newData;
    }


    let dataGroup = viz.selectAll(".dataGroup").data(transformedData).enter()
        .append("g")
        .attr("class", "dataGroup")
        .attr("transform", randomTranslate)
        ;

    dataGroup.append("circle")
        .attr("class","helloCircle")
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",3)
        .attr("fill","white")
        ;

    dataGroup.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text(function(d){
            return d.name;
        })
        .attr("fill","white")
        ;
    

    
}

function randomTranslate(){
    let x = Math.random()*window.innerWidth;
    let y = Math.random()*window.innerHeight;

    return "translate(" + x + "," + y + ")";
}