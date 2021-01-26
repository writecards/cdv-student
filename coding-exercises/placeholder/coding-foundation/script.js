function generate(){
    var numSpaces = document.getElementById("numBoxVal").value;
    var i;
        for(i = 0; i < numSpaces; i++){

            var node = document.createElement("p");
            var textnode = document.createTextNode("hey there");
            node.appendChild(textnode);
            document.getElementById("bodyDiv").appendChild(node);       
}
}



