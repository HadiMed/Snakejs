var canv = document.getElementById("Canv");


var ctx = canv.getContext('2d');

let dpi = window.devicePixelRatio;

canv.setAttribute('width', getComputedStyle(canv).getPropertyValue("width").slice(0, -2) * dpi);
canv.setAttribute('height', getComputedStyle(canv).getPropertyValue("height").slice(0, -2) * dpi);

var speed = 11;

var Snake = [{ x: 50, y: 40 }, { x: 70, y: 40 }, { x: 90, y: 40 }];

var food = { x: 100, y: 100 };
var oldfood = { x: 100, y: 100 };


var state = "right";


function move(direction) {


    switch (direction) {
        case "right":
            Snake.unshift({ x: Snake[0].x + speed, y: Snake[0].y }); break;
        case "left":
            Snake.unshift({ x: Snake[0].x - speed, y: Snake[0].y }); break;
        case "top":
            Snake.unshift({ x: Snake[0].x, y: Snake[0].y - speed }); break;
        default:
            Snake.unshift({ x: Snake[0].x, y: Snake[0].y + speed });
    }
    console.log(Snake[0].x, Snake[0].y);
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 6, 6);
    if (oldfood.x == food.x) Snake.pop();
    ctx.fillStyle = "#5B0E2D";
    for (i = 0; i < Snake.length; i++) {
        ctx.fillRect(Snake[i].x, Snake[i].y, 10, 10);


    }


}


document.addEventListener('keydown', event => {

    switch (event.keyCode) {

        case 37:
            if (state != "right" ) state = "left";move(state);
            break;
        case 38:
            if (state != "down") state = "top";move(state);
            break;
        case 39:
            if (state != "left" ) state = "right";move(state);
            break;
        case 40:
            if (state != "top" ) state = "down";move(state);
            break;move(state);



    }
});

var SpeedofGame = 100;

function gameLoop() {
    collision();
    move(state);
    
    

    if (Math.abs(food.x - Snake[0].x) < 8 && Math.abs(food.y - Snake[0].y) < 8) {
        oldfood.x = food.x; oldfood.y = food.y;
        food.x = Math.floor(Math.random() * canv.width);
        food.y = Math.floor(Math.random() * canv.height);
        move(state);
        oldfood.x = food.x; oldfood.y = food.y;

    }
}

function collision() {
    for (i = 1; i < Snake.length; i++) {
        if (Snake[0].x == Snake[i].x && Snake[0].y == Snake[i].y) {
            clearInterval(refreshId);
            
            Swal.fire({
                title: 'Oops ! Game Over  ',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },background: '#FFA781',
                confirmButtonColor: "black" , 
                confirmButtonText: "Play again ? ",
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              }).then((result) => {
                  if(result.isConfirmed){
                      reset() ; 
                  }
              }) ; 
              
        }
    }
}

function reset() {
    Snake=[{ x: 50, y: 40 }, { x: 70, y: 40 }, { x: 90, y: 40 }] ; 
    state="right" ; 
    refreshId = setInterval(gameLoop, SpeedofGame); 
}

var refreshId = setInterval(gameLoop, SpeedofGame); 