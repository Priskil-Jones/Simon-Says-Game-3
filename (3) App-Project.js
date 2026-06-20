let gameSeq = [];
let userSeq = [];

let btns = ["red", "orange", "green", "blue"]

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// let body = document.querySelector("body");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function levelUp () {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random()*4);       // 0 to 3
    let randomColor = btns[randomIndex];
    gameSeq.push(randomColor);

    console.log(gameSeq);

    let randomBtn = document.querySelector(`.${randomColor}`);
    gameFlash(randomBtn);                   //Key pressed = normal flash    
}

function gameFlash(btn) {               // btn is different
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);   //250ms (milli second)
}

function checkAns(index) {

    if (userSeq[index] == gameSeq[index]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000)                 // levelUp();
        }
    }

    else {
        if (level > highScore){
            highScore = level;
        }
        
        h2.innerHTML = `Game Over! Your score was ${level} <br> Highest Score = ${highScore} <br> Press any key to start.`;
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";     //redFlash Unique Method
        }, 150);
        
        reset();
    }

}

function btnPress() {
    let btn = this;       // btn is different. Every function has function scope that's why.
    userFlash(btn);    //Box pressed by user = userflash

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function userFlash(btn) {               // btn is different
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);   //250ms (milli second)
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {                                      // btn is different
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// function redAlert() {
//     body.classList.add("redflash");
//     setTimeout(function() {                               //Normal function for Flash, userFlash, redFlash
//         body.classList.remove("redflash");
//     }, 150);
// }