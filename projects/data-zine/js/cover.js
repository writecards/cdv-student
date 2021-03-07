let w = 1200;
let h = 800;


let viz = d3.select("#container")
    .append("svg")
    .attr("id","viz")
    .attr("width",w)
    .attr("height",h)
   // .style("background-color","rgb(217, 214, 210)")
   .style("background-color","rgb(231, 225, 216)")
    ;


let titleText =  viz.append("text")
.attr("x",370)
.attr("y",600)
.text("stray cats of shanghai")
.style("font-family","Roboto")
.style("font-size",48)
.attr("fill","black")
;



viz.append("circle")
        .attr("class","keyCircle1")
        .attr("cx",600)
        .attr("cy",400)
        .attr("r",100)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        ;


     viz.append("circle")
        .attr("class","keyCircle2")
        .attr("cx",600)
        .attr("cy",400)
        .attr("r",80)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        .style("stroke-dasharray",(3,8))
        ;

        viz.append("circle")
        .attr("class","keyCircle3")
        .attr("cx",600)
        .attr("cy",275)
        .attr("r",60)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        ;

        viz.append("path")
        .attr("class","keyOuterCircle1")
        .attr("d",d3.arc()
            .outerRadius(130)
            .innerRadius(130)
            .startAngle(Math.PI)
            .endAngle(4*Math.PI/3)
        )
        .attr("fill","none")
        .attr("stroke-width",2)
        .attr("stroke","black")
        .attr("transform","translate(600,400)")
        
        ;

