let w = window.innerWidth;
let h = 480;



let viz = d3.select("#vizContainer").append("svg")
	.attr("width", w)
	.attr("height", h)
	.attr("class", "viz")
	//.style("background-color", "blanchedalmond")
;

// let firepic = viz.append('image')
// 	.attr('xlink:href', 'assets/wildfire-1280.jpeg')
// 	.attr('transform','scale(0.5)')
// 	.attr('x', 650)
// 	.attr('y', 0)

// viz.append("text")
//     .attr('class','titletext')
//     .text("California Wildfire Trends")
//     .attr("x", 355)
//     .attr("y", 420)
//     .attr("fill","black")
//     .style("font-family","Smythe")
//     .style("font-size",72);

// viz.append("text")
//     .attr('class','name')
//     .text("shengli wen")
//     .attr("x", 585)
//     .attr("y", 455)
//     .attr("fill","black")
//     .style("font-family","Roboto")
//     .style("font-size",24);
let textX = 500;

viz.append("text")
    .text("California")
    .attr("x", textX)
    .attr("y", 140)
    .attr("fill","black")
    .style("font-family","roboto")
    .style("font-size",150);

    viz.append("text")
    .text("Wildfire")
    .attr("x", textX)
    .attr("y", 260)
    .attr("fill","black")
    .style("font-family","roboto")
    .style("font-size",150);

    viz.append("text")
    .text("Trends")
    .attr("x", textX)
    .attr("y", 380)
    .attr("fill","black")
    .style("font-family","roboto")
    .style("font-size",150);

    viz.append("text")
    .text("by shengli")
    .attr("x", 980)
    .attr("y", 380)
    .attr("fill","black")
    .style("font-family","roboto")
    .style("font-size",64);

  
	














enterView({
	selector: '.trigggerViz1',
	enter: function(el) {
		console.log('a special element entered');
		//myData[0] = [50, 50, 50, "lightblue"]
		//updateGraph();

	},
	exit: function(el) {
    console.log('a special element exited');
		myData[0][2] = 0
		//updateGraph();

	},
	progress: function(el, progress) {
    console.log("the special element's progress is:", progress);
	},
	offset: 0.5, // enter at middle of viewport
	// once: true, // trigger just once
});

