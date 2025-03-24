const canvas = document.getElementById("gameContainer");
const lost = document.getElementById("lost");
const scoreText = document.getElementById("scoreText");
const speedInput = document.getElementById("speedInput");
const scoreBox = document.getElementById("scoreBox");

var highscore = 0;
let highscoresResult = localStorage.getItem("snakeHighscore");
if (highscoresResult){
    highscore = highscoresResult;
}

var gamesPlayed = 0;
let gamesPlayedResult = localStorage.getItem("snakeGamesPlayed");
if (gamesPlayedResult){
    gamesPlayed = gamesPlayedResult;
}

setup();


function setup(){


    setEventListeners();

    displayHistory();

    function displayHistory(highscore, gamesPlayed){
        document.getElementById("highscore").innerText = highscore;
        document.getElementById("numOfGames").innerText = gamesPlayed;
    }
    
    var player = [];
    var gameStarted = false;
    var heigth;
    var width;
    var speedX = 0;
    var activeSpeedX = 0;
    var activeSpeedY = 0;
    var speedY = 0;
    var timer;
    var paused = false;
    var bug = {
        domElement: "",
        posX: -1,
        posY: -1
    }
    var score = 0;
    var gameSpeed = 100;
    var canvasPos = canvas.getBoundingClientRect();
    heigth = canvasPos.height;
    width = canvasPos.width;

    let newDiv = document.createElement("div");
    newDiv.classList.add("player");
    newDiv.id = "head";
    
    let snakePart = {
        domElement: newDiv,
        posX: 100,
        posY: 50,
    };
    newDiv.style.top = snakePart.posY;
    newDiv.style.left = snakePart.posX;
    canvas.appendChild(newDiv);
    player.push(snakePart);


    function pause(){
        if(!paused){
            document.getElementById("pauseDiv").classList.toggle("hide");
            paused = true;
            clearInterval(timer);
        } else {
            paused = false;
            timer = setInterval(refreshScreen, gameSpeed);
            document.getElementById("pauseDiv").classList.toggle("hide");
        }
        
    }


    function getKey(event){
        let code = event.keyCode;

        if (code == 189 && speedInput.value>1){
            speedInput.value--
        } else if (code == 187 && speedInput.value<5){
            speedInput.value++
        }

        if (code == 73){
            document.getElementById("guideDiv").classList.toggle("hide");
        }

        if (code == 32){
            restart();
        }

        if (code == 80){
            pause();
        }
        


        if (!gameStarted && (code == 37 || code == 38 || code == 39 || code == 40)) {
            gameSpeed = (6 - speedInput.value) * 50;
            gameStarted = true;
            timer = setInterval(refreshScreen, gameSpeed);
            spawnRandomBugs();
        }
        if (!paused){
            if( code == 38){
                keyUpPressed();
            } else if ( code == 39){
                keyRightPressed();
            } else if ( code == 40){
                keyDownPressed();
            } else if ( code == 37){
                keyLeftPressed();
            }
        }
        
    }
    
    function keyLeftPressed(){
        if(player[0].posX >= 5 && activeSpeedX == 0){
            speedX = -5;
            speedY = 0;
        }
    }
    function keyRightPressed(){
        if(player[0].posX <= width-5 && activeSpeedX == 0){
            speedX = 5;
            speedY = 0;
        }
    }
    function keyDownPressed(){
        if(player[0].posY <= heigth-5  && activeSpeedY == 0){
            speedX = 0;
            speedY = 5;
        }
    }
    
    function keyUpPressed(){
        if(player[0].posY >= 5  && activeSpeedY == 0){
            speedX = 0;
            speedY = -5;
        }
    }
    
    
    function getLonger(){
        let newDiv = document.createElement("div");
        newDiv.classList.add("player");
        
        let snakePart = {
            domElement : newDiv,
            posX : player[0].posX,
            posY : player[0].posY,
        };
        newDiv.style.top = snakePart.posY;
        newDiv.style.left = snakePart.posX;
        canvas.appendChild(newDiv);
        player.push(snakePart);
        score += 550 - gameSpeed;
    }
    
    
    function refreshScreen(){
        activeSpeedX = speedX;
        activeSpeedY = speedY;
        for(let i = player.length-1; i>0; i--){
            player[i].posX = player[i-1].posX;
            player[i].posY = player[i-1].posY;
            player[i].domElement.style.top = player[i].posY;
            player[i].domElement.style.left = player[i].posX;
        }
        if( !(speedY < 0 && player[0].posY <= 5) && !(speedY > 0 && player[0].posY >= heigth-5) ){
            player[0].posY += speedY;
        } else {
            lost.classList.remove("hide");
            clearInterval(timer)
    
        }
        if( !(speedX < 0 && player[0].posX <= 5) && !(speedX > 0 && player[0].posX >= width-5) ){
            player[0].posX += speedX;
        } else {
            lost.classList.remove("hide");
            clearInterval(timer)
    
        }
        for (let i = 1; i < player.length; i++){
            if(player[0].posY == player[i].posY && player[0].posX == player[i].posX){
                lost.classList.remove("hide");
                clearInterval(timer)
            }
        }
        if(player[0].posY == bug.posY && player[0].posX == bug.posX){
            removeBug();
            getLonger();
            spawnRandomBugs();
        }
        player[0].domElement.style.top = player[0].posY;
        player[0].domElement.style.left = player[0].posX;
        scoreText.innerText = score;
    }
    
    function removeBug(){
        if(bug){
            canvas.removeChild(bug.domElement);
        }
    }
    
    function spawnRandomBugs(){
        let newDiv = document.createElement("div");
        newDiv.classList.add("bug");
        bug.posX = (Math.floor(Math.random() * 40) + 1)*5;
        bug.posY = (Math.floor(Math.random() * 20) + 1)*5;
        bug.domElement = newDiv;
        newDiv.style.top = bug.posY;
        newDiv.style.left = bug.posX;
        canvas.appendChild(newDiv);
    }


    function cleanCanvas(){
        lost.classList.add("hide");
        removeBug();
        if (player){
            player.forEach(element => {
                canvas.removeChild(element.domElement);
            });
        }
        
    }

    function clearBrowserData(){
        localStorage.clear();
    }

    function restart(){
        if (score > highscore){
            highscore = score;
        }
        gamesPlayed++;
        localStorage.setItem("snakeHighscore", highscore);
        localStorage.setItem("snakeGamesPlayed", gamesPlayed);

        cleanCanvas();
        setup();
    }

    function setEventListeners(){
        document.addEventListener('keydown', getKey);
        lost.addEventListener('click', restart);
        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
    }

}


















