// let svgWidth = window.innerWidth;
// let svgHeight = window.innerHeight;
let svgWidth = 600;
let svgHeight = 600;
let timeDaySize = 35;

let viz = d3.select("#viz-container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
    .style("background-color","midnightblue")
    ;
let grid = d3.select("#vizcontainer")

let catData = d3.json("data.json").then(gotData);
let cellRows = catData.length;

//let cellCols = catData[0].length;

function gotData(newData){
    //console.log(newData.length)
    // viz.selectAll(".timeOfDay").data(newData).enter()
    //     .append("rect")
    //     .attr("x",randomX)
    //     .attr("y",randomY)
    //     .attr("width",timeDaySize)
    //     .attr("height",timeDaySize)
    //     .attr("fill","white")
    //     .attr("class","timeOfDay")
    //     ;
    // viz.selectAll(".whatIwasDoing").data(newData).enter()
    //     .append("circle")
    //     .attr("cx",randomX)
    //     .attr("cy",randomY)
    //     .attr("r",30)
    //     .attr("class","whatIwasDoing")
    //     .attr("fill","lightblue")
        //;

    let dataCells = viz.selectAll(".dataCell").data(newData).enter()
    .append("g")
    .attr("class", "dataCell")
    .attr("transform", cellsTranslate)
    ;


    dataCells.append("circle")
        .attr("cx",0)
        .attr("cy",0)
        //.attr("width",timeDaySize)
        .attr("r",timeDaySize)
        .attr("fill","none")
        .attr("stroke",timeDayFill)
        .attr("class","timeOfDay")
        ;

     dataCells.append("circle")
        .attr("cx",catPosX)
        .attr("cy",catPosY)
        .attr("r",timeDaySize/1.5)
        .attr("class","catCircle")
        .attr("fill",catColor)
        //.style("fill","url(#myGradient)")
        .attr("opacity","1")
        
        ;

    dataCells.append("circle")
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",timeDaySize/1.5)
        .attr("class","whatIwasDoing")
        .attr("fill","none")
        .attr("stroke",whatIwasDoing)
        .attr("stroke-width",1)
        ;

    dataCells.append("text")
        .text(dateText)
        .attr("x",3-timeDaySize/2)
        .attr("y",13+timeDaySize)
        .attr("font-family","Roboto")
        .attr("fill","beige")
        ;

    // dataCells.append(whatCatDoing)
    //     .attr("class","actionFeatures")

        

        ;
        
}

//positioning functions

function cellsTranslate(d,i){
    // i==0 (first datapoint): should go to row0column0
    // i==1: should go to row0column1
    // i==2: should go to row0column2
    // i==3: should go to row0column3
    // i==4: should go to row0column4
    // i==5: :rotating_light: now we need to jump to the next row* and back in the columns… row1column0
    // i==6: should go to row1column1
    // …
    // *how can we detect this? when i/5 column number  is bigger than 1

    //let x, y;
   // console.log("i=",i, "div= ",i / rows.length);
    let cellSize = timeDaySize;

    let rowsLength = 6;
    let colsLength = 6;
    let rows = Math.floor(i/rowsLength);
    let cols = i % colsLength;
    console.log("i is", i)
    console.log("row is", rows)
    console.log("col is", cols)

    
    console.log("--")

    let x = 2.5 * cellSize * rows;
    let y = 2.5 * cellSize * cols;
    
    // let rows = [1,2,3,4,5,6];
    // let cols = [1,2,3,4,5,6];
    
    // if(i % cols.length == 0){
    //     x = 2.5* cellSize * rows[0];
    // }
    // if(i % cols.length == 1){
    //     x = 2.5 * cellSize * rows[1];
    // }
    // if(i % cols.length == 2){
    //     x = 2.5 * cellSize * rows[2];
    // }
    // if(i % cols.length ==3){
    //     x = 2.5 * cellSize * rows[3];
    // }
    // if(i % cols.length == 4){
    //     x = 2.5 * cellSize * rows[4];
    // }
    // if(i % cols.length == 5){
    //     x = 2.5 * cellSize * rows[5];
    // }

    // if((i / cols.length) <= 1){
    //     y = 2.5 * cellSize * cols[0];
    // }
    // if((i / cols.length) > 1 && (i / cols.length) < 2){
    //     y = 2.5 * cellSize * cols[1];
    // }
    // if((i / cols.length) > 2 && (i / cols.length) < 3){
    //     y = 2.5 * cellSize * cols[2];
    // } 
    // if((i / cols.length) > 3 && (i / cols.length) < 4){
    //     y = 2.5 * cellSize * cols[3];
    // }
    // if((i / cols.length) > 4 && (i / cols.length) < 5){
    //     y = 2.5 * cellSize * cols[4];
    // }
    // if((i / cols.length) > 5 && (i / cols.length) < 6){
    //     y = 2.5 * cellSize * cols[5];
    // }

  



    // if(i == 0){
    //     x = 2 * timeDaySize * cols[0];
    //     y = timeDaySize * rows[0];
    // }
    // if(i == 1){
    //     x = 2 * timeDaySize  * cols[1];
    //     y = timeDaySize * rows[0];
    // }
    // if(i == 3){
    //     x = 2 * timeDaySize  * cols[2];
    //     y = timeDaySize * rows[0];
    // }
    // if(i == 4){
    //     x = 2 * timeDaySize  * cols[3];
    //     y = timeDaySize * rows[0];
    // } 
    // if(i == 5){
    //     x = 2 * timeDaySize  * cols[4];
    //     y = timeDaySize * rows[0];
    // }
    // if(i == 6){
    //     x = 2 * timeDaySize  * cols[5];
    //     y = timeDaySize * rows[0];
    // }
    // if(i == 7){
    //     x = 2 * timeDaySize  * cols[0];
    //     y = 2* timeDaySize * rows[1];
    // }

 
        // for(let cols = 0; cols < 5; cols++){
        //  if(i == 0){
            
        //  }
 
        // }


//    for(let rows = 0; rows < 5; rows++){
//        for(let cols = 0; cols < 5; cols++){
//         if(i == 0){
           
//         }

//        }
//    }
    

    




    // let x = 10 + (i * 70);
    // let y = 10 + (i * 70);
   return "translate(" + x + "," + y + ")";
}


function randomX(){
    return Math.random()*svgWidth;
}

function randomY(){
    return Math.random()*svgHeight;
}

function groupPosX(){

}

function groupPoxY(){

}

/// drawing shit for what the cat was doing
viz.append("line")
    .attr("id","catRunning")
    .attr("x1", 100)
        .attr("y1", 100)
        .attr("x2", 40)
        .attr("y2", 100)
        .attr("stroke","white")
    ;


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
    .style("stop-opacity",0.7)
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
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
        return 0;
    }else if(catPosition == "eye level"){
        return -7;
    }else if(catPosition == "above me"){
        return 0;
    }else if(catPosition == "through zoom"){
        return 0;
    }
}
function catPosY(d){
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
        return 7;
    }else if(catPosition == "eye level"){
        return 0
    }else if(catPosition == "above me"){
        return -7;
    }else if(catPosition == "through zoom"){
        return -10;
    }
}

function dateText(d){
    let textDate = d.date;
    return textDate[6]+ "."+ textDate[8]+textDate[9];
}

function whatCatDoing(d){
    let wydCat = d.whatTheCatWasDoing;
    if (wydCat == "running"){
        return "url(#catRunning)"
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