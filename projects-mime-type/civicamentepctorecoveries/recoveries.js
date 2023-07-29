document.title = "CivicaMente Recoveries by R3Dki";
    document.getElementById("d1-a").checked = true;
    next('1');
    document.getElementById("d1-a").checked = false;
    document.getElementById('d1').style.display = 'block';
    document.getElementById('d2').style.display = 'none';
    let shown = true, mouseDown = false, nextFunctionOverride = false;
    document.getElementById("menuOptions").hidden = shown;
document.getElementById("scoreSetMod").value = 0;
    document.getElementById("selectedQuestionMod").value = 1;
document.getElementById("shownQuestionMod").value = 1;
document.getElementById("hiddenQuestionMod").value = 1;
    let mouse_position = {x: 0, y: 0};
document.getElementById('overridebutton').innerHTML = "Override Next Function | Status: OFF";
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
    updateScore();
}

function setScore(score){
tot_test = score;
    updateScore();
}

let answers_shown = false, generated_indicators = 0;
function show_answer() {
    answers_shown = !answers_shown;
    if (answers_shown) {
        document.getElementById("show_answer_btn").innerHTML = "Show Answers | Status: ON";
        generated_indicators = 0
        for(i=1; i<=nmax; i++){
            if (document.getElementById("d"+i+"-a").value >= 1) {
                var correct_answer_element = document.createElement("p");
                correct_answer_element.innerHTML = "⮙ Correct Answer";
                correct_answer_element.id = "correct_answer_indicator";
                document.getElementById("d"+i+"-a").parentElement.appendChild(correct_answer_element);
                generated_indicators++;
            };
            if (document.getElementById("d"+i+"-b").value >= 1) {
                var correct_answer_element = document.createElement("p");
                correct_answer_element.innerHTML = "⮙ Correct Answer";
                correct_answer_element.id = "correct_answer_indicator";
                document.getElementById("d"+i+"-b").parentElement.appendChild(correct_answer_element);
                generated_indicators++;
            };
            if (document.getElementById("d"+i+"-c").value >= 1) {
                var correct_answer_element = document.createElement("p");
                correct_answer_element.innerHTML = "⮙ Correct Answer";
                correct_answer_element.id = "correct_answer_indicator";
                document.getElementById("d"+i+"-c").parentElement.appendChild(correct_answer_element);
                generated_indicators++;
            };
            if (document.getElementById("d"+i+"-d").value >= 1) {
                var correct_answer_element = document.createElement("p");
                correct_answer_element.innerHTML = "⮙ Correct Answer";
                correct_answer_element.id = "correct_answer_indicator";
                document.getElementById("d"+i+"-d").parentElement.appendChild(correct_answer_element);
                generated_indicators++;
            };
        }
    } else {
        for (let i = generated_indicators; i > 0; i--) {
            document.getElementById("correct_answer_indicator").remove();
        }
        document.getElementById("show_answer_btn").innerHTML = "Show Answers | Status: OFF";
    }
}

function resetScore(){
    tot_test = 0;
    updateScore();
}

function updateScore(){
    document.getElementById('scoreindicator').innerHTML = 'Current Score: ' + tot_test;
    document.getElementById('scoreSetMod').value = tot_test;
}

function updateNextOverride(){
if (nextFunctionOverride){
    document.getElementById('overridebutton').innerHTML = "Override Next Function | Status: ON";
}else{
document.getElementById('overridebutton').innerHTML = "Override Next Function | Status: OFF";
}
}

function overrideNext(){
nextFunctionOverride = !nextFunctionOverride;
    updateNextOverride();
}

document.body.onmousemove = function() {
    updateScore();
}

next = function(nr) {
if (nextFunctionOverride){
console.log("Next Override enabled: form attempted to go to the next question of N°"+nr);
}else{
console.log("Next Override disabled: form moved to the next question of N°"+nr);
if(document.getElementById('d'+nr+'-a').checked == true){
							tot_test += parseInt(document.getElementById('d'+nr+'-a').value);
						}
						if(document.getElementById('d'+nr+'-b').checked == true){
							tot_test += parseInt(document.getElementById('d'+nr+'-b').value);
						}
						if(document.getElementById('d'+nr+'-c').checked == true){
							tot_test += parseInt(document.getElementById('d'+nr+'-c').value);
						}
						if(document.getElementById('d'+nr+'-d').checked == true){
							tot_test += parseInt(document.getElementById('d'+nr+'-d').value);
						}
						
						//-----------------------------------------------
						soglia_min = parseInt('8');
						nmax = parseInt('10');
						//-----------------------------------------------
						
						for(i=1; i<=nmax; i++){
							document.getElementById('d'+i).style.display = 'none';
							if(document.getElementById('d-audio'+i)){
								document.getElementById('d-audio'+i).pause();
							}
						}
																			
						nr_succ = parseInt(nr) + 1;
						if(nr_succ == nmax+1)
						{
														
								if(tot_test == nmax || (soglia_min > 0 && tot_test >= soglia_min)){
									document.getElementById('loader').style.display='block';
									document.getElementById('form-s').submit();
								}else{
									if(soglia_min > 0){
																					alert('Hai risposto correttamente solo a '+tot_test+' domande su '+nmax+'.\nPer proseguire devi rispondere correttamente ad almeno '+soglia_min+' domande. Riprova');
																			}else{
																					alert('Hai risposto correttamente solo a '+tot_test+' domande su '+nmax+'.\nPer proseguire devi rispondere correttamente a tutte le domande. Riprova');	
																			}
									tot_test = 0;
									for(i=1; i<=nmax; i++){
										document.getElementById('d'+i+'-a').checked = false;
										document.getElementById('d'+i+'-b').checked = false;
										document.getElementById('d'+i+'-c').checked = false;
										document.getElementById('d'+i+'-d').checked = false;
									}
									document.getElementById('d1').style.display = 'block';
									document.getElementById('d'+nmax).style.display = 'none';
								}
								
													}
						else
						{
							document.getElementById('d'+nr_succ).style.display = 'block';
						}
}
}
