let w = 900;
let h = 500;

let xpadding = 100;
let ypadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")

let data = d3.json("data.json").then(gotData);

function gotData(incomingData){
  
    //x scale

    let minYear = incomingData[0].date;
    let maxYear = incomingData[19].date;

    let xDomain = [minYear, maxYear];

   // let xScale = d3.scaleLinear().domain(xDomain).


   let dataGroups = viz.selectAll(".datagroup").data(incomingData).enter()
            .append("g")
            .attr("class","datagroup")
            .attr("transform", getTranslate)
            ;

        let circles = dataGroups.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 5)
            .attr("fill","red")
         
            ;
        
        let fireName = dataGroups.append("text")
            .attr("x",7)
            .attr("y", 15)
            .text( d => d.fireName)

        

      

}

function getTranslate(d,i){
    let x = Math.random() * w;
    let y = Math.random() * h;
    return "translate(" + x + "," + y + ")";
}