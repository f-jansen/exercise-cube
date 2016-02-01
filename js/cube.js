Cube = function(){
    
    this.Vector3 = function(x, y, z){
        
        this.x = x;
        this.y = y;
        this.z = z;
        
        this.Set = function(x, y, z){
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
    
    this.Object = function(){
        
        this.nodes = [];
        this.edges = [];
        
        this.PushNodes = function(nodes){
            for(i = 0; i < nodes.length; i++){
                this.nodes.push(nodes[i]);
            }
        }
        
        this.PushEdges = function(edges){
            for(i = 0; i < edges.length; i++){
                this.edges.push(edges[i]);
            }
        }
    }
    
}

var Cube = new Cube();

var myObject = new Cube.Object();
myObject.PushNodes([
    new Cube.Vector3(-100,-100,-100),
    new Cube.Vector3(-100,-100,100),
    new Cube.Vector3(-100,100,-100),
    new Cube.Vector3(-100,100,100),
    new Cube.Vector3(100,-100,-100),
    new Cube.Vector3(100,-100,100),
    new Cube.Vector3(100,100,-100),
    new Cube.Vector3(100,100,100)
]);
myObject.PushEdges([
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
]);


var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
ctx.translate(200,200);

var bgColour = '#ffffff';
var nodeColour = '#ff0000';
var edgeColour = '#000000';
var nodeSize = 4;

console.debug(myObject);

var RotateZ = function(object, angle){
    
    var radians = (Math.PI / 180) * angle;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    
    for (i = 0; i < object.nodes.length; i++){
        
        var node = object.nodes[i];
        var newX = (cos * node.x) - (sin * node.y);
        var newY = (cos * node.y) + (sin * node.x);
        
        node.x = newX;
        node.y = newY;
    }
}

var RotateY = function(object, angle){
    
    var radians = (Math.PI / 180) * angle;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    
    for (i = 0; i < object.nodes.length; i++){
        
        var node = object.nodes[i];
        var newX = (cos * node.x) - (sin * node.z);
        var newZ = (cos * node.z) + (sin * node.x);
        
        node.x = newX;
        node.z = newZ;
    }
}

var RotateX = function(object, angle){
    
    var radians = (Math.PI / 180) * angle;
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    
    for (i = 0; i < object.nodes.length; i++){
        
        var node = object.nodes[i];
        var newY = (cos * node.y) - (sin * node.z);
        var newZ = (cos * node.z) + (sin * node.y);
        
        node.y = newY;
        node.z = newZ;
    }
}


function timer(){
    var timeStart = new Date();
    
    RotateY(myObject, 1);
    RotateZ(myObject, 1);
    RotateX(myObject, 1);
    
    // Clear
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-200,-200,400,400);
    
    for(i = 0; i < myObject.edges.length; i++){

        var a = myObject.nodes[myObject.edges[i][0]];
        var b = myObject.nodes[myObject.edges[i][1]];

        ctx.beginPath();
        ctx.strokeStyle = edgeColour;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
        ctx.closePath();
    }

    for(i = 0; i < myObject.nodes.length; i++){   

        ctx.beginPath();
        ctx.arc(myObject.nodes[i].x,myObject.nodes[i].y, nodeSize,0,2*Math.PI);
        ctx.fillStyle = nodeColour;
        ctx.fill();
        ctx.closePath();
    }
    
    
    
    setTimeout (timer, (1000/30) - (new Date() - timeStart));
}
timer();