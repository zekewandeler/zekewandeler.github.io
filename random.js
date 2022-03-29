document.addEventListener('DOMContentLoaded', () => {

    const jsBtn = document.getElementById('jsBtn');
    const jsBtn2 = document.getElementById('jsBtn2');
    const jsBtn3 = document.getElementById('jsBtn3');
    const jsBtn4 = document.getElementById('jsBtn4');

    const textBox = document.getElementById('textBox');
    const randNumDisplay = document.getElementById('randomNum');

    jsBtn.addEventListener('click', changeText);
    function changeText () {
        jsBtn.innerHTML = "HTMl Element Change";
    }

    jsBtn2.addEventListener('click', changeText2);
    function changeText2 () {
        jsBtn2.innerHTML = "CSS Change";
        jsBtn2.classList.add('btn-success');
    }

    jsBtn3.addEventListener('click', changeBackground);
    function changeBackground () {
        document.body.style.backgroundColor = textBox.value; 
    }

    jsBtn4.addEventListener('click', genRandNum);

    function genRandNum () {

        let Min = document.getElementById('randMin').value;
        let Max = document.getElementById('randMax').value;
        let parsedMin = parseInt(Min);
        let parsedMax = parseInt(Max);

        if(parsedMax > 1000){
            document.getElementById('generateCap').innerHTML = "Not that high, jeez! Try again.";
            return;
        }
        let randNum = Math.floor(Math.random() * (parsedMax - parsedMin + 1) ) + parsedMin; 
        randNumDisplay.hidden = false;
        randNumDisplay.innerHTML = randNum;

        spawnBall(randNum);
    }

    function spawnBall(num) {
        var ballContainer = document.getElementById("ballCon")
        for (var i = num; i > 0; i--) {
        var ball = document.createElement("div");
        ball.className = "ball";
        ball.style.cssText = getRandomStyles();
        ballContainer.append(ball);
        }
        //delete balls after animation finishes
        setTimeout(() => {ballContainer.innerHTML = ""; randNumDisplay.hidden = true}, 2000);
    }

    function random(num) {
        return Math.floor(Math.random()*num)
    }
     
    function getRandomStyles() {
        var r = random(255);
        var g = random(255);
        var b = random(255);
        var mt = random(200);
        var ml = random(50);
        // var dur = random(5)+5;
        var dur = 2;
        return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        margin: ${mt}px 0 0 ${ml}px;
        animation: fall ${dur}s ease-in 
        `
    }
})

