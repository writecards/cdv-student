//contexual bubbles
let nodes = [{}, {}, {}, {}, {}]
let links = [{source: 0, target: 2},
             {source: 1, target: 2},
             {source: 1, target: 3},
             {source: 4, target: 0},

    ]

let simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(20))
  .force('collision', d3.forceCollide().radius(130))
  .force('center', d3.forceCenter(svgWidth / 2, 1350))
  .on('tick', ticked);

simulation.force('link', d3.forceLink().links(links)).strength(200)

  function ticked() {
    let u = d3.select('svg')
      .selectAll('circle')
      .data(nodes)
    u.enter()
      .append('circle')
      .attr("r",120)
      .attr("stroke","black")
      .attr("stroke-width",3)
      .attr("fill","none")
      .merge(u)
      .attr('cx', function(d) {
        return d.x
      })
      .attr('cy', function(d) {
        return d.y
      })
  
    u.exit().remove()

    let z = d3.select('svg')
        .selectAll("line")
        .data(links)
    z.enter()
      .append('line')
      .attr('x1', function(d){
          return d.source.x;
      })
      .attr('x2', function(d){
        return d.target.x;
    })
    .attr('y1', function(d){
        return d.source.y;
    })
    .attr('y2', function(d){
        return d.target.y;
    })
    .attr("stroke","orange")
    .attr("stroke-width",5)

    z.exit().remove()

  }