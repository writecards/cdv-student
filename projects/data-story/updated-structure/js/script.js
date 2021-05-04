// let svgWidth = window.innerWidth;
// let svgHeight = window.innerHeight*5;



// let viz = d3.select("#container")
//  .append("svg")
//     .attr("width",svgWidth)
//     .attr("height",svgHeight)
//     .attr("id","viz")
//     .style("background-color","linen")
//     ;

// // let backgroundimage = viz.append("image")
// //     .attr("xlink:href", "assets/redwoods2.jpeg")
// //     .attr('transform','scale(0.9)')
// //     .attr('opacity',0.8)

// viz.append("text")
//     .text("California Wildfire Trends")
//     .attr("x", 125)
//     .attr("y", 200)
//     .attr("fill","black")
//     .style("font-family","Smythe")
//     .style("font-size",150);

//     viz.append("text")
//     .text("Shengli Wen")
//     .attr("x", 570)
//     .attr("y", 275)
//     .attr("fill","black")
//     .style("font-family","Roboto")
//     .style("font-size",48);
    
//     enterView({
//         selector: '.special',
//         enter: function(el) {
//             console.log('a special element entered');
//         },
//         exit: function(el) {
//         console.log('a special element exited');
//         },
//         progress: function(el, progress) {
//         console.log("the special element's progress is:", progress);
//         },
//         // offset: 0.5, // enter at middle of viewport
//         // once: true, // trigger just once
//     });