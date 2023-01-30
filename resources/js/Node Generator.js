var request = new XMLHttpRequest();
request.open("GET", "./resources/js/config.json", false);
request.send(null)
var config = JSON.parse(request.responseText);

let prevColorLines, randomCountLines = config.Drawer[8].randomColorLinesIterations+1;
let prevColorNodes, randomCountNodes = config.Nodes[7].randomColorNodesIterations+1;
let distX, distY, min = 0, nodeCount = 1, maxY = window.innerHeight, maxX = window.innerWidth;
let nodeList = [];
const canvas = document.getElementById(config.General[0].elementId);
const ctx = canvas.getContext('2d');
Begin();
Renderer();

//Functions
async function RandomMode(params) {
    ctx.lineWidth = config.Drawer[4].lineWidth;
    if (config.Drawer[7].randomColorLinesMode) {  
        randomCountLines++;
        if (randomCountLines > config.Drawer[8].randomColorLinesIterations) {
            prevColorLines = config.General[5].randomColorList[Math.floor(Math.random() * (config.General[5].randomColorList.length + 1))];
            ctx.strokeStyle = prevColorLines;
            randomCountLines=0;
        }
        ctx.strokeStyle =  prevColorLines;
    } else {ctx.strokeStyle =  config.Drawer[6].lineColor}
    
    if (config.Nodes[6].randomColorNodesMode) {  
        randomCountNodes++;
        if (randomCountNodes > config.Nodes[7].randomColorNodesIterations) {
            prevColorNodes = config.General[5].randomColorList[Math.floor(Math.random() * (config.General[5].randomColorList.length + 1))];
            ctx.fillStyle = prevColorNodes;
            randomCountNodes=0;
        }
        ctx.fillStyle =  prevColorNodes;
    } else {ctx.fillStyle =  config.Nodes[2].nodeColor}
}

async function PulseNodes(i) {
    if (config.Nodes[8].pulsatingNodeSize) {   
        if (nodeList[i].radius >= config.Nodes[10].maxPulseSize) {
            nodeList[i].pulsating = !nodeList[i].pulsating;
        }
        if (nodeList[i].radius <= config.Nodes[9].minPulseSize) {
            nodeList[i].pulsating = !nodeList[i].pulsating;
        }
        if(nodeList[i].pulsating) {nodeList[i].radius++;}
        else
        {nodeList[i].radius--;}
    }
}

async function Watermark() {
    if (config.General[4].showWatermark) {
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
    this.accelerationX = Math.floor(Math.random() * (config.General[3].maxAcceleration - config.General[1].minAcceleration + 1) + config.General[1].minAcceleration);
    this.accelerationY = Math.floor(Math.random() * (config.General[3].maxAcceleration - config.General[1].minAcceleration + 1) + config.General[1].minAcceleration);
    if (this.accelerationX < config.General[2].baseAcceleration && this.accelerationX > -config.General[2].baseAcceleration) {this.accelerationX = config.General[2].baseAcceleration}
    if (this.accelerationY < config.General[2].baseAcceleration && this.accelerationY > -config.General[2].baseAcceleration) {this.accelerationY = config.General[2].baseAcceleration}
    this.radius = config.Nodes[4].minRad;
    if (config.Nodes[4].minRad != config.Nodes[5].maxRad) {
        this.radius = Math.floor(Math.random() * (config.Nodes[5].maxRad - config.Nodes[4].minRad + 1) + config.Nodes[4].minRad);
    }
    if(config.Nodes[8].pulsatingNodeSize){
        this.radius = config.Nodes[9].minPulseSize+1;
        this.pulsating = true;
    }
}

function Begin() {
    //Vars Check
    config.Nodes[9].minPulseSize = Math.abs(config.Nodes[9].minPulseSize);
    config.Nodes[10].maxPulseSize = Math.abs(config.Nodes[10].maxPulseSize);
    while (config.Nodes[1].nNodes != nodeList.length) {
        nodeList.push(new Node());
        nodeCount = nodeList.length;
    }
}

async function DrawerAsyncExperimental(i) {
    if (config.Drawer[1].useExperimentalLineDrawer && !config.Drawer[2].polygonDrawer) {
        for (let j = i; j < nodeCount; j++) {
            distance = Math.sqrt(Math.pow((nodeList[j].x-nodeList[i].x),2)+Math.pow((nodeList[j].y-nodeList[i].y),2));
            if (Math.abs(distance) <= config.Drawer[3].nodeLineDist) {
                ctx.moveTo(nodeList[i].x, nodeList[i].y);
                ctx.lineTo(nodeList[j].x, nodeList[j].y);
                ctx.globalAlpha = config.Drawer[5].opacityDivisionFactor / distance;
                ctx.stroke();
            }
        }
    }else if (!config.Drawer[2].polygonDrawer) {
        for (let j = i; j < nodeCount; j++) {
            distX = nodeList[j].x-nodeList[i].x;
            distY = nodeList[j].y-nodeList[i].y;
            if (Math.abs(distX) <= config.Drawer[3].nodeLineDist && Math.abs(distY) <= config.Drawer[3].nodeLineDist) {
                ctx.moveTo(nodeList[j].x, nodeList[j].y);
                ctx.lineTo(nodeList[i].x, nodeList[i].y);
                ctx.globalAlpha = config.Drawer[5].opacityDivisionFactor/(Math.abs(distX)+Math.abs(distY));
                ctx.stroke();
            }
        }
    }else{
        for (let j = i; j < nodeCount; j++) {
            distance = Math.sqrt(Math.pow((nodeList[j].x-nodeList[i].x),2)+Math.pow((nodeList[j].y-nodeList[i].y),2));
            ctx.globalAlpha = 1;
            if (Math.abs(distance) <= config.Drawer[3].nodeLineDist) {
                ctx.lineTo(nodeList[j].x, nodeList[j].y);
            }
        }
    }
}

async function NodeDrawAsync(i) {
    if (config.Nodes[0].enableNodes) {
        ctx.globalAlpha=config.Nodes[3].nodeAlpha;
        ctx.moveTo(nodeList[i].x, nodeList[i].y);
        ctx.arc(nodeList[i].x, nodeList[i].y, nodeList[i].radius, 0, 6.28318531);
    }
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
        ctx.beginPath();
        nodeList[i].x += nodeList[i].accelerationX;
        nodeList[i].y += nodeList[i].accelerationY;
        //Draw Lines between nearing Nodes
        if (config.Drawer[0].enableDrawer) {
            DrawerAsyncExperimental(i);
        }
        //Draw Circles were nodes are
        PulseNodes(i);
        NodeDrawAsync(i);
        ctx.fill();
    }
    requestAnimationFrame(Renderer);
}
