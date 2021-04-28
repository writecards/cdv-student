let svgWidth = window.innerWidth;
let svgHeight = window.innerHeight*5;


let viz = d3.select("#container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
    .style("background-color","linen")
    ;

// let backgroundimage = viz.append("image")
//     .attr("xlink:href", "assets/redwoods2.jpeg")
//     .attr('transform','scale(0.9)')
//     .attr('opacity',0.8)

viz.append("text")
    .text("California")
    .attr("x", 100)
    .attr("y", 140)
    .attr("fill","black")
    .style("font-family","Smythe")
    .style("font-size",150);

    viz.append("text")
    .text("Wildfire")
    .attr("x", 100)
    .attr("y", 260)
    .attr("fill","black")
    .style("font-family","Smythe")
    .style("font-size",150);

    viz.append("text")
    .text("Trends")
    .attr("x", 100)
    .attr("y", 380)
    .attr("fill","black")
    .style("font-family","Smythe")
    .style("font-size",150);

    viz.append("line")
        .attr("x1",0)
        .attr("x2",svgWidth/2)
        .attr("y1",450)
        .attr("y2",450)
        .attr("stroke","black")
        .style("stroke-dasharray",(3,8))

    viz.append("line")
        .attr("x1",svgWidth/2)
        .attr("x2",svgWidth/2)
        .attr("y1",0)
        .attr("y2",850)
        .attr("stroke","black")
        .style("stroke-dasharray",(3,8))

    viz.append("rect")
        .attr("x",100)
        .attr("y",500)
        .attr("width",220)
        .attr("height",220)
        .attr("fill","none")
        .attr("stroke","black")

    viz.append("rect")
        .attr("x",400)
        .attr("y",500)
        .attr("width",220)
        .attr("height",220)
        .attr("fill","none")
        .attr("stroke","black")

    let tree = viz.append('image')
        .attr('xlink:href', 'assets/vintage-pine.png')
        .attr('transform','scale(0.5)')
        .attr('x', 280)
        .attr('y', 1020)

    let flower = viz.append('image')
        .attr('xlink:href', 'assets/botanical2.png' )
        .attr('transform','scale(0.4)')
        .attr('x', 1125)
        .attr('y', 1290)
       
    

    let stamp = viz.append('image')
        .attr('xlink:href', 'assets/vintage-stamp-penny.png')
        .attr("x",1250)
        .attr("y",20)
        .attr("width",141)
        .attr("height",166)

    viz.append("text")
        .attr("class","intro-text")
        .attr("x",800)
        .attr("y",300)
        .style("font-family","Roboto")
        .text("this is introductory line of text line 1/6, this is introductory line of text line 1/6.")
        
    viz.append("text")
        .attr("class","intro-text2")
        .attr("x",800)
        .attr("y",320)
        .style("font-family","Roboto")
        .text("this is introductory line of text line 2/6, this is introductory line of text line 2/6.")

    viz.append("text")
        .attr("class","intro-text3")
        .attr("x",800)
        .attr("y",340)
        .style("font-family","Roboto")
        .text("this is introductory line of text line 3/6, this is introductory line of text line 3/6.")
    
    viz.append("text")
        .attr("class","intro-text4")
        .attr("x",800)
        .attr("y",360)
        .style("font-family","Roboto")
        .text("this is introductory line of text line 4/6, this is introductory line of text line 4/6.")
    
    viz.append("text")
        .attr("class","intro-text")
        .attr("x",800)
        .attr("y",380)
        .style("font-family","Roboto")
        .text("this is introductory line of text line 5/6, this is introductory line of text line 5/6.")
   
    viz.append("text")
        .attr("class","intro-text")
        .attr("x",800)
        .attr("y",400)
        .style("font-family","Roboto")
        .text("this is introductory line of text line 6/6, this is introductory line of text line 6/6.")


// 

   
    let house1 = viz.append('image')
    .attr('xlink:href', 'https://freesvg.org/img/josuemb_house-silhouette.png')
    .attr('width', 200)
    .attr('height', 200)
    .attr('x',300)
    .attr('y',1000)
    .attr('id','house1')

    viz.append('text')
        .text('climate change')
        .attr('x',340)
        .attr('y',1125)
        .style("font-family","Roboto")
        .style("font-size", 18)


    let house2 = viz.append('image')
    .attr('xlink:href', 'https://freesvg.org/img/josuemb_house-silhouette.png')
    .attr('width', 200)
    .attr('height', 200)
    .attr('x',500)
    .attr('y',1000)
    .attr('id','house2')

    viz.append('text')
        .text('population growth')
        .attr('x',530)
        .attr('y',1125)
        .style("font-family","Roboto")
        .style("font-size", 18)

    let house3 = viz.append('image')
    .attr('xlink:href', 'https://freesvg.org/img/josuemb_house-silhouette.png')
    .attr('width', 200)
    .attr('height', 200)
    .attr('x',700)
    .attr('y',1000)
    .attr('id','house3')

    viz.append('text')
        .text('natural')
        .attr('x',770)
        .attr('y',1120)
        .style("font-family","Roboto")
        .style("font-size", 18)

    viz.append('text')
        .text('environment')
        .attr('x',750)
        .attr('y',1135)
        .style("font-family","Roboto")
        .style("font-size", 18)

    let house4 = viz.append('image')
    .attr('xlink:href', 'https://freesvg.org/img/josuemb_house-silhouette.png')
    .attr('width', 200)
    .attr('height', 200)
    .attr('x',900)
    .attr('y',1000)
    .attr('id','house4')
    
    viz.append('text')
    .text('fire')
    .attr('x',990)
    .attr('y',1120)
    .style("font-family","Roboto")
    .style("font-size", 18)

    viz.append('text')
    .text('management')
    .attr('x',950)
    .attr('y',1135)
    .style("font-family","Roboto")
    .style("font-size", 18)


    let vizpic = viz.append('image')
        .attr('xlink:href','assets/viz-screenshot.png')
        .attr('width', 840)
        .attr('height', 1020)
        .attr('x',260)
        .attr('y',1700)
        