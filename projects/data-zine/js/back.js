let svgWidth = 1200;
let svgHeight = 800;
let timeDaySize = 45;

let packCircleSize = 10;

let viz = d3.select("#container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
    .style("background-color","darkslateblue")
    ;


let catData = d3.json("data.json").then(gotData);
let cellRows = catData.length;


function gotData(newData){
  



    
    
//lines for chart
// let axisLineY1 = viz.append("line")
//     .attr("x1",100+svgWidth/2)
//     .attr("y1",svgHeight-100)
//     .attr("x2",100+svgWidth/2)
//     .attr("y2",100)
//     .attr("stroke","white")
//     ;

let axisLineX1 = viz.append("line")
    .attr("x1",180)
    .attr("y1",510)
    .attr("x2",520)
    .attr("y2",510)
    .attr("stroke","beige")
    ;

 let axisLineX2 = viz.append("line")
    .attr("x1",680)
    .attr("y1",510)
    .attr("x2",1010)
    .attr("y2",510)
    .attr("stroke","beige")
    ;



//graph translate functions


function getDay(d){
     d.date = new Date(d.date);
    return d.date;
}

let transformedData = transformData(newData);

function transformData(d){
    let timeCorrected = newData.map(getDay);
    return timeCorrected;
}

let firstDay = d3.min(newData, getDay);
let lastDay = d3.max(newData, getDay);

console.log(firstDay, lastDay)

let timeScale = d3.scaleTime().domain([ firstDay, lastDay ]).range( [200, 500]);



 let graphCells = viz.selectAll(".graphCell").data(newData).enter()
    .append("g")
    .attr("class", "graphCell")
    .attr("transform", graphCellsTranslate)
;


function graphCellsTranslate(d,i){
    let cols = i % 20;

    let x = timeScale(d.date);
    let y = 300+cols*10;
    return "translate(" + x + "," + y + ")";
}


        // i want to group graph cells by day
   

graphCells.append("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",5)
    .attr("fill","none")
    .attr("stroke","tan")
    .attr("stroke-width",2)
    .attr("class","graphCircle1")
    ;
graphCells.append("text")
    .attr("x",0)
    .attr("y",0)
    .attr("fill","white")
    //.text(getDay)
    ;

    viz.append("text")
        .attr("class","textAline1")
        .attr("x",100)
        .attr("y",550)
        .text("I saw the most cats on 2.12 when I walked past a nice grandma")
        .style("font-size",18)
        .style("width","80")
        .attr("font-family","Roboto")
        .attr("fill","beige")
        ;
     viz.append("text")
        .attr("class","textAline2")
        .attr("x",205)
        .attr("y",570)
        .text("feeding cats under the Nanpu Bridge")
        .style("font-size",18)
        .style("width","80")
        .attr("font-family","Roboto")
        .attr("fill","beige")
        ;
     viz.append("text")
        .attr("class","textAline3")
        .attr("x",160)
        .attr("y",600)
        .text("I saw no cats between 2.16-2.19 because I did not")
        .style("font-size",18)
        .style("width","80")
        .attr("font-family","Roboto")
        .attr("fill","beige")
        ;
     viz.append("text")
        .attr("class","textAline4")
        .attr("x",290)
        .attr("y",620)
        .text("leave my room")
        .style("font-size",18)
        .style("width","80")
        .attr("font-family","Roboto")
        .attr("fill","beige")
        ;




    let numCats = newData.length;
    ////////////////////////////////////////force circle packs/////////
    
    let whiteCatNum = newData.filter(function(d){
        return d.catColor == "white"
    })
    
    let nodes = d3.range(whiteCatNum.length).map(function(d){ //need this to make it work
        return{radius: packCircleSize}
    })

    
    let whiteCatPack = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(5))
          .force("center", d3.forceCenter(900,-150+svgHeight/2)) //centerpoint attracted to
        .force("collision",d3.forceCollide().radius(function(d){
            return d.radius;
             }))
        .on('tick',drawWhitePack)

        function drawWhitePack(){
            let u = viz.selectAll(".whiteCatCirclePack").data(nodes);

             u.enter()
              .append("circle")
                .attr("r",function(d){
                    return d.radius
                })
                .attr("class","whiteCatCirclePack")
                .attr("stroke","white")
                .attr("fill","none")
             .merge(u) ///what does this do
                .attr('cx', function(d) {
                    return d.x
                    })
                .attr('cy', function(d) {
                    return d.y
                    })
        
                ;
            }

    
            let blackCatNum = newData.filter(function(d){
                return d.catColor == "black"
            })
            
            let blackCatNodes = d3.range(blackCatNum.length).map(function(d){ //need this to make it work
                return{radius: packCircleSize}
            })
        
            
            let blackCatPack = d3.forceSimulation(blackCatNodes)
                .force("charge", d3.forceManyBody().strength(5))
                .force("center", d3.forceCenter(750,350)) //centerpoint attracted to
                .force("collision",d3.forceCollide().radius(function(d){
                    return d.radius;
                     }))
                .on('tick',drawBlackPack)
        
                function drawBlackPack(){
                    let u = viz.selectAll(".blackCatCirclePack").data(blackCatNodes);
        
                     u.enter()
                      .append("circle")
                        .attr("r",function(d){
                            return d.radius;
                        })
                        .attr("class","blackCatCirclePack")
                        .attr("stroke","black")
                        .attr("fill","none")
                     .merge(u) ///what does this do
                        .attr('cx', function(d) {
                            return d.x
                            })
                        .attr('cy', function(d) {
                            return d.y
                            })
                
                        ;
                    }

        let greyCatNum = newData.filter(function(d){
            return d.catColor == "grey"
        })
        
        let greyCatNodes = d3.range(greyCatNum.length).map(function(d){ //need this to make it work
            return{radius: packCircleSize}
        })
    
        
        let greyCatPack = d3.forceSimulation(greyCatNodes)
            .force("charge", d3.forceManyBody().strength(5))
            .force("center", d3.forceCenter(800,250)) //centerpoint attracted to
            .force("collision",d3.forceCollide().radius(function(d){
                return d.radius;
                    }))
            .on('tick',drawGreyPack)
    
            function drawGreyPack(){
                let u = viz.selectAll(".greyCatCirclePack").data(greyCatNodes);
    
                    u.enter()
                    .append("circle")
                    .attr("r",function(d){
                        return d.radius;
                    })
                    .attr("class","greyCatCirclePack")
                    .attr("stroke","grey")
                    .attr("fill","none")
                    .merge(u) ///what does this do
                    .attr('cx', function(d) {
                        return d.x
                        })
                    .attr('cy', function(d) {
                        return d.y
                        })
            
                    ;
                }
    let orangeCatNum = newData.filter(function(d){
        return d.catColor == "orange"
    })
    
    let orangeCatNodes = d3.range(orangeCatNum.length).map(function(d){ //need this to make it work
        return{radius: packCircleSize}
    })

    
    let orangeCatPack = d3.forceSimulation(orangeCatNodes)
        .force("charge", d3.forceManyBody().strength(5))
        .force("center", d3.forceCenter(950,-80+svgHeight/2)) //centerpoint attracted to
        .force("collision",d3.forceCollide().radius(function(d){
            return d.radius;
                }))
        .on('tick',drawOrangePack)

        function drawOrangePack(){
            let u = viz.selectAll(".orangeCatCirclePack").data(orangeCatNodes);

                u.enter()
                .append("circle")
                .attr("r",function(d){
                    return d.radius;
                })
                .attr("class","orangeCatCirclePack")
                .attr("stroke","orange")
                .attr("fill","none")
                .merge(u) ///what does this do
                .attr('cx', function(d) {
                    return d.x
                    })
                .attr('cy', function(d) {
                    return d.y
                    })
        
                ;
            }

    let multiColCatNum = newData.filter(function(d){
        return d.catColor == "multi"
    })
    
    let multiColCatNodes = d3.range(multiColCatNum.length).map(function(d){ //need this to make it work
        return{radius: packCircleSize}
    })

    
    let multiColCatPack = d3.forceSimulation(multiColCatNodes)
        .force("charge", d3.forceManyBody().strength(5))
        .force("center", d3.forceCenter(850,430)) //centerpoint attracted to
        .force("collision",d3.forceCollide().radius(function(d){
            return d.radius;
                }))
        .on('tick',drawMultiPack)

        function drawMultiPack(){
            let u = viz.selectAll(".multiColCatCirclePack").data(multiColCatNodes);

                u.enter()
                .append("circle")
                .attr("r",function(d){
                    return d.radius;
                })
                .attr("class","multiColCatCirclePack")
                .attr("stroke","pink")
                .attr("fill","none")
                .merge(u) ///what does this do
                .attr('cx', function(d) {
                    return d.x
                    })
                .attr('cy', function(d) {
                    return d.y
                    })
        
                ;
            }
          
            viz.append("text")
            .attr("class","textBline1")
            .attr("x",690)
            .attr("y",550)
            .text("I saw the most multi-colored cats at 17,")
            .style("font-size",18)
            .style("width","80")
            .attr("font-family","Roboto")
            .attr("fill","beige")
            ;

            viz.append("text")
            .attr("class","textBline1")
            .attr("x",725)
            .attr("y",570)
            .text("and the least grey cats, just one.")
            .style("font-size",18)
            .style("width","80")
            .attr("font-family","Roboto")
            .attr("fill","beige")
            ;
   
}





//////
//KEY

// viz.append("circle")
//     .attr("class","keyCircle")
//     .attr("cx",300)
//     .attr("cy",750)
//     .attr("r",40)
//     .attr("fill","none")
//     .attr("stroke","white")
//     .attr("stroke-width",5)
//     ;
// viz.append("text")
//     .attr("x",180)
//     .attr("y",600)
//     .text("key")
//     .attr("fill","beige")
//     .attr("font-family","Roboto")




///arc function, help from stack overflow d3 reference



//positioning functions






////style functions



function timeDayFill(d){
    let timeDayVar = d.timeOfDay;
    // let timeDayVar = catData.select(timeOfDay);
 //  console.log(timeDayVar);
    if(timeDayVar == "morning"){
        return "gold";
    }else if(timeDayVar == "afternoon"){
        return "steelblue";
    }else if(timeDayVar == "evening"){
        return "darkOrange";
    }else if(timeDayVar == "late night"){
        return "cornflowerblue";
    }
}

function whatIwasDoing(d){
    let wyd = d.whatIWasDoing;
    if(wyd == "going out"){
        return "lightyellow";
    }else if(wyd == "going home"){
        return "olive";
    }else if(wyd == "at a store"){
        return "maroon";
    }else if(wyd == "at home"){
        return "teal";
    }
}

function catColor(d){
    let catColor = d.catColor;
    //console.log(catColor)
    
    if(catColor == "black"){
        return "black";
    }else if(catColor == "white"){
        ///return "palegoldenrod";
        return "orangered"
    }else if(catColor == "grey"){
        return "darkGrey";
    }else if(catColor == "multi"){
        return "url(#myGradient)";
    }else if(catColor == "orange"){
        return "orange";
    }

   
    

   
}






let catColorGradient = viz.append("linearGradient")
    .attr("id","myGradient")
    .attr("x1","0%")
    .attr("x2","0%")
    .attr("y1","0%")
    .attr("y2","100%")
    ;
catColorGradient.append("stop")
    .attr("offset","0%")
    .style("stop-color","red")
    .style("stop-opacity",1)
    ;
// catColorGradient.append("stop")
//     .attr("offset","25%")
//     .style("stop-color","white")
//     .style("stop-opacity",1)
//     ;
catColorGradient.append("stop")
    .attr("offset","50%")
    .style("stop-color","gold")
    .style("stop-opacity",1)
    ;
catColorGradient.append("stop")
    .attr("offset","100%")
    .style("stop-color","orange")
    .style("stop-opacity",0.5)
;

function catPosX(d){
    let shiftVal = 10;
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
        return 0;
    }else if(catPosition == "eye level"){
        return -shiftVal;
    }else if(catPosition == "above me"){
        return 0;
    }else if(catPosition == "through zoom"){
        return 0;
    }
}
function catPosY(d){
    let shiftVal = 10;
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
        return shiftVal;
    }else if(catPosition == "eye level"){
        return 0
    }else if(catPosition == "above me"){
        return -shiftVal;
    }else if(catPosition == "through zoom"){
        return -shiftVal;
    }
}

function dateText(d){
    let textDate = d.date;
    return textDate[6]+ "."+ textDate[8]+textDate[9];
}

function whatCatDoing(d){
    let wydCat = d.whatTheCatWasDoing;
    if (wydCat == "running"){
        //return "url(#catRunning)"
        return 20;
    }else if (wydCat == "walking"){
        return 
    }else if (wydCat == "sitting"){
        return 
    }else if (wydCat == "eating"){
        return 
    }
    else if (wydCat == "sleeping"){
        return 
    }


}

function whatCatDoingHeadRotate(d){
    let wydCat = d.whatTheCatWasDoing;
    if (wydCat == "running"){
        return "rotate(90)";
    }else if (wydCat == "walking"){
        return "rotate(60)";
    }else if (wydCat == "sitting"){
        return "rotate(0)";
    }else if (wydCat == "eating"){
        return "rotate(180)";
    }
    else if (wydCat == "stalking"){
        return "rotate(225)";
    }

}

function whatCatDoingTailRotate(d){
    let wydCat = d.whatTheCatWasDoing;
    if (wydCat == "running"){
        return "rotate(270)";
    }else if (wydCat == "walking"){
        return "rotate(225)";
    }else if (wydCat == "sitting"){
        return "rotate(180)";
    }else if (wydCat == "eating"){
        return "rotate(0)";
    }
    else if (wydCat == "stalking"){
       return "rotate(0)";
    }


}






function catPosRotateStart(d){
    let catPosition = d.catsPositionInRelationToMe;
    // if( catPosition == "below me"){
    //    // return 0;
    // }else if(catPosition == "eye level"){
    //     return Math.PI
    // }else if(catPosition == "above me"){
    //    // return Math.PI/3;
    // }else if(catPosition == "through zoom"){
    //     return Math.PI;
    // }
    return 0;
}
function catPosRotateEnd(d){
    let catPosition = d.catsPositionInRelationToMe;
    // if( catPosition == "below me"){
    //    // return Math.PI/3;
    // }else if(catPosition == "eye level"){
    //     return Math.PI/2
    // }else if(catPosition == "above me"){
    //    // return 0;
    // }else if(catPosition == "through zoom"){
    //     return -Math.PI;
    // }
    return Math.PI/2;
}


