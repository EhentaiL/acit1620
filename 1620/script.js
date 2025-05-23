let cur_rand = 1;

// Initial Configuration
let configuration = {
    
        size: 3,       
        time: 2000,   
        gametime: 20   
}

let total = configuration.size ** 2; // total number of boxes
createGrid(configuration.size);

function createGrid(s) {
    let grid = document.querySelector(".grid");
    grid.innerHTML = ""; // Clear previous grid
    grid.style.gridTemplateColumns = `repeat(${s}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${s}, 1fr)`;
    for (let i = 0; i < s ** 2; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        grid.appendChild(box);
    }
}

// Customized Configuration
let config = document.getElementById("config");
config.style.opacity = 0.8;
config.style.pointerEvents = "initial";
let start = document.getElementById("start");
let time = document.getElementById("time"); // idk why putting it here works but for size it doesn't
let gametime = document.getElementById("gametime");
start.addEventListener("click", function() {
    let size = document.getElementById("size");
    size = parseInt(size.value);
    time = parseInt(time.value);
    gametime = parseInt(gametime.value);
    config.style.display = "none";
    // config.style.top = "-100%";
    config.style.pointerEvents = "none";
    createGrid(size);
    total = size ** 2;
    startEventListener();
    gc();
    timeLeft = gametime;
    isPaused = false;
})



let grid = document.querySelector(".grid");
let locked = false;
let boxes = document.getElementsByClassName("box");
let body = document.getElementsByTagName("body");
let shake = document.querySelector(".shake");

grid.addEventListener("click", function(e) {
    if (!e.target.className.includes("box")) {
        console.log(e.target.className);
        wrong(e.target);
    }
})
function initiateClock() {
    let gameClock = setInterval(() => {
        setRandom();
    }, time);
    return gameClock;
}

function gc() {
    gameClock = initiateClock();
}
// let gameClock = initiateClock();

function startEventListener() {
    for (let i = 0; i <  boxes.length; i++) {
        boxes[i].addEventListener("click", function(e) {
            if (boxes[i].id == "selected") {
                if (!locked) {
                correct();
                }
            } else {
                wrong(e.target);
            }
        } );
    }
    setRandom();
}


function correct() {
    clearInterval(gameClock);
    setRandom();
    gameClock = initiateClock();
    updateScore(1);
}

function generateRandom(){
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].id == "selected") {
            cur_rand = i;
            break;
        }
    }
    let random = cur_rand;
    while (cur_rand == random) {
        random = Math.floor(Math.random()*total);
    }
    return random;
}

function setRandom() {
    let random = generateRandom();
    Array.from(boxes).map(function(box) {
        box.removeAttribute("id");
    })
    boxes[random].setAttribute("id", "selected");
    // animation
    boxes[random].classList.add("selected-ain");
    let dur = Math.min(time/2, 1000);
    setTimeout(() => {
        boxes[random].classList.remove("selected-ain");
    }, dur);
}

function wrong(t) {
    shake.classList.add("shake-animation");
    t.setAttribute('id' , 'wrong');
    locked = true;
    shake.style.cursor = 'none';
    setTimeout(() => {
        shake.classList.remove("shake-animation");
        t.removeAttribute('id');
        locked = false;
        shake.style.cursor = 'auto';
    }, 1000);
    updateScore(-1);
    // setTimeout(() => {
    //     body[0].style.animationPlayState = 'paused';
    // }, 300);
    // body[0].style.cursor = 'none';
    // setTimeout(() => {
    //     body[0].style.cursor = 'auto'
    // }, 1500);
    
};

// let boxes = document.getElementsByClassName("box");

// function setrandom(){
//     let random = cur_rand;
//     while (random == cur_rand) {
//         random = Math.floor(Math.random()*9);

//     }
//     boxes[random].setAttribute("onclick","myfunc()");
//     boxes[random].setAttribute("id", "selected");
//     cur_rand = random;
// };


let thescore = 0

function updateScore(s) {
    let score = document.getElementById("score");
    let myscore = thescore += s;
    score.innerHTML = myscore;
}



 // 20 seconds
let timeLeft = "Configuring...";
let isPaused = true;
let t = document.getElementById("timer");
let resume = document.getElementById("resume");
let pause = document.getElementById("pause");
let menuOuter = document.getElementById("menu-outer");

resume.addEventListener("click", function() {
    resumeGame();
})

function pauseAttribute(v) {
    if (v == "pause") {
        pause.style.opacity = 1;
        pause.style.pointerEvents= "initial";
        menuOuter.style.pointerEvents = "initial";
    } else if (v == "resume") {
        pause.style.opacity = 0.1;
        pause.style.pointerEvents= "none";
        menuOuter.style.pointerEvents = "none";
    }
}

let timer = setInterval(() => {
    if (!isPaused) {
        timeLeft--;
        
    } else {
    }
    t.innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
    if (thescore == 10) {
        giantmoleappear();
    }
}, 1000)

function giantmoleappear() {
    clearInterval(gameClock); // 停止小地鼠
    Array.from(boxes).forEach(box => box.removeAttribute("id"));

    // 显示大地鼠
    let mole = document.getElementById("giant");
    mole.style.top = "0";
    mole.style.left = "0";

    // 3秒后隐藏大地鼠，恢复小地鼠
    setTimeout(() => {
        mole.style.top = "-100vh";
        mole.style.left = "100vw";
        setRandom(); // 重新设置随机地鼠
        gameClock = initiateClock(); // 重启刷新计时器
    }, 3000);
}
// Add CSS animations


function resumeGame() {
    isPaused = false;
    t.innerHTML = timeLeft;
    pauseAttribute("resume");
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        if (isPaused) {
            resumeGame();
        } else {
            isPaused = true;
            t.innerHTML = "PAUSED";
            pauseAttribute("pause");

        }
    }
    if (e.key === "F12") {
        endGame();
        e.preventDefault();
    }
}
    
    );

function endGame() {
    alert("The game is over! Your score is " + document.getElementById("score").innerHTML);
    window.location.reload();
}

// startGame();
