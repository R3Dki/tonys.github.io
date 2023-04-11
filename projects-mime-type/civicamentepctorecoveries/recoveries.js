document.title = "CivicaMente Recoveries by R3Dki";
    document.getElementById("d1-a").checked = true;
    next('1');
    document.getElementById("d1-a").checked = false;
    document.getElementById('d1').style.display = 'block';
    document.getElementById('d2').style.display = 'none';
    let shown = true, mouseDown = false;
    document.getElementById("menuOptions").hidden = shown;
    document.getElementById("selectedQuestionMod").value = 1;
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
 function hide(n) {
 document.getElementById('d'+n).style.display = 'none';
 }
function show(n) {
 document.getElementById('d'+n).style.display = 'block';
 }
    function goto(n) {
        if (
            n < 1 || n > nmax) {
            n = 1;
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