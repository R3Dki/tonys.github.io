//Config
const elementId = 'background';
const nNodes = 40;
const minAcceleration = -1.8;
const baseAcceleration = 1.0;
const maxAcceleration = 1.6;
//Graphic Customization
let nodeLineDist = 40;
const lineWidth = 1;
const lineColor = 'green';
const nodeRadius = 6;
const nodeColor = '#BF0000';
const nodeAlpha = 1;
const opacityDivisionFactor = 500;



//Code
const canvas = document.getElementById(elementId);
const ctx = canvas.getContext('2d');
let nodeList = [];
let distX, distY, min = 0;
let nodeCount = 0;
nodeLineDist *= 10;
ctx.strokeStyle = lineColor;
ctx.fillStyle = nodeColor;
ctx.lineWidth = lineWidth;

Begin();
Renderer();

//Functions
function Node() {
    this.x = Math.floor(Math.random() * (maxX - min + 1) + min);
    this.y = Math.floor(Math.random() * (maxY - min + 1) + min);
    this.accelerationX = Math.floor(Math.random() * (maxAcceleration - minAcceleration + 1) + minAcceleration);
    this.accelerationY = Math.floor(Math.random() * (maxAcceleration - minAcceleration + 1) + minAcceleration);
    if (this.accelerationX < baseAcceleration && this.accelerationX > -baseAcceleration) {this.accelerationX = baseAcceleration}
    if (this.accelerationY < baseAcceleration && this.accelerationY > -baseAcceleration) {this.accelerationY = baseAcceleration}
}

function Begin() {
    maxY = document.getElementById(elementId).getAttribute('height');
    maxX = document.getElementById(elementId).getAttribute('width');
    while (nNodes != nodeList.length) {
        nodeList.push(new Node());
        nodeCount = nodeList.length;
    }
}

function Renderer() {
    setTimeout(ctx.clearRect(0, 0, maxX, maxY), 1);
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
        //Draw Circles were nodes are
        ctx.globalAlpha=nodeAlpha;
        ctx.moveTo(nodeList[i].x, nodeList[i].y);
        ctx.arc(nodeList[i].x, nodeList[i].y, nodeRadius, 0, 6.28318531);
        ctx.fill();
    }
    requestAnimationFrame(Renderer);
}