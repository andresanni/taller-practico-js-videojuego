const canvas= document.querySelector("#game");
const context = canvas.getContext('2d');

const buttonUp = document.querySelector("#up");
const buttonLeft = document.querySelector("#left");
const buttonRight = document.querySelector("#right");
const buttonDown = document.querySelector("#down");


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
let bombs =[]; //Array para bombas
let level = 0;


window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);


function setCanvasSize(){

    if(window.innerHeight > window.innerWidth){ 
        canvasSize = window.innerWidth * 0.8; 
    } else{ 
        canvasSize = window.innerHeight * 0.8; 
    }

    canvas.setAttribute('width',canvasSize); 
    canvas.setAttribute('height',canvasSize);

    elementSize = canvasSize / 10; 
    
    startGame();
}


function startGame(){

    
    context.font= elementSize-7 + "px Verdana"; 
    context.textAlign = "end";


    const map = maps[level]; 
   
    if(!map){ //Capturamos el flujo en caso de que no exista la posicion siguiente en el arreglo de niveles
        gameWin();
        return; //Cortamos el flujo porque sino sigue la ejecucion normal
    }
    const mapRows = map.trim().split('\n'); 
    
    mapRowsColumns = mapRows.map((row) => {        
       return  row.trim().split("");                       
    });

    bombs =[]; //Limpiamos el array para evitar que en cada movimientro se agreguen mas bombas
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

            if(col=="X"){ //Agregamos un nuevo objeto al arreglo para cada bomba con las coordenadas
                bombs.push({x:positionX,y:positionY});
            }
         })
    });

    movePlayer();   

}

function movePlayer(){
    
    const goalCollisionX = playerPosition.x.toFixed(5) == goalPosition.x.toFixed(5);//Reducimos los decimales para evitar erroes cuando son muchos
    const goalCollisionY = playerPosition.y.toFixed(5) == goalPosition.y.toFixed(5);

    if(goalCollisionX&&goalCollisionY){
        levelComplete();
    }  

    //Chequeamos que en la nueva posicion no haya nuinguna bomba con las ¿mismas coordenadas
    const bombCollision = bombs.find(bomb=>{return bomb.x == playerPosition.x && bomb.y == playerPosition.y});

    if(bombCollision){
        console.log("PUM!")
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
}
