document.addEventListener('DOMContentLoaded', () => {

    const guessBtn = document.getElementById("guessBtn"); 
    const start = document.getElementById("startGame"); 
    const result = document.getElementById('result');

    let wordList = ['shelf', 'tables', 'desk', 'tamper', 'sculpt', 'act']
    let lives = parseInt(document.getElementById('life').innerHTML);


    guessBtn.addEventListener('click', checkGuess);
    function checkGuess() {
        let hangMan =  document.getElementById("guess"); 
        console.log(hangMan.value);

        var checkEx = document.getElementById(hangMan.value);
        if(checkEx){
            checkEx.innerText = hangMan.value;
            checkWin();
        } else {
            lives = parseInt(document.getElementById('life').innerHTML);
            console.log(lives);
            document.getElementById('life').innerHTML = lives - 1;
            checkWin();
        }
    }

    start.addEventListener('click', startGame);
    function startGame() {
        start.innerHTML = 'Start';
        removeElementsByClass('removeable');
        result.innerText = "";
        document.getElementById('life').innerHTML = 8;

        let wordNumber = Math.floor(Math.random() * wordList.length);
        let word = wordList[wordNumber]
        let letters = word.split('');
        console.log(letters);

        for (let i = 0; i < letters.length; i++) { 
            const underscore = document.createElement("span");
            underscore.classList.add("removeable");
            underscore.innerText = "_ ";
            underscore.id = letters[i];
            document.getElementById('hangMan').appendChild(underscore);
        }
    }

    function removeElementsByClass(className){
        const elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    function checkWin() {
        if (lives < 2) {
            start.innerHTML = 'Restart';
            alert("You Lose");
        }

    }


});