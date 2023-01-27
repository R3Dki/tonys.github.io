//Config
const elementId = 'background'; //ID of your Canvas Element
const nNodes = Math.floor(window.innerHeight/240)*10; //Number of Nodes to create, in this case i create 10 nodes every 240px of resolution.
const minAcceleration = -1.8; //Max Negative Acceleration
const baseAcceleration = 1.0; //Min Acceleration(+/-)
const maxAcceleration = 1.6; //Max Positive Acceleration
//Graphic Customization
const showWatermark = true;
let nodeLineDist = 30; //Distance between Nodes to Draw a Line
const lineWidth = 1; //Width of Lines that connect nodes (laggy if over 1 for some particular reason)
const lineColor = 'green'; //Color of the Lines
const nodeColor = '#BF0000'; //Color of the Nodes (Circles)
const nodeAlpha = 1; //Opacity of the Nodes
const opacityDivisionFactor = 500; //It is used to modify the opacity based on node distance
const minRad = 3 //Min Random Radius of Nodes, also if you want the same node radius just set both minRad and maxRad to the same value
const maxRad = 7 //Max Random Radius of Nodes
const randomColorList = ['red', 'blue', 'green', 'yellow', 'cyan', 'purple', 'pink', 'white', 'lime', 'aqua', 'silver', 'gray', 'brown'];
// /\ The list of colors that the Random Color functions can use, you may add or remove some colors /\
const randomColorLinesMode = false; //Select wheter Lines have Random Color or not
const randomColorLinesIterations = 200; //After how many Iterations should the Color change
const randomColorNodesMode = true; //Select wheter Nodes have Random Color or not
const randomColorNodesIterations = 200; //After how many Iterations should the Color change

//Code
let prevColorLines;
let randomCountLines = randomColorLinesIterations+1;
let prevColorNodes;
let randomCountNodes = randomColorNodesIterations+1;
const canvas = document.getElementById(elementId);
const ctx = canvas.getContext('2d');
ctx.lineWidth = lineWidth;
let nodeList = [];
let distX, distY, min = 0;
let nodeCount = 0;
nodeLineDist *= 10;
let maxY = window.innerHeight;
let maxX = window.innerWidth;
Begin();
Renderer();

//Functions
async function RandomMode(params) {
    if (randomColorLinesMode) {  
        randomCountLines++;
        if (randomCountLines > randomColorLinesIterations) {
            prevColorLines = randomColorList[Math.floor(Math.random() * (randomColorList.length + 1))];
            ctx.strokeStyle = prevColorLines;
            randomCountLines=0;
        }
        ctx.strokeStyle =  prevColorLines;
    } else {ctx.strokeStyle =  lineColor}

    if (randomColorNodesMode) {  
        randomCountNodes++;
        if (randomCountNodes > randomColorNodesIterations) {
            prevColorNodes = randomColorList[Math.floor(Math.random() * (randomColorList.length + 1))];
            ctx.fillStyle = prevColorNodes;
            randomCountNodes=0;
        }
        ctx.fillStyle =  prevColorNodes;
    } else {ctx.fillStyle =  nodeColor}
}

async function Watermark() {
    if (showWatermark) {
        ctx.font = "24px arial";
        ctx.strokeStyle = 'red';
        ctx.strokeText("By R3Dki", 0, maxY-10, 100);
        ctx.fillStyle = 'red';
        ctx.fillText("By R3Dki", 0, maxY-10, 100);
    }
}

function Node() {
    this.x = Math.floor(Math.random() * (maxX - min + 1) + min);
    this.y = Math.floor(Math.random() * (maxY - min + 1) + min);
    this.accelerationX = Math.floor(Math.random() * (maxAcceleration - minAcceleration + 1) + minAcceleration);
    this.accelerationY = Math.floor(Math.random() * (maxAcceleration - minAcceleration + 1) + minAcceleration);
    if (this.accelerationX < baseAcceleration && this.accelerationX > -baseAcceleration) {this.accelerationX = baseAcceleration}
    if (this.accelerationY < baseAcceleration && this.accelerationY > -baseAcceleration) {this.accelerationY = baseAcceleration}
    this.radius = Math.floor(Math.random() * (maxRad - minRad + 1) + minRad);
    this.radius = minRad;
    if (minRad != maxRad) {
        this.radius = Math.floor(Math.random() * (maxRad - minRad + 1) + minRad);
    }
}

function Begin() {
    while (nNodes != nodeList.length) {
        nodeList.push(new Node());
        nodeCount = nodeList.length;
    }
}

//Experimental
async function LineDrawAsync(i) {
    for (let i2 = i; i2 < nodeCount; i2++) {
        distX = nodeList[i2].x-nodeList[i].x;
        distY = nodeList[i2].y-nodeList[i].y;
        if ((distX < nodeLineDist && distY < nodeLineDist && distX > -nodeLineDist && distY > -nodeLineDist)) {
            ctx.moveTo(nodeList[i2].x, nodeList[i2].y);
            ctx.lineTo(nodeList[i].x, nodeList[i].y);
            ctx.globalAlpha = (distX+distY)/opacityDivisionFactor;
            ctx.stroke();
        }
    }
}

async function NodeDrawAsync(i) {
    ctx.globalAlpha=nodeAlpha;
        ctx.moveTo(nodeList[i].x, nodeList[i].y);
        ctx.arc(nodeList[i].x, nodeList[i].y, nodeList[i].radius, 0, 6.28318531);
        ctx.fill();
}
//Experimental

function Renderer() {
    let maxY = window.innerHeight;
    let maxX = window.innerWidth;
    ctx.canvas.width  = maxX;
    ctx.canvas.height = maxY;
    setTimeout(ctx.clearRect(0, 0, maxX, maxY), 1);
    Watermark();
    RandomMode();
    for (let i = 0; i < nodeCount; i++) {
        if (nodeList[i].x > maxX || nodeList[i].x < 0) {
            nodeList[i].accelerationX = -nodeList[i].accelerationX;
        }
        if (nodeList[i].y > maxY || nodeList[i].y < 0) {
            nodeList[i].accelerationY = -nodeList[i].accelerationY;
        }
        nodeList[i].x += nodeList[i].accelerationX;
        nodeList[i].y += nodeList[i].accelerationY;
        //Draw Lines between nearing Nodes
        ctx.beginPath();
        LineDrawAsync(i);
        //Draw Circles were nodes are
        NodeDrawAsync(i);
    }
    requestAnimationFrame(Renderer);
}
