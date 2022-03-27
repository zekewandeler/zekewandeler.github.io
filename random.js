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
        let randNum = Math.floor(Math.random() * (parsedMax - parsedMin + 1) ) + parsedMin; 
        randNumDisplay.innerHTML = randNum;
     }

})

