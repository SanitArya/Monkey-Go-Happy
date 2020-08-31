var monkey;
var monkey_run,monkey_rest,monkey_out;

var bananaI,stoneI;

var bananaGrp;
var stoneGrp;

var grnd,grndImg;
var igrnd;

var GO,GOI,resetBt,resetBtI;

var score;
var count;

var gameState;

function preload(){

  monkey_run = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png");
  
  bananaI=loadImage("banana.png");
  stoneI=loadImage("stone.png");
  grndImg = loadImage("Grnd0.png");
  
  monkey_rest = loadAnimation("sprite_2.png");
  
  monkey_out = loadAnimation("monkeyout.png");
  
  GOI = loadAnimation("Gameover0.png");
  resetBtI = loadAnimation("reset0.png");

  GroundI = loadImage("Grnd0.png")

  jungleI = loadImage("jungle1.jpg");
  jungleII = loadImage("jungle2.jpeg");
}

function setup() {
  createCanvas(1000, 700);
  
  monkey = createSprite(50,670);

 monkey.addAnimation(" monkey_rest", monkey_rest)
  monkey.scale = 0.20;
  monkey.visible = true;

  jungle = createSprite(0,400);
  jungle.addImage("jungleI",jungleI)
  jungle.scale = 2.5
  jungle.depth = -1

  jungle2 = createSprite(1000,400);
  jungle2.addImage("jungleI",jungleI)
  jungle2.scale = 2.5
  jungle2.depth = -1

  jungle3 = createSprite(2000,400);
  jungle3.addImage("jungleI",jungleI)
  jungle3.scale = 2.5
  jungle3.depth = -1

  jungle4 = createSprite(3000,400);
  jungle4.addImage("jungleI",jungleI)
  jungle4.scale = 2.5
  jungle4.depth = -1

  jungle5 = createSprite(4000,400);
  jungle5.addImage("jungleI",jungleI)
  jungle5.scale = 2.5
  jungle5.depth = -1

  jungle6 = createSprite(5000,400);
  jungle6.addImage("jungleII",jungleII)
  jungle6.scale = 2.5
  jungle6.depth = -1

  jungle7 = createSprite(6000,400);
  jungle7.addImage("jungleII",jungleII)
  jungle7.scale = 2.5
  jungle7.depth = -1

  jungle8 = createSprite(7000,400);
  jungle8.addImage("jungleII",jungleII)
  jungle8.scale = 2.5
  jungle8.depth = -1

  jungle9 = createSprite(8000,400);
  jungle9.addImage("jungleII",jungleII)
  jungle9.scale = 2.5
  jungle9.depth = -1

  jungle10 = createSprite(9000,400);
  jungle10.addImage("jungleII",jungleII)
  jungle10.scale = 2.5
  jungle10.depth = -1
  
  grnd = createSprite(500,680,100000,5);
  //grnd.addImage("GroundI",GroundI);
  grnd.shapeColor = "green"
  grnd.depth = -0.1
  grnd.scale = 5
  grnd.visible = false;

  GO = createSprite(monkey.x,300);
  GO.addAnimation("GOI",GOI)
  GO.visible = false;

  resetBt = createSprite(monkey.x,500);
  resetBt.addAnimation("resetBtI",resetBtI);
  resetBt.scale = 0.20;
  resetBt.visible = false;
  
  igrnd = createSprite(500,690,100000,5);
  igrnd.visible = false;
  
  
  
  bananaGrp = new Group();
  stoneGrp = new Group();
  
  score = 0;
  count = 5;
  
  gameState = "play";
}

function draw() {
  background(210);
  
 console.log(monkey.x)

  monkey.collide(igrnd);
  
  if(gameState=="play"){

   if(keyDown(RIGHT_ARROW)){

   monkey.x = monkey.x+10

   monkey.changeAnimation(" monkey_rest", monkey_rest)
   }

   if(grnd.x<0){

    grnd.x = grnd.width/2;
   }

   grnd.velocityX = -5;

  camera.position.x = monkey.x;
 // camera.position.y = monkey/2;

  gravity();
  jump();
  spawnBanana();
  spawnStone();
  Score();
  GameOver();
  }
  
  Over();
  reset();

  if(grnd.x%500==0){
    grnd.x = grnd.x+500;
    igrnd.x = igrnd.x+500

  }

  if(count==0){

    gameState = "over"
  }
  
  drawSprites();
  
  textSize(20);
  fill("red");
  text("Score: "+score,monkey.x-400,25);
  text("Banana Left: "+count,monkey.x+300,25);
  
}

function gravity(){

    var grav = 0.50;
    monkey.velocityY=  monkey.velocityY+grav;
  }

 function jump(){

    if(keyDown("space")&&monkey.isTouching(grnd)){
       monkey.velocityY = -10;
       }
  }

  

function spawnBanana(){
if(monkey.x%1200==0){
var banana = createSprite(monkey.x+600,displayHeight/1.2);
  banana.addAnimation("bananaI",bananaI);
  banana.scale = 0.06
  banana.lifetime = 500;
  bananaGrp.add(banana);
}
}

function spawnStone(){
if(monkey.x%1400==0){
var stone = createSprite(monkey.x+800,680);
  stone.addAnimation("stoneI",stoneI);
  stone.scale = 0.1
  //stone.velocityX = -5;
  stone.lifetime = 500;
  stoneGrp.add(stone);
}
}

function Score(){

  if(bananaGrp.isTouching(monkey)){
  bananaGrp.destroyEach();
    score = score+2;
    count = count-1;
  }
}

function GameOver(){

  if(stoneGrp.isTouching(monkey)&&monkey.scale > 0.20){
  monkey.scale = 0.20;
  }
  
  if((stoneGrp.isTouching(monkey)&&monkey.scale == 0.20&&gameState=="play")||(monkey.x>6800)){
  
    gameState = "over";
  }
}

function Over(){
if(gameState=="over"){

  stoneGrp.setVelocityXEach(0);
  bananaGrp.setVelocityXEach(0);
  
  stoneGrp.setLifetimeEach(-1);
  bananaGrp.setLifetimeEach(-1);
}

if(gameState == "over"){

  GO.x = monkey.x;
  GO.visible = true;

  resetBt.x = monkey.x;
  resetBt.visible = true;

}
else{

  GO.visible = false;

  resetBt.visible = false;
}
}

function reset(){
if(mousePressedOver(resetBt)&&resetBt.visible==true){
    gameState= "play";
  
  bananaGrp.destroyEach();
  stoneGrp.destroyEach();

  monkey.x = 50
 
  GO.visible = false;
  resetBt.visible = false;

 
  score = 0;
  count = 5
    }
}

