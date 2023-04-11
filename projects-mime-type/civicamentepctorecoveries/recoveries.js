document.title = "CivicaMente Recoveries by R3Dki";
    document.getElementById("d1-a").checked = true;
    next('1');
    document.getElementById("d1-a").checked = false;
    document.getElementById('d1').style.display = 'block';
    document.getElementById('d2').style.display = 'none';
    let shown = true, mouseDown = false;
    document.getElementById("menuOptions").hidden = shown;
    document.getElementById("selectedQuestionMod").value = 1;
document.getElementById("shownQuestionMod").value = 1;
document.getElementById("hiddenQuestionMod").value = 1;
    let mouse_position = {x: 0, y: 0};

window.addEventListener('mousemove', (mouse_event) => {
mouse_position.x = mouse_event.clientX;
mouse_position.y = mouse_event.clientY;
});

document.getElementsByTagName('cmmod')[0].onmousedown = function() {
mouseDown = true;
}
document.getElementsByTagName('html')[0].onmouseup = function() {
mouseDown = false;
}

function drag() {
if (mouseDown) {
document.getElementsByTagName("cmmod")[0].style.top = mouse_position.y-50 + "px";
document.getElementsByTagName("cmmod")[0].style.left = mouse_position.x-50 + "px";
}
}

function random(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}
    function hidemenu(){
        shown = !shown;
        document.getElementById("menuOptions").hidden = shown;
    }
function getValue(v) {
switch (v) {
    case 1:
        return document.getElementById('selectedQuestionMod').value;
        break;
    case 2:
        return document.getElementById('shownQuestionMod').value;
        break;
    case 3:
        return document.getElementById('hiddenQuestionMod').value;
        break;
    case 4:
        return document.getElementById('scoreSetMod').value;
}
}

 function hide(n) {
     if (
            n < 1 || n > nmax) {
            document.getElementById('hiddenQuestionMod').value = 1;
            return;
        }
 document.getElementById('d'+n).style.display = 'none';
 }
function show(n) {
    if (
            n < 1 || n > nmax) {
            document.getElementById('shownQuestionMod').value = 1;
            return;
        }
 document.getElementById('d'+n).style.display = 'block';
 }
    function goto(n) {
        if (
            n < 1 || n > nmax) {
            document.getElementById('hiddenQuestionMod').value = 1;
            return;
        }
        for(i=1; i<=nmax; i++){
                    hide(i);
        }
        show(n);
    }

    function complete(score) {
        tot_test = score;
        document.getElementById("d"+ nmax +"-a").checked = true;
        next(nmax);
    }

function showAll() {
    for(i=1; i<=nmax; i++){
                    show(i);
        }
}

function hideAll() {
for(i=1; i<=nmax; i++){
                    hide(i);
        }
}

function uncheckAllAnswers(){
    for(i=1; i<=nmax; i++){
        document.getElementById("d"+i+"-a").checked = false;
        document.getElementById("d"+i+"-b").checked = false;
        document.getElementById("d"+i+"-c").checked = false;
        document.getElementById("d"+i+"-d").checked = false;
        }
}

function checkAllAnswers(){
    for(i=1; i<=nmax; i++){
        document.getElementById("d"+i+"-a").checked = true;
        document.getElementById("d"+i+"-b").checked = true;
        document.getElementById("d"+i+"-c").checked = true;
        document.getElementById("d"+i+"-d").checked = true;
        }
}

function resetTest() {
    uncheckAllAnswers();
    tot_test = 0;
    goto(1);
}

function setScore(score){
tot_test = score;
}

function resetScore(){
    tot_test = 0;
}

function updateScore(){
    document.getElementById('scoreindicator').innerHTML = 'Current Score: ' + tot_test;
}

document.body.onmousemove = function() {
    updateScore();
}
