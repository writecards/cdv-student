let svgWidth = 2400;
let svgHeight = 800;
let timeDaySize = 45;

let packCircleSize = 10;

let viz = d3.select("#container")
 .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight)
    .attr("id","viz")
   // .style("background-color","rgb(217, 214, 210)")
  .style("background-color","rgb(231, 225, 216)")
  //.style("background-color","rgb(241, 235, 236)")
    ;


let catData = d3.json("data.json").then(gotData);
let cellRows = catData.length;

viz.append("text")
.attr("class","textAline1")
.attr("x",310)
.attr("y",145)
.text("there are approximately 30 million stray cats living among us in Shanghai")
.style("font-size",18)
.style("width","80")
.attr("font-family","Roboto")
.attr("fill","black")
;

viz.append("text")
.attr("class","textAline2")
.attr("x",360)
.attr("y",170)
.text("here are some I encountered over the past couple of weeks")
.style("font-size",18)
.style("width","80")
.attr("font-family","Roboto")
.attr("fill","black")
;

viz.append("rect")
    .attr("class","keyplacerbox")
    .attr("x",450)
    .attr("y",200)
    .attr("width",300)
    .attr("height",300)
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width",2)
    ;

   
    viz.append("circle")
        .attr("class","keyCircle1")
        .attr("cx",600)
        .attr("cy",350)
        .attr("r",100)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        ;

     viz.append("circle")
        .attr("class","keyCircle2")
        .attr("cx",600)
        .attr("cy",350)
        .attr("r",80)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        .style("stroke-dasharray",(3,8))
        ;

        viz.append("circle")
        .attr("class","keyCircle3")
        .attr("cx",675)
        .attr("cy",290)
        .attr("r",45)
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        ;



    viz.append("path")
    .attr("class","keyOuterCircle1")
    .attr("d",d3.arc()
        .outerRadius(120)
        .innerRadius(120)
        .startAngle(Math.PI)
        .endAngle(4*Math.PI/3)
    )
    .attr("fill","none")
    .attr("stroke-width",3)
    .attr("stroke","black")
    .attr("transform","translate(600,350)")
    
    ;

    viz.append("text")
    .attr("class","keyNum1")
    .text("1")
    .attr("x",480)
    .attr("y",300)
    .style("font-family","Roboto")
    .style("font-size",32)
    ;

    viz.append("text")
    .attr("class","keyNum4")
    .text("4")
    .attr("x",630)
    .attr("y",400)
    .style("font-family","Roboto")
    .style("font-size",32)
    ;
    viz.append("text")
        .attr("class","keyNum3")
        .text("3")
        .attr("x",630)
        .attr("y",240)
        .style("font-family","Roboto")
        .style("font-size",32)
        ;

        viz.append("text")
        .attr("class","keyNum5")
        .text("5")
        .attr("x",500)
        .attr("y",470)
        .style("font-family","Roboto")
        .style("font-size",32)
        ;

        viz.append("text")
        .attr("class","keyNum2")
        .text("2")
        .attr("x",555)
        .attr("y",320)
        .style("font-family","Roboto")
        .style("font-size",32)
        ;



        let timeDayKey = viz.append("g");

        timeDayKey.attr("transform","translate(250,550)");

        timeDayKey.append("text")
        .attr("class","timeDaylabel1")
        .text("1. time of day")
        .attr("x",0)
        .attr("y",0)
        .style("font-family","Roboto")
        .style("font-size",18)
        ;
        

        timeDayKey.append("circle")
        .attr("class","keyOuterCircle1")
        .attr("cx",15)
        .attr("cy",20)
        .attr("r",10)
        .attr("fill","rgb( 166, 3, 3)")
        //.attr("stroke","black")
        .attr("stroke-width",2)
        ;
        timeDayKey.append("circle")
        .attr("class","keyOuterCircle2")
        .attr("cx",15)
        .attr("cy",45)
        .attr("r",10)
        .attr("fill","rgb(2, 62, 115)")
        //.attr("stroke","black")
        .attr("stroke-width",2)
        ;
        timeDayKey.append("circle")
        .attr("class","keyOuterCircle3")
        .attr("cx",15)
        .attr("cy",70)
        .attr("r",10)
        .attr("fill","rgb(89, 2, 2)")
        .attr("stroke-width",2)
        ;

        timeDayKey.append("circle")
        .attr("class","keyOuterCircle4")
        .attr("cx",15)
        .attr("cy",95)
        .attr("r",10)
        .attr("fill","rgb(6, 115, 84)")
        .attr("stroke-width",2)
        ;

        timeDayKey.append("text")
        .attr("class","timeDaylabel1")
        .text("morning")
        .attr("x",30)
        .attr("y",25)
        .style("font-family","Roboto")
        .style("font-size",18)
        ;

        timeDayKey.append("text")
        .attr("class","timeDaylabel2")
        .text("afternoon")
        .attr("x",30)
        .attr("y",50)
        .style("font-family","Roboto")
        .style("font-size",18)
        ;
        timeDayKey.append("text")
        .attr("class","timeDaylabel3")
        .text("evening")
        .attr("x",30)
        .attr("y",75)
        .style("font-family","Roboto")
        .style("font-size",18)
        ;

        timeDayKey.append("text")
        .attr("class","timeDaylabel1")
        .text("late night")
        .attr("x",30)
        .attr("y",100)
        .style("font-family","Roboto")
        .style("font-size",18)
        ;

    let innerCircleKey = viz.append("g");
    
    innerCircleKey.attr("transform","translate(400,550)")
        .style("font-family","Roboto")
        .style("font-size",18);

    innerCircleKey.append("text")
        .attr("class","innerCircleKeyTitle")
        .text("2. cat's color")
        ;
        innerCircleKey.append("circle")
        .attr("class","keyInnerCircle1")
        .attr("cx",15)
        .attr("cy",20)
        .attr("r",10)
        .attr("fill","rgb(0, 21, 60)")
        .attr("stroke-width",2)
        ;
        innerCircleKey.append("circle")
        .attr("class","keyInnerCircle2")
        .attr("cx",15)
        .attr("cy",45)
        .attr("r",10)
        .attr("fill","rgb(132, 192, 214)")
        .attr("stroke-width",2)
        ;
        innerCircleKey.append("circle")
        .attr("class","keyInnerCircle3")
        .attr("cx",15)
        .attr("cy",70)
        .attr("r",10)
        .attr("fill","rgb(158, 153, 240)")
        .attr("stroke-width",2)
        ;

        innerCircleKey.append("circle")
        .attr("class","keyInnerCircle4")
        .attr("cx",15)
        .attr("cy",95)
        .attr("r",10)
        .attr("fill","rgb( 255, 176, 0)")
        .attr("stroke-width",2)
        ;

        innerCircleKey.append("circle")
        .attr("class","keyInnerCircle5")
        .attr("cx",15)
        .attr("cy",120)
        .attr("r",10)
        .attr("fill","rgb(240, 97, 24)")
        .attr("stroke-width",2)
        ;

        innerCircleKey.append("text")
        .attr("class","catColLabel1")
        .text("black")
        .attr("x",30)
        .attr("y",25)
        ;

        innerCircleKey.append("text")
        .attr("class","catColLabel2")
        .text("white")
        .attr("x",30)
        .attr("y",50)
        ;
        innerCircleKey.append("text")
        .attr("class","catColLabel3")
        .text("grey")
        .attr("x",30)
        .attr("y",75)
        ;

        innerCircleKey.append("text")
        .attr("class","catColLabel4")
        .text("orange")
        .attr("x",30)
        .attr("y",100)
        ;
        innerCircleKey.append("text")
        .attr("class","catColLabel4")
        .text("multi")
        .attr("x",30)
        .attr("y",125)
        ;
        
    let smallCircleKey = viz.append("g")

    smallCircleKey.attr("transform","translate(550,550)")
    .style("font-family","Roboto")
    .style("font-size",18);

    smallCircleKey.append("text")
    .attr("class","smallCircleKeyTitle")
    .text("3. my activity")
    ;
    smallCircleKey.append("circle")
    .attr("class","smallCircleerCircle1")
    .attr("cx",15)
    .attr("cy",20)
    .attr("r",10)
    .attr("fill","rgb(38, 1, 117)")
    .attr("stroke-width",2)
    ;
    smallCircleKey.append("circle")
    .attr("class","smallCircleerCircle2")
    .attr("cx",15)
    .attr("cy",45)
    .attr("r",10)
    .attr("fill","rgb(121,121,121)")
    .attr("stroke-width",2)
    ;
    smallCircleKey.append("circle")
    .attr("class","smallCircleerCircle3")
    .attr("cx",15)
    .attr("cy",70)
    .attr("r",10)
    .attr("fill","rgb(139, 27, 161)")
    .attr("stroke-width",2)
    ;

    smallCircleKey.append("circle")
    .attr("class","smallCircleerCircle4")
    .attr("cx",15)
    .attr("cy",95)
    .attr("r",10)
    .attr("fill","rgb( 166, 128, 83)")
    .attr("stroke-width",2)
    ;


    smallCircleKey.append("text")
    .attr("class","smallCircleLabel1")
    .text("going out")
    .attr("x",30)
    .attr("y",25)
    ;

    smallCircleKey.append("text")
    .attr("class","smallCircleLabel2")
    .text("going home")
    .attr("x",30)
    .attr("y",50)
    .style("font-family","Roboto")
    .style("font-size",18)
    ;
    smallCircleKey.append("text")
    .attr("class","smallCircleLabel3")
    .text("at a store")
    .attr("x",30)
    .attr("y",75)
    .style("font-family","Roboto")
    .style("font-size",18)
    ;

    smallCircleKey.append("text")
    .attr("class","smallCircleLabel4")
    .text("at home")
    .attr("x",30)
    .attr("y",100)
    .style("font-family","Roboto")
    .style("font-size",18)
    ;
 
    
    let catPosKey = viz.append("g");

    catPosKey.attr("transform","translate(700,550)")
        .style("font-family","Roboto")
        .style("font-size",18)
       
        ;

    catPosKey.append("text")
    .attr("class","timeDaylabel1")
    .text("4. cat's position")
    .attr("x",0)
    .attr("y",0)
    .style("font-family","Roboto")
    .style("font-size",18)
    ;

    catPosKey.append("line")
    .attr("x1",5)
    .attr("y1",20)
    .attr("x2",35)
    .attr("y2",20)
    .attr("stroke","black")
    .style("stroke-dasharray",(8,8))
    .attr("stroke-width",2)
    ;
    
    catPosKey.append("line")
    .attr("x1",5)
    .attr("y1",45)
    .attr("x2",35)
    .attr("y2",45)
    .attr("stroke","black")
    .style("stroke-dasharray",(8,5))
    .attr("stroke-width",2)
    ;

    catPosKey.append("line")
    .attr("x1",5)
    .attr("y1",70)
    .attr("x2",35)
    .attr("y2",70)
    .attr("stroke","black")
    .style("stroke-dasharray",(3,3))
    .attr("stroke-width",2)
    ;

    catPosKey.append("line")
    .attr("x1",5)
    .attr("y1",95)
    .attr("x2",35)
    .attr("y2",95)
    .attr("stroke","black")
    .attr("stroke-width",2)
    ;

    catPosKey.append("text")
    .attr("class","catPosLabel1")
    .text("above me")
    .attr("x",40)
    .attr("y",25)
    ;

    catPosKey.append("text")
    .attr("class","catPosLabel2")
    .text("below me")
    .attr("x",40)
    .attr("y",50)
    ;
    catPosKey.append("text")
    .attr("class","catPosLabel3")
    .text("eye level")
    .attr("x",40)
    .attr("y",75)
    ;

    catPosKey.append("text")
    .attr("class","catPosLabel4")
    .text("thru zoom")
    .attr("x",40)
    .attr("y",100)
    ;
 
    
    let wydCatKey = viz.append("g");

    wydCatKey.attr("transform","translate(850,550)")
    .style("font-family","Roboto")
    .style("font-size",18)
   
    ;

    wydCatKey.append("text")
        .attr("class","timeDaylabel1")
        .text("5. cat's activity")
        .attr("x",0)
        .attr("y",0)
        .style("font-family","Roboto")
        .style("font-size",18)
        ;


    wydCatKey.append("text")
    .attr("class","wydCatLabel1")
    .text("running")
    .attr("x",45)
    .attr("y",25)
    ;

    wydCatKey.append("text")
    .attr("class","wydCatLabel2")
    .text("sitting")
    .attr("x",45)
    .attr("y",50)
    ;
    wydCatKey.append("text")
    .attr("class","wydCatLabel3")
    .text("walking")
    .attr("x",45)
    .attr("y",75)
    ;

    wydCatKey.append("text")
    .attr("class","wydCatLabel4")
    .text("eating")
    .attr("x",45)
    .attr("y",100)
    ;
    wydCatKey.append("text")
    .attr("class","wydCatLabel5")
    .text("stalking")
    .attr("x",45)
    .attr("y",125)
    ;

    wydCatKey.append("circle")
    .attr("class","wydCatKey1")
    .attr("cx",35)
    .attr("cy",20)
    .attr("r",4)
    .attr("stroke","black")
    .attr("fill","none")
    .attr("stroke-width",2)
    ;

    wydCatKey.append("path")
    .attr("class","wydCatKey1")
    .attr("d",d3.arc()
            .outerRadius(10)
            .innerRadius(10)
            .startAngle(-Math.PI/6)
            .endAngle(-2*Math.PI/3)
        )
        .attr("transform","translate(35,20)")
        .attr("fill","none")
        .attr("stroke","black")
        .attr("stroke-width",2)
        ;

        wydCatKey.append("circle")
        .attr("class","wydCatKey2")
        .attr("cx",30)
        .attr("cy",43)
        .attr("r",4)
        .attr("stroke","black")
        .attr("stroke-width",2)
        .attr("fill","none")
        ;
    
        wydCatKey.append("path")
        .attr("class","wydCatKey2")
        .attr("d",d3.arc()
                .outerRadius(10)
                .innerRadius(10)
                .startAngle(Math.PI)
                .endAngle(4*Math.PI/3)
            )
            .attr("transform","translate(30,43)")
            .attr("fill","none")
            .attr("stroke","black")
            .attr("stroke-width",2)
            ;

        
            wydCatKey.append("circle")
            .attr("class","wydCatKey3")
            .attr("cx",35)
            .attr("cy",70)
            .attr("r",4)
            .attr("stroke","black")
            .attr("stroke-width",2)
            .attr("fill","none")
            ;
            wydCatKey.append("path")
            .attr("class","wydCatKey3")
            .attr("d",d3.arc()
                    .outerRadius(10)
                    .innerRadius(10)
                    .startAngle(-2*Math.PI/7)
                    .endAngle(-2*Math.PI/3)
                )
                .attr("transform","translate(35,70)")
                .attr("fill","none")
                .attr("stroke","black")
                .attr("stroke-width",2)
                ;

         wydCatKey.append("circle")
                .attr("class","wydCatKey4")
                .attr("cx",33)
                .attr("cy",100)
                .attr("r",4)
                .attr("stroke","black")
                .attr("stroke-width",2)
                .attr("fill","none")
                ;
                wydCatKey.append("path")
                .attr("class","wydCatKey4")
                .attr("d",d3.arc()
                        .outerRadius(10)
                        .innerRadius(10)
                        .startAngle(0)
                        .endAngle(Math.PI/3)
                    )
                    .attr("transform","translate(33,100)")
                    .attr("fill","none")
                    .attr("stroke","black")
                    .attr("stroke-width",2)
                    ;

            wydCatKey.append("circle")
                    .attr("class","wydCatKey5")
                    .attr("cx",25)
                    .attr("cy",123)
                    .attr("r",4)
                    .attr("stroke","black")
                    .attr("stroke-width",2)
                    .attr("fill","none")
                    ;
                    wydCatKey.append("path")
                    .attr("class","wydCatKey4")
                    .attr("d",d3.arc()
                            .outerRadius(10)
                            .innerRadius(10)
                            .startAngle(0)
                            .endAngle(Math.PI/3)
                        )
                        .attr("transform","translate(25,123)")
                        .attr("fill","none")
                        .attr("stroke","black")
                        .attr("stroke-width",2)
                        ;


  




function gotData(newData){
  

    let dataCells = viz.selectAll(".dataCell").data(newData).enter()
        .append("g")
        .attr("class", "dataCell")
        .attr("transform", cellsTranslate)
        .attr("stroke-width",3)
    ;


   
     dataCells.append("circle")
        // .attr("cx",catPosX)
        // .attr("cy",catPosY)
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",timeDaySize/1.9)
        .attr("class","catBodyCircle1")
        .attr("fill","none")
        .attr("stroke",catColor)
        //.style("fill","url(#myGradient)")
        .attr("opacity","1")
        .style("stroke-dasharray",(catPosDash))
        
        ;
        
        
//cat head

let catHeadGroup = viz.selectAll(".catHead").data(newData).enter()
    .append("g")
    .attr("class", "catHead")
   // .attr("transform",whatCatDoingRotate)
   .attr("transform","rotate(90)")
    .attr("transform", cellsTranslate)
    
   
   
;


    catHeadGroup.append("circle")
        .attr("cx",0)
        .attr("cy",-29)
        .attr("r",17)
        .attr("class","whatIwasDoing") 
        .attr("fill","none")
        .attr("stroke",whatIwasDoing)
        .attr("stroke-width",1.5)
        .attr("transform",whatCatDoingHeadRotate)
        ;


        dataCells.append("circle")
        .attr("class", "whatCatDoing")
        .attr("cx",0)
       // .attr("cy",timeDaySize/5)
          .attr("cy",0)
       
        .attr("r",timeDaySize/1.5)
        .attr("fill","none")
        .attr("stroke",timeDayFill)
        .attr("stroke-width",2)
        .attr("transform",whatCatDoingTailRotate)
        

        ;
 

    dataCells.append("text")
        .text(dateText)
        .attr("x",(-timeDaySize/2)+10)
        .attr("y",20+timeDaySize)
        .attr("font-family","Roboto")
        .attr("fill","black")
        ;
///////////// tail arc ////////

    dataCells.append("path")
        .attr("d",d3.arc()
            .outerRadius(timeDaySize-5)
            .innerRadius(timeDaySize-5)
            .startAngle(catPosRotateStart)
            .endAngle(catPosRotateEnd)
        )
        .attr("fill","none")
        .attr("stroke",timeDayFill)
        .attr("transform",whatCatDoingTailRotate)
        
       
    ;


    
   
          
  
   
}





///arc function, help from stack overflow d3 reference



//positioning functions

function cellsTranslate(d,i){
   
    let cellSize = timeDaySize;

    let rowsLength = 7;
    let colsLength = 7;
    let cols = Math.floor(i/colsLength); // divide to place into rows, floor to get rid of decimals
    let rows = i % rowsLength; // using remainder to detect when to switch to next column. 
                                 // use remainder instead of division to loop through 0-5
   

    // let x =  1475 + cellSize * rows * 2.5;
    // let y =  100+ cellSize * cols * 3;
    
    let x =  1475 + cellSize * rows * 2.5;
    let y =  100+ cellSize * cols * 3;
    
   
   return "translate(" + x + "," + y + ")";
}


function randomX(){
    return Math.random()*svgWidth;
}

function randomY(){
    return Math.random()*svgHeight;
}


//cat ears translate

function earTranslateLeft(){
    let x = (-timeDaySize/2)+5
    let y = -timeDaySize-10
    return  "translate(" + x + "," + y + ")";
}
function earTranslateRight(){
    let x = -5+timeDaySize/2
    let y = -timeDaySize-10
    return  "translate(" + x + "," + y + ")";
}




////style functions



function timeDayFill(d){
    let timeDayVar = d.timeOfDay;
    // let timeDayVar = catData.select(timeOfDay);
 //  console.log(timeDayVar);
    if(timeDayVar == "morning"){
        return "rgb( 166, 3, 3)";
    }else if(timeDayVar == "afternoon"){
        return "rgb(2, 62, 115)";
    }else if(timeDayVar == "evening"){
        return "rgb(89, 2, 2)";
    }else if(timeDayVar == "late night"){
        return "rgb(6, 115, 84)";
    }
}

function whatIwasDoing(d){
    let wyd = d.whatIWasDoing;
    if(wyd == "going out"){
        return "rgb(38, 1, 117)";
    }else if(wyd == "going home"){
        return "rgb(121,121,121)";
    }else if(wyd == "at a store"){
        return "rgb(139, 27, 161)";
    }else if(wyd == "at home"){
        return "rgb( 166, 128, 83)";
    }
}

function catColor(d){
    let catColor = d.catColor;
    //console.log(catColor)
    
    if(catColor == "black"){
        return "rgb(0, 21, 60)";
    }else if(catColor == "white"){
        return "rgb(132, 192, 214)" 
    }else if(catColor == "grey"){
        return "rgb(158, 153, 240)"
    }else if(catColor == "multi"){
        //return "url(#myGradient)";
        return "rgb(240, 97, 24)";
    }else if(catColor == "orange"){
        return "rgb(255, 176, 0)";
    }


   
}



function catPosDash(d){
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
        
        return "8,5";
    }else if(catPosition == "eye level"){
        return "3,3";
    }else if(catPosition == "above me"){
        return "8,8";
    }else if(catPosition == "through zoom"){
        return "1,1";
    }
}

function catPosRadius(d){
    let catPosition = d.catsPositionInRelationToMe;
    if( catPosition == "below me"){
        
        return timeDaySize/2.5;
    }else if(catPosition == "eye level"){
        return timeDaySize/3;
    }else if(catPosition == "above me"){
        return timeDaySize/4;
    }else if(catPosition == "through zoom"){
        return timeDaySize/2;
    }
}

function dateText(d){
    let textDate = d.date;
    console.log(textDate)
    return textDate[6]+ "."+ textDate[8]+textDate[9];
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
    return Math.PI/2.5;
}


