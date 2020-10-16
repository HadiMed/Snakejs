var canv = document.getElementById("Canv");

/* fixing the view of pixels*/
var ctx = canv.getContext('2d');

let dpi = window.devicePixelRatio;

var score=document.getElementById("score") ; 

var Level=document.getElementById("Level") ; 

canv.setAttribute('width', getComputedStyle(canv).getPropertyValue("width").slice(0, -2) * dpi);
canv.setAttribute('height', getComputedStyle(canv).getPropertyValue("height").slice(0, -2) * dpi);

var speed = 10;

var Snake = [{ x: 50, y: 40 }, { x: 70, y: 40 }, { x: 90, y: 40 }];

var food = { x: 100, y: 100 };
var oldfood = { x: 100, y: 100 };

var level = 1 ; 

var SpeedofGame = 100;

var state = "right";

var refreshId ;

function fix_pixels(){
    clearInterval(refreshId) ; 
    let dpi = window.devicePixelRatio;
    canv = document.getElementById("Canv");

    ctx = canv.getContext('2d');

    canv.setAttribute('width', getComputedStyle(canv).getPropertyValue("width").slice(0, -2) * dpi);
    canv.setAttribute('height', getComputedStyle(canv).getPropertyValue("height").slice(0, -2) * dpi);
    refreshId=setInterval(gameLoop,SpeedofGame) ; 

}

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
    
    ctx.beginPath();
      ctx.arc(food.x, food.y, 6, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'black';
      ctx.fill();

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

var ifDone=false ;  

function gameLoop() {
    collision();
    move(state);
    if (Math.abs(food.x - Snake[0].x) < 11 && Math.abs(food.y - Snake[0].y) < 11) {Generatefood() ;ifDone=false ; } 
    
    if (Snake.length%7==0 && SpeedofGame>=40 && !ifDone) {nextLevel() ; Level.innerHTML=level ; ifDone=true ; 
          setTimeout(()=>{refreshId=setInterval(gameLoop,SpeedofGame) ;},800);}  
    

  
}

function nextLevel() {
    clearInterval(refreshId) ; 
    level +=1  ; 
    Swal.fire({
        title: 'Level '+level,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },background: '#FFA781',
        showConfirmButton: false , 
        
         timer:400
    
    }) ; 
    SpeedofGame=SpeedofGame-10 ; 
    
    }

function Generatefood(){
         
        oldfood.x = food.x; oldfood.y = food.y;
        food.x = Math.floor(Math.random() * (canv.width-5));
        food.y = Math.floor(Math.random() * (canv.height-5));
        move(state);
        oldfood.x = food.x; oldfood.y = food.y;
        score.innerHTML=Snake.length ;

    
} ; 
function collision() {
    /* check collision within the snake itself or with the borders .*/ 
    if(Snake[0].x>canv.width-10 || Snake[0].x<-5 || Snake[0].y<-5 || Snake[0].y>canv.height-10){
        clearInterval(refreshId);
        Swal.fire({
            title: 'Oops ! Game Over  ',
            text: 'Your Score is: '+Snake.length, 
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
          }) ;return ; 
    }
    for (i = 1; i < Snake.length; i++) {
        if (Snake[0].x == Snake[i].x && Snake[0].y == Snake[i].y) {
            clearInterval(refreshId);
            
            Swal.fire({
                title: 'Oops ! Game Over  ',
                text: 'Your Score is: '+Snake.length, 
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
    level = 1 ; 
    SpeedofGame=100 ; 
    
    refreshId = setInterval(gameLoop, SpeedofGame); 
    
    Level.innerHTML=1 ; 
    score.innerHTML=3 ; 
}

function pause() {
    Whattodo=document.getElementById('pause') ; 
    if(Whattodo.value=='pause'){
        clearInterval(refreshId) ; 
        Whattodo.innerHTML="Continue" ; 
        Whattodo.value="continue"; 

    } else {
        Whattodo.innerHTML="pause" ;
        Whattodo.value="pause" ; 
        refreshId=setInterval(gameLoop,SpeedofGame) ;  

    } ; 
}

Swal.fire({
    title: 'Level '+level,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },background: '#FFA781',
    showConfirmButton: false , 
    
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    } , timer:800

}) ;

Level.innerHTML=1 ; 
score.innerHTML=3 ; 
setTimeout(()=>{refreshId = setInterval(gameLoop, SpeedofGame);},1200) ; 

