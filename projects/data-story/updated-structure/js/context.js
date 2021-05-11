let contextWidth = 400;
let contextHeight = 400;

let contextviz = d3.select("#context-container")
 .append("svg")
    .attr("width",contextWidth)
    .attr("height",contextHeight)
    .attr("id","viz")
   // .style("background-color","midnightblue")
    ;

nodeGroup = contextviz.append("g").attr("class", "nodes");
linkGroup = contextviz.append("g").attr("class", "links");

//contexual bubbles

let width = 400, height = 300

let nodes = [{id:"0", name: "natural climate", sentence:"California gets its rain in the fall and winter, and is extremely hot and dry during the summer months, making the vegetation extremely susceptible to wildfires during this time."}, 
            {id:"1", name: "fire management", sentence: "For thousands of years Native Americans intentionally used controlled fires as a way to prevent raging wildfires from happening during the summers. In 1850, controlled burning is banned by colonizers, and from that point forward, The U.S. Forest Service received more government funding and became highly skilled in putting out fires, effectively suppressing fires from happening as they normally would."}, 
            {id:"2", name: "movement patterns", sentence: "With a rapid growth in population density, people are moving from urban areas directly into areas at risk of wildfires, meaning more human-built infrastructures are getting caught in fires. "}, 
            {id:"3", name: "climate change", sentence: "human-driven climate change is another reason California’s wildfires are so severe: warmer temperatures and dry fuels create the perfect conditions for wildfires to spark"}, 
            {id:"4", name: "impacts", sentence: "As a result of fire suppression and an increase in logging, California’s forests grew denser and small trees grew closer together, creating more trees than the landscape can support."}]



   
   let links = [
     {source: 0, target: 1},
     {source: 0, target: 2},
     {source: 0, target: 3},
     {source: 1, target: 3},
     {source: 3, target: 4},
     {source: 2, target: 1},
     {source: 4, target: 2},
     {source: 0, target: 3},
    
    
     
   ]
   
   var simulation = d3.forceSimulation(nodes)
     .force('charge', d3.forceManyBody().strength(-500))
     .force('center', d3.forceCenter(135, 170))
     .force('link', d3.forceLink().links(links).distance(150))
     .on('tick', ticked);

   
   function updateLinks() {
     var u = d3.select('.links')
       .selectAll('line')
       .data(links)
   
     u.enter()
       .append('line')
       .merge(u)
       .attr('x1', function(d) {
         return d.source.x
       })
       .attr('y1', function(d) {
         return d.source.y
       })
       .attr('x2', function(d) {
         return d.target.x
       })
       .attr('y2', function(d) {
         return d.target.y
       })
       .attr('stroke',"white")
   
     u.exit().remove()
   }
   
   function drawText() {
     u = d3.select('.nodes')
       .selectAll('text')
       .data(nodes)
       .on("mouseover", function(d){
           let text = d.sentence;
           u.text(text)
       })
       .on("mouseout", function(d){
           let text = d.name
           u.text(text)
       })
       
   
     u.enter()
       .append('text')
       .text(function(d) {
         return d.name
       })
       .merge(u)
       .attr('x', function(d) {
         return d.x
       })
       .attr('y', function(d) {
         return d.y
       })
       .attr('dy', function(d) {
         return 10
       })
       .attr("fill","white")
       .style("font-family","Roboto")
       .style("font-size",24);

   
     u.exit().remove()
   }

  
   function ticked() {
     updateLinks()
     drawText()
   
   }
  
  

   

