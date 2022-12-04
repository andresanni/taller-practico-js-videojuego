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

    const map = maps[0]; 
   
    const mapRows = map.trim().split('\n'); 
    
    mapRowsColumns = mapRows.map((row) => {        
       return  row.trim().split("");                       
    });

    mapRowsColumns.forEach((row, rowI) => {
        row.forEach((col,colI) =>{
            let emoji = emojis[col];
            let positionX= elementSize*(colI+1);
            let positionY=elementSize*(rowI+1);

            context.fillText(emoji,positionX,positionY);
         })
    });

    // for (let col = 1; col <= 10; col++) {
    //     for (let row = 1; row <= 10; row++) {
    //         context.fillText(emojis[mapRowsColumns[col-1][row-1]],elementSize*row,elementSize*col);                         
    //     }         
    // }    

}


