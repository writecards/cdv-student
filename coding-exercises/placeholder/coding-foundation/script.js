function generate(){
    var numSpaces = document.getElementById("numBoxVal").value;
    var i;
        for(i = 0; i < numSpaces; i++){ 
            var node = document.createElement("p"); //makes a p element for the emoji
            var textnode = document.createTextNode("🙃"); //specifies the text in the node, in this case an emoji
            node.appendChild(textnode); //append textnode to the element which is called node
   
            document.getElementById("emojiP").appendChild(node);
        
    }
}



