let count = 30;
let timer;
window.onload = function () {
    count = 30;
    //console.log("Loaded..");
    timer = setInterval(countdown, 1000);

    fetch('https://gimm340server.herokuapp.com/getPhrase')
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("passPhrase").textContent = JSON.stringify(data.phrase);
            console.log(data);

            fetch('https://gimm340server.herokuapp.com/check')
            .then((response) => response.json())
            .then((data) => {
                if(data.pass == 1){
                    console.log("passed");
                    window.location.href = "https://zekewandeler.github.io/success.html";
                }
                else {
                    //add maybe coooler stuff here
                    window.location.href = "https://zekewandeler.github.io/login.html";
                }
            })
        });
}

function countdown() {
    //console.log(count);
    document.getElementById("sessionCountdown").textContent = count;
    count--;

    if (count == -1) {
        clearInterval(timer);
        history.back();
    }
}

