var request = new XMLHttpRequest();
request.open("GET", "./resources/js/config.json", false);
request.send(null);
var config = JSON.parse(request.responseText);

let elementId = config.General[0].elementId,
  minAcceleration = config.General[1].minAcceleration,
  baseAcceleration = config.General[2].baseAcceleration,
  maxAcceleration = config.General[3].maxAcceleration,
  showWatermark = config.General[4].showWatermark,
  randomColorList = config.General[5].randomColorList,
  enableNodes = config.Nodes[0].enableNodes,
  nNodes = config.Nodes[1].nNodes,
  nodeColor = config.Nodes[2].nodeColor,
  nodeAlpha = config.Nodes[3].nodeAlpha,
  minRad = config.Nodes[4].minRad,
  maxRad = config.Nodes[5].maxRad,
  randomColorNodesMode = config.Nodes[6].randomColorNodesMode,
  randomColorNodesIterations = config.Nodes[7].randomColorNodesIterations + 1,
  pulsatingNodeSize = config.Nodes[8].pulsatingNodeSize,
  minPulseSize = config.Nodes[9].minPulseSize,
  maxPulseSize = config.Nodes[10].maxPulseSize,
  psychoCrystalMode = config.Nodes[11].psychoCrystalMode,
  enableDrawer = config.Drawer[0].enableDrawer,
  useExperimentalLineDrawer = config.Drawer[1].useExperimentalLineDrawer,
  polygonDrawer = config.Drawer[2].polygonDrawer,
  nodeLineDist = config.Drawer[3].nodeLineDist,
  lineWidth = config.Drawer[4].lineWidth,
  opacityDivisionFactor = config.Drawer[5].opacityDivisionFactor,
  lineColor = config.Drawer[6].lineColor,
  randomColorLinesMode = config.Drawer[7].randomColorLinesMode,
  randomColorLinesIterations = config.Drawer[8].randomColorLinesIterations,
  randomCountLines = config.Drawer[8].randomColorLinesIterations + 1,
  prevColorNodes,
  prevColorLines,
  randomCountNodes = 0,
  distX,
  distY,
  min = 0,
  nodeCount = 1,
  maxY = window.innerHeight,
  maxX = window.innerWidth;

let nodeList = [];

const canvas = document.getElementById(elementId);
const ctx = canvas.getContext("2d");

Begin();
Renderer();
//Functions
async function RandomMode(params) {
  ctx.lineWidth = lineWidth;
  if (randomColorLinesMode) {
    randomCountLines++;
    if (randomCountLines > randomColorLinesIterations) {
      prevColorLines =
        randomColorList[
          Math.floor(Math.random() * (randomColorList.length + 1))
        ];
      ctx.strokeStyle = prevColorLines;
      randomCountLines = 0;
    }
    ctx.strokeStyle = prevColorLines;
  } else {
    ctx.strokeStyle = lineColor;
  }

  if (randomColorNodesMode && !randomColorNodesEachNodeMode) {
    randomCountNodes++;
    if (randomCountNodes > randomColorNodesIterations) {
      prevColorNodes =
        randomColorList[
          Math.floor(Math.random() * (randomColorList.length + 1))
        ];
      randomCountNodes = 0;
    }
    ctx.fillStyle = prevColorNodes;
  } else {
    ctx.fillStyle = nodeColor;
  }
}

async function PulseNodes(i) {
  if (pulsatingNodeSize) {
    if (nodeList[i].radius >= maxPulseSize) {
      nodeList[i].pulsating = !nodeList[i].pulsating;
    }
    if (nodeList[i].radius <= minPulseSize) {
      nodeList[i].pulsating = !nodeList[i].pulsating;
    }
    if (nodeList[i].pulsating) {
      nodeList[i].radius++;
    } else {
      nodeList[i].radius--;
    }
  }
}

async function Watermark() {
  if (showWatermark) {
    ctx.font = "24px arial";
    ctx.strokeStyle = "red";
    ctx.strokeText("By R3Dki", 0, maxY - 10, 100);
    ctx.fillStyle = "red";
    ctx.fillText("By R3Dki", 0, maxY - 10, 100);
  }
}

function Node() {
  this.x = Math.floor(Math.random() * (maxX - min + 1) + min);
  this.y = Math.floor(Math.random() * (maxY - min + 1) + min);
  this.accelerationX = Math.floor(
    Math.random() * (maxAcceleration - minAcceleration + 1) + minAcceleration
  );
  this.accelerationY = Math.floor(
    Math.random() * (maxAcceleration - minAcceleration + 1) + minAcceleration
  );
  if (
    this.accelerationX < baseAcceleration &&
    this.accelerationX > -baseAcceleration
  ) {
    this.accelerationX = baseAcceleration;
  }
  if (
    this.accelerationY < baseAcceleration &&
    this.accelerationY > -baseAcceleration
  ) {
    this.accelerationY = baseAcceleration;
  }
  this.radius = minRad;
  if (minRad != maxRad) {
    this.radius = Math.floor(Math.random() * (maxRad - minRad + 1) + minRad);
  }
  if (pulsatingNodeSize) {
    this.radius = minPulseSize + 1;
    this.pulsating = true;
  }
}

function Begin() {
  //Vars Check
  minPulseSize = Math.abs(minPulseSize);
  maxPulseSize = Math.abs(maxPulseSize);
  while (nNodes != nodeList.length) {
    nodeList.push(new Node());
    nodeCount = nodeList.length;
  }
}

async function DrawerAsyncExperimental(i) {
  if (useExperimentalLineDrawer && !polygonDrawer) {
    for (let j = i; j < nodeCount; j++) {
      distance = Math.sqrt(
        Math.pow(nodeList[j].x - nodeList[i].x, 2) +
          Math.pow(nodeList[j].y - nodeList[i].y, 2)
      );
      if (Math.abs(distance) <= nodeLineDist) {
        ctx.moveTo(nodeList[i].x, nodeList[i].y);
        ctx.lineTo(nodeList[j].x, nodeList[j].y);
        ctx.globalAlpha = opacityDivisionFactor / distance;
        ctx.stroke();
      }
    }
  } else if (!polygonDrawer) {
    for (let j = i; j < nodeCount; j++) {
      distX = nodeList[j].x - nodeList[i].x;
      distY = nodeList[j].y - nodeList[i].y;
      if (Math.abs(distX) <= nodeLineDist && Math.abs(distY) <= nodeLineDist) {
        ctx.moveTo(nodeList[j].x, nodeList[j].y);
        ctx.lineTo(nodeList[i].x, nodeList[i].y);
        ctx.globalAlpha =
          opacityDivisionFactor / (Math.abs(distX) + Math.abs(distY));
          ctx.stroke();
      }
    }
  } else {
    for (let j = i; j < nodeCount; j++) {
      distance = Math.sqrt(
        Math.pow(nodeList[j].x - nodeList[i].x, 2) +
          Math.pow(nodeList[j].y - nodeList[i].y, 2)
      );
      ctx.globalAlpha = 1;
      if (Math.abs(distance) <= nodeLineDist) {
        ctx.lineTo(nodeList[j].x, nodeList[j].y);
      }
    }
  }
}

async function NodeDrawAsync(i) {
  if (enableNodes) {
    ctx.globalAlpha = nodeAlpha;
    ctx.moveTo(nodeList[i].x, nodeList[i].y);
    ctx.arc(nodeList[i].x, nodeList[i].y, nodeList[i].radius, 0, 6.28318531);
  }
}
//Experimental

function Renderer() {
  let maxY = window.innerHeight;
  let maxX = window.innerWidth;
  ctx.canvas.width = maxX;
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
    if (enableDrawer) {
      DrawerAsyncExperimental(i);
    }
    //Draw Circles were nodes are
    PulseNodes(i);
    NodeDrawAsync(i);
    if (psychoCrystalMode) {
      ctx.fillStyle = randomColorList[Math.floor(Math.random() * (randomColorList.length + 1))];
    }
    ctx.fill();
  }
  requestAnimationFrame(Renderer);
}
