let w = 1200;
let h = 800;


let viz = d3.select("#container")
    .append("svg")
    .attr("id","viz")
    .attr("width",w)
    .attr("height",h)
    .style("background-color","darkslateblue")
    ;

d3.json("data.json").then(gotData);

function gotData(incomingData){

  
    // viz.selectAll(".tailArcs").data(incomingData).enter()
    //     .append("path")
    //      .attr("d", d3.arc()
    //         .outerRadius(30)
    //         .innerRadius(20)
    //         .startAngle(0)
    //         .endAngle(Math.PI)
    //         )
    //     .attr("transform","rotate(80)")
    //     .attr("transform",randomPos)   
    //     .attr("fill","white")
    //     .attr("opacity",0.4)
    // ;

  

}
let titleText =  viz.append("text")
.attr("x",250)
.attr("y",h/2)
.text("stray cats of shanghai")
.style("font-family","Sarabun")
.style("font-size",90)
.attr("fill","white")
.attr()
;



function randomPos(d){
    let x = Math.random()*w;
    let y = Math.random()*h;
    return "translate(" + x + ", " + y + ")";
}

function randomStartAngle(){
    return Math.random()*(Math.PI)*2
}

function randomEndAngle(){
   
    return Math.random()*(Math.PI)*2
}