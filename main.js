const canvas= document.querySelector("#game");
const context = canvas.getContext('2d');

window.addEventListener('load',startGame);

function startGame(){
    // context.fillRect(0,0,100,100); //Dibujar rectangulo con las coordenadas y el tamaño
    // context.clearRect(0,0,50,50); //Borrar en forma de rectangulo con las coordenadas y el tamaño
    
    //Para darle estilo a los textos le asignamos valor a los siguientes variables:
    // context.font= "25px Verdana";
    // context.fillStyle = "purple";
    // context.textAlign = "left"; //Alineacion con respecto al punto que marcan las coordenadas
    // context.fillText("Andres",25,25);

    //Propiedades que nos devuelven el tamaño de nuestro HTML
    // windows.innerHeight
    // windows.innerWidth
    let canvasSize;
    if(window.innerHeight > window.innerWidth){ //Si el ancho del area visible del HTML es mayor que el alto
        canvasSize = window.innerWidth * 0.8; //Tomamos el ancho como referencia y asignamos el 80 por ciento de su valor
    } else{ //Si el largo es mayor que el ancho
        canvasSize = window.innerHeight * 0.8; // El valor como referencia es el alto, tomamos el 80 por ciento del mismo
    }

    canvas.setAttribute('width',canvasSize); //Asigno el mismo valor al ancho y al alto para obtener un cuadrado
    canvas.setAttribute('height',canvasSize);

    const elementSize = canvasSize / 10; //Variable dinamica con relacion al tamaño del canvas que ya habiamos calculado
    console.log({canvasSize,elementSize});

    context.font= elementSize + "px Verdana"; //reemplazamos el numero de pixeles por nuestra variable para que sea dinamico.
    context.textAlign = "end";
    for (let i = 1; i <= 10; i++) {
        
        context.fillText(emojis['I'],elementSize*i,elementSize);
        
    }
    

}


