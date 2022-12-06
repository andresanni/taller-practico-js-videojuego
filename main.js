const canvas= document.querySelector("#game");
const context = canvas.getContext('2d');

const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");
const spanLifes = document.querySelector("#lifes");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const pResult = document.querySelector("#result");


let canvasSize;
let elementSize;
const playerPosition={
    x:undefined,
    y:undefined
}
const goalPosition={
    x:undefined,
    y:undefined
}
let bombs =[]; 
let level = 0;
let lifes = 3;

let startTime; 
let timePlayer;
let timeInterval;

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);


function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){ 
        canvasSize = window.innerWidth * 0.8; 
    } else{ 
        canvasSize = window.innerHeight * 0.8; 
    }

    Number(canvasSize.toFixed(0));
    canvas.setAttribute('width',canvasSize); 
    canvas.setAttribute('height',canvasSize);

    elementSize = canvasSize / 10; 
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}


function startGame(){
    showLifes();
    
    context.font= elementSize-7 + "px Verdana"; 
    context.textAlign = "end";


    const map = maps[level]; 
   
    if(!map){ 
        gameWin();
        return; 
    }

    if(!startTime){
        startTime = Date.now();
        timeInterval = setInterval(showTime,100);
        showRecord();
    }   

    const mapRows = map.trim().split('\n'); 
    
    mapRowsColumns = mapRows.map((row) => {        
       return  row.trim().split("");                       
    });

    bombs =[]; 
    context.clearRect(0,0,canvasSize,canvasSize);

    mapRowsColumns.forEach((row, rowI) => {
        row.forEach((col,colI) =>{
            let emoji = emojis[col];
            let positionX= elementSize*(colI+1);
            let positionY=elementSize*(rowI+1);

            context.fillText(emoji,positionX,positionY);

            if(col==="O"&& !playerPosition.x && !playerPosition.y){
                playerPosition.x = positionX;
                playerPosition.y = positionY;
            }

            if(col=="I"){
                goalPosition.x= positionX;
                goalPosition.y = positionY;
            }

            if(col=="X"){ 
                bombs.push({x:positionX,y:positionY});
            }
         })
    });

    movePlayer();   
}

function movePlayer(){
    
    const goalCollisionX = playerPosition.x.toFixed(5) == goalPosition.x.toFixed(5);
    const goalCollisionY = playerPosition.y.toFixed(5) == goalPosition.y.toFixed(5);

    if(goalCollisionX&&goalCollisionY){
        levelComplete();
    }
    
    const bombCollision = bombs.find(bomb=>{return bomb.x == playerPosition.x && bomb.y == playerPosition.y});

    if(bombCollision){
        levelFailed();
    }

    context.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);

}

buttonUp.addEventListener("click",moveUp);
buttonLeft.addEventListener("click",moveLeft); 
buttonRight.addEventListener("click",moveRight); 
buttonDown.addEventListener("click",moveDown); 

window.addEventListener("keydown",moveByKey);


function moveByKey(event){
    switch(event.key){
        case "ArrowUp" :moveUp();
            break;
        case "ArrowRight": moveRight();
            break;
        case "ArrowDown": moveDown();
            break;
        case "ArrowLeft": moveLeft();
            break;
    }
}


function moveUp(){
    if(!((playerPosition.y-elementSize)<elementSize)){ 
    playerPosition.y -= elementSize;
    startGame();}
}
function moveLeft(){
    if(!((playerPosition.x-elementSize)<elementSize)){ 
        playerPosition.x -= elementSize;
        startGame();}
    }


function moveRight(){
    if(!((playerPosition.x+elementSize)>canvasSize)){ 
        playerPosition.x += elementSize;
        startGame();}
    }


function moveDown(){
    if(!((playerPosition.y+elementSize)>canvasSize)){ 
        playerPosition.y += elementSize;
        startGame();}
    }
  
function levelComplete(){
    console.log("Subimos de nivel");
    level++;
    startGame();
}

function gameWin(){
    console.log("JUEGO TERMINADO!")
    clearInterval(timeInterval);

    const record= localStorage.getItem("record_time");
    const playerTime = Date.now()-startTime;

    if(record){
        if(playerTime<record){
            localStorage.setItem("record_time",playerTime);
            pResult.innerHTML="Eres el nuevo record";
        }else{
            pResult.innerHTML="No se Supero el record";
        }
    }
    else{
        localStorage.setItem("record_time",playerTime);
        pResult.innerHTML="Primera vez, aún no hay record";
    }
}

function levelFailed(){
    if(lifes > 0){   
    lifes --;
    playerPosition.x = undefined;
    playerPosition.y=undefined;
    startGame();
}
    else{
        gameOver();
    }

}

function gameOver(){
    level=0;
    lifes =3;
    playerPosition.x = undefined;
    playerPosition.y=undefined;
    startTime = undefined;
    startGame();
}

function showLifes(){
  spanLifes.innerHTML="";  
  const heartsArray= Array(lifes).fill(emojis["HEART"]);
  heartsArray.forEach(heart=>{spanLifes.innerHTML+=heart})
}

function showTime(){
    spanTime.innerHTML = millisToMinutesAndSeconds(Date.now()-startTime);

}

function showRecord(){
    spanRecord.innerHTML = millisToMinutesAndSeconds(localStorage.getItem("record_time"));
}



function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }