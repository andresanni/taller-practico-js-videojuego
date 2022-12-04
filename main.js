const canvas= document.querySelector("#game");
const context = canvas.getContext('2d');
let canvasSize;
let elementSize;


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

    console.log({canvasSize,elementSize});
    context.font= elementSize + "px Verdana"; 
    context.textAlign = "end";

    const map = maps[0]; //Capturamos en un String el mapa a utilizar
   
    //Limpiamos los espacios vacios del comienzo y del final(trim) y Cortamos el String por sus saltos de linea y guardamos cada porcion en una posicion del arreglo 
    const mapRows = map.trim().split('\n'); 
    console.log({mapRows});
   

    mapRowsColumns = mapRows.map((row) => {        
       return  row.trim().split("");                       
    });

    console.log(mapRowsColumns);


    for (let col = 1; col <= 10; col++) {
        for (let row = 1; row <= 10; row++) {
            context.fillText(emojis[mapRowsColumns[col-1][row-1]],elementSize*row,elementSize*col);                         
        }         
    }    

}


