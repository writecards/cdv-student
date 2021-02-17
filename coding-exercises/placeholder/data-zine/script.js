let svgWidth = 600;
let svgHeight = 400;
let timeDayRectSize = 50;
let timeDayR = 20;

let viz = d3.select("#vizContainer")
    .append("svg")
        .attr("id","viz")
        .attr("width",svgWidth)
        .attr("height",svgHeight)
    ;

let catData = d3.json("data.json").then(gotData);


function gotData(newdata){
    console.log(newdata)
    let timeDay = newdata[4].timeOfDay; //how  to call each nested value? newdata[i]...?
   // console.log(timeDay);

//time day squares
     

    // viz.selectAll("circle").data(newdata).enter()
    // .append("circle")
    //    .attr("cx",timeDayX)
    //    .attr("cy",timeDayY)
    //    .attr("r",timeDayR)
    //  // .attr("stroke",timeDayFill)
    //    .attr("stroke-width",4)
    //    .attr("fill",timeDayFill)
    //    .attr("opacity","0.5")
    //    .attr("stroke","black")
    //    .attr("overline-thickness","1")

       
    ;
    //style this for what i was doing
      viz.selectAll("rect").data(newdata).enter()
         .append("rect")
         .attr("id", "timeRect")
            .attr("x",timeDayX)
            .attr("y",timeDayY)
            .attr("width",timeDayRectSize)
            .attr("height",timeDayRectSize)
            .attr("stroke",timeDayFill)
            .attr("stroke-width",6)
            .attr("fill",whatIwasDoing)
            .exit()    
     ;

     //what cat was doing .
     


    viz.selectAll("circle").data(newdata).enter()
        .append("circle")
        .attr("cx",catPosX)
        .attr("cy",catPosY)
        .attr("r",catSize)
        .attr("stroke",whatCatDoing)
        .attr("stroke-width", 2)
        .attr("fill",catColor)

    ;

    // viz.selectAll("line").data(newdata).enter()
    //     .append("line")
    //         .attr("x1", timeDayX)
    //         .attr("y1", timeDayY)
    //         .attr("x2",lineX2)
    //         .attr("y2", timeDayY)
    //         .attr("stroke",catColor)
    //         .attr("stroke-width", 3)
    //         ;



     viz.data(newdata).enter()
       //viz.data(newdata).enter()

       .append("rect")
       .attr("id","rect2")
        .attr("x", 100)
        .attr("y",timeDayY)
        .attr('width',20)
        .attr('height',30)   
        .attr('fill','black')
        ;
  

    // // viz.selectAll("g.line").data(newdata).enter()
    // //     .append("g")
    // //     .attr("class", "line")
    //     viz.selectAll("line").data(newdata)
    //     .enter().append("line")
    //     // .attr("x1", function(d, i){return 200;})
    //     // .attr("y1", function(d, i){return 200;})
    //     // .attr("x2", function(d, i){return 20;})
    //     // .attr("y2", function(d, i){return 2*i;})
    //     .attr("x1", timeDay)
    //     .attr("y1", timeDayY)
    //     .attr("x2",timeDayX)
    //     .attr("y2", timeDayY)
    //     .attr("stroke",catColor)
    //     .attr("stroke-width", 3)
      
    //     ;

}

function whatIwasDoing(datapoint){
    let wyd = datapoint.whatIWasDoing;
    if(wyd == "going out"){
        return "bisque";
    }else if(wyd == "going home"){
        return "olive";
    }else if(wyd == "at a store"){
        return "maroon";
    }else if(wyd == "at home"){
        return "teal";
    }
}


function whatCatDoing(datapoint){
    let whatCatDo = datapoint.whatTheCatWasDoing;
    if(whatCatDo == "sitting"){
        return "moccasin"
    }else if(whatCatDo == "walking"){
        return "peachpuff"
    }else if(whatCatDo == "running"){
        return "darkmagenta"
    }else if(whatCatDo == "stalking"){
        return "dimgray"
    }else if(whatCatDo == "hiding"){
        return "darkslategray"
    }else if(whatCatDo == "crossing the street"){
        return "orangered"
    }
}

function lineX2(){
   return  timeDayRectSize*2 + i * (20+timeDayRectSize);
}
// function lineX(datapoint, i){
//     return (svgHeight/2) - timeDayRectSize/2;

// }

function randomX(){
   return 100 + (Math.random()*200)+timeDayR*2;
}

function randomY(){
   //return Math.random()*svgHeight;
   return 200+ (Math.random()*200) - timeDayR*2;

}

function timeDayX(datapoint, i, extra){
    console.log(extra);
    return timeDayRectSize/1.5 + i * (20+timeDayRectSize);
}

function timeDayY(datapoint, i){
    return  (svgHeight/2) - timeDayRectSize/2;
}

function catColor(datapoint){
    let catColor = datapoint.catColor;
    console.log(catColor);
    if(catColor == "black"){
        return "black";
    }else if(catColor == "white"){
        return "white";
    }else if(catColor == "grey"){
        return "darkGrey";
    }else if(catColor == "multi"){
        return "pink";
    }
}


function catSize(datapoint){
    if (datapoint.catsPositionInRelationToMe == "far away"){
        return timeDayRectSize/8;
    }else{
        return timeDayRectSize/5;
    }
}
function catPosX(datapoint, i){
    return timeDayRectSize + (i * timeDayRectSize*1.4);

}
function catPosY(datapoint){
    let catPos = datapoint.catsPositionInRelationToMe;
    if(catPos == "above me"){
        return 200;
    }else if(catPos == "eye level"){
        return svgHeight/2;
    }if(catPos == "below me"){
        return timeDayRectSize/5 + svgHeight/2;
    }if(catPos == "far away"){
        return timeDayRectSize/5 + svgHeight/2
    }if(catPos == "through zoom"){
        return 200;
    }
}


function timeDayFill(datapoint){
    let timeDayVar = datapoint.timeOfDay;
    // let timeDayVar = catData.select(timeOfDay);
 //  console.log(timeDayVar);
    if(timeDayVar == "morning"){
        return "orchid";
    }else if(timeDayVar == "afternoon"){
        return "steelblue";
    }else if(timeDayVar == "evening"){
        return "darkOrange";
    }else if(timeDayVar == "late night"){
        return "darkBlue";
    }
}



