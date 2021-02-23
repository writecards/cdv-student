// let svgWidth = window.innerWidth;
// let svgHeight = window.innerHeight;
let svgWidth = 1200;
let svgHeight = 800;
let timeDaySize = 30;

let viz = d3.select("#viz-container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
    .style("background-color","midnightblue")
    ;


let catData = d3.json("data.json").then(gotData);
let cellRows = catData.length;


function gotData(newData){
   

    let dataCells = viz.selectAll(".dataCell").data(newData).enter()
        .append("g")
        .attr("class", "dataCell")
        .attr("transform", cellsTranslate)
    ;

    // dataCells.append("circle")
    //     .attr("cx",0)
    //     .attr("cy",0)
    //     //.attr("width",timeDaySize)
    //     .attr("r",timeDaySize)
    //     .attr("fill","none")
    //     .attr("stroke",timeDayFill)
    //     .attr("class","timeOfDay")
    //     .attr("stroke-width",1.5)
    //     ;

    dataCells.append("path")
        .attr("class","catEarLeft")
        .attr("d",d3.symbol()
                .type(d3.symbolTriangle)
                .size(timeDaySize*2)
                
        )
        .attr("stroke",timeDayFill)
        .attr("fill","none")
       
        .attr("transform",earTranslateLeft)
        
    ;

    dataCells.append("path")
    .attr("class","catEarRight")
    .attr("d",d3.symbol()
            .type(d3.symbolTriangle)
            .size(timeDaySize*2)
            
    )
    .attr("stroke",timeDayFill)
        .attr("fill","none")
    .attr("transform",earTranslateRight)
  //  .attr("x",-30)
    
;

     dataCells.append("circle")
        // .attr("cx",catPosX)
        // .attr("cy",catPosY)
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",timeDaySize/1.5)
        .attr("class","catCircle")
        .attr("fill","none")
        .attr("stroke",catColor)
        //.style("fill","url(#myGradient)")
        .attr("opacity","1")
        
        ;
        
        

    dataCells.append("circle")
        .attr("cx",0)
        .attr("cy",-20)
        .attr("r",timeDaySize/2)
        .attr("class","whatIwasDoing")
        .attr("fill","none")
        .attr("stroke",whatIwasDoing)
        .attr("stroke-width",1.5)
        ;

        dataCells.append("circle")
        .attr("class", "whatCatDoing")
        .attr("cx",0)
       // .attr("cy",timeDaySize/5)
       .attr("cy",-5)
       
        .attr("r",timeDaySize/1.5)
        .attr("fill","none")
        .attr("stroke",timeDayFill)
        .attr("stroke-width",2)
        .attr("transform",whatCatDoingRotate)

        ;
 

    dataCells.append("text")
        .text(dateText)
        .attr("x",3-timeDaySize/2)
        .attr("y",13+timeDaySize)
        .attr("font-family","Roboto")
        .attr("fill","beige")
        ;

    dataCells.append("path")
        .attr("d",d3.arc()
            .outerRadius(timeDaySize)
            .innerRadius(timeDaySize-3)
            .startAngle(catPosRotateStart)
            .endAngle(catPosRotateEnd)
    
        )
        .attr("fill","none")
        .attr("stroke",timeDayFill)
        .attr("transform",catTailTrainslate)
       
    ;


    
    
//lines for chart
let axisLineY = viz.append("line")
    .attr("x1",100+svgWidth/2)
    .attr("y1",svgHeight-100)
    .attr("x2",100+svgWidth/2)
    .attr("y2",100)
    .attr("stroke","white")
    ;

let axisLineX = viz.append("line")
    .attr("x1",100+svgWidth/2)
    .attr("y1",svgHeight-100)
    .attr("x2",500+svgWidth/2)
    .attr("y2",svgHeight-100)
    .attr("stroke","white")
    ;

 let graphCells = viz.selectAll(".graphCell").data(newData).enter()
    .append("g")
    .attr("class", "graphCell")
    .attr("transform", graphCellsTranslate)
;
        
graphCells.append("circle")
    .attr("cx",0)
    .attr("cy",0)
    .attr("r",10)
    .attr("fill",catColor)
    .attr("class","graphCircle1");


}
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

let arcGenerator = d3.arc()
    .outerRadius(timeDayFill)
    .innerRadius(timeDayFill/1.5)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);
    ;


//positioning functions

function cellsTranslate(d,i){
   
    let cellSize = timeDaySize;

    let rowsLength = 6;
    let colsLength = 6;
    let rows = Math.floor(i/rowsLength); // divide to place into rows, floor to get rid of decimals
    let cols = i % colsLength; // using remainder to detect when to switch to next column. 
                                 // use remainder instead of division to loop through 0-5
   // console.log("i is", i)
    // console.log("row is", rows)
    // console.log("col is", cols)

    
   // console.log("--")

    let x = cellSize*1.6  + 2.7 * cellSize * rows;
    let y = 80+cellSize*1.6 + 3.5 * cellSize * cols;
    
   
   return "translate(" + x + "," + y + ")";
}


function randomX(){
    return Math.random()*svgWidth;
}

function randomY(){
    return Math.random()*svgHeight;
}


//cat ears

function earTranslateLeft(){
    let x = (-timeDaySize/2)+6
    let y = -timeDaySize-5
    return  "translate(" + x + "," + y + ")";
}
function earTranslateRight(){
    let x = -6+timeDaySize/2
    let y = -timeDaySize-5
    return  "translate(" + x + "," + y + ")";
}


//graph translate functions

function graphCellsTranslate(d,i){

    let x = 120+svgWidth/2+ (i * 12);
    let y = 200+Math.random()*500;
    return "translate(" + x + "," + y + ")";
}

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

function whatCatDoingRotate(d){
    let wydCat = d.whatTheCatWasDoing;
    if (wydCat == "running"){
        //return "url(#catRunning)"
        return "rotate(30)";
    }else if (wydCat == "walking"){
        return "rotate(45)";
    }else if (wydCat == "sitting"){
        return "rotate(60)";
    }else if (wydCat == "eating"){
        return "rotate(135)";
    }
    else if (wydCat == "sleeping"){
        return "rotate(0)";
    }


}

function catTailTrainslate(d){
    let x = 5;
    let y = -10;
    return  "translate(" + x + "," + y + ")";
}

function catPosRotateStart(d){
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
       // return 0;
    }else if(catPosition == "eye level"){
        return Math.PI
    }else if(catPosition == "above me"){
       // return Math.PI/3;
    }else if(catPosition == "through zoom"){
        return Math.PI;
    }
}
function catPosRotateEnd(d){
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
       // return Math.PI/3;
    }else if(catPosition == "eye level"){
        return Math.PI/2
    }else if(catPosition == "above me"){
       // return 0;
    }else if(catPosition == "through zoom"){
        return -Math.PI;
    }
}