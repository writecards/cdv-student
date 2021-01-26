var numSpaces = document.getElementById("numBoxVal");

var i;
for(i = 0; i < numSpaces; i++){
    
}

function generate(){
var node = document.createElement("p");
var textnode = document.createTextNode("hey there");
node.appendChild(textnode);

document.getElementById("bodyDiv").appendChild(node);
}



// document.getElementById("genBtn").addEventListener("click", function
//  drawSquares(){
//     document.getElementById("bodyDiv").innerHTML = "hey there";
// });
