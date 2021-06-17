//Gamestates
var PLAY=1;
var END =0;
var WIN =2;
var BEGAN =3;
var gameState=BEGAN;

//scores
var score=0;

//sprites
var alien,grass, ground,germ;
var edges;
var restart1;
var badges;

// Sounds & Images 
var alienImg,grassImg;
var bg,germImg;
var sng,help;
var badge1st,badge2nd,badge3rd,badge4th;

//Groups
var grassGroup,germGroup;

function preload(){
  //Load images here
  alienImg = loadImage("image/alien1.png");
  grassImg = loadImage("image/grass.png");
  bg       = loadImage("image/bg.png");
restartImg = loadImage("restart.png");

//Load animations here
  germImg  = loadAnimation("image/germ1.png","image/germ2.png");

//Load Sounds here
  sng      = loadSound("sng.mp3");
  help     = loadSound("hlp.mp3");

// Load badges here
  badge1st = loadImage("badge1.png");
  badge2nd = loadImage("badge2.png");
  badge3rd = loadImage("badge3.png");
  badge4th = loadImage("badge4.png");

}

function setup() {
  createCanvas(600, displayHeight);
  
  // create groups and sprites here
  ground= createSprite(300,displayHeight-100,1000,30);
  ground.shapeColor="green";
  
  alien = createSprite(200, displayHeight-displayHeight+50);
  alien.addImage(alienImg);
  alien.scale = 0.3;

  grassGroup = createGroup();
  germGroup = createGroup();

  restart1 = createSprite(550,50,25,25);
  restart1.addImage(restartImg);
  restart1.scale = 0.5;
  
  badges = createSprite(50,displayHeight/2-100,50,50);

  if(gameState === 3){
    help.play();
  }
  if(gameState === 1){
    sng.play();
  }

  
}

function draw() {
  
// Create edge sprites and create bounce off
  edges = createEdgeSprites();
  alien.bounceOff(edges[0]);
  alien.bounceOff(edges[1]);
  
  
  if(score<=0 && score>=50){
    badges.addImage(badge4th);
  }else if(score<50 && score>=100){
    badges.addImage(badge3rd);
  }else if(score<100 && score>=150){
    badges.addImage(badge2nd);
  }else if(score<150 && score>1000){
    badges.addImage(badge1st);
  } 
  
  if(gameState===3){
    background("black");

    restart1.visible = false;
    badges.visible   = false;

    
    alien.visible = false;

    textSize(15);
    fill("yellow");
    stroke("black");
  
    text("ALIEANO is travelling in galaxy.",150,50);
    text("He is lost from his spaceship",180,70);
    text("& stucked in dangerous planet",180,90);
    text("of germs.",180,110);
    text("He is hungry &",180,135);
    text("eating grass carelessly.",180,155);

    fill("yellow");
    text("Help ALIEANO to eat grass &",150,220);
    text("avoid dangerous germs to",180,240);
    text("infect the ALIEANO.",180,260);
     
    text("You are only the will of",180,310);
    text("ALIEANO to survive in",180,330);
    text("dangerous land of germs.",180,350);

    textSize(10);
    fill("pink");
    text("Press Space to continue...",150,400);

    if(keyDown("space")){
      gameState=1;
    }
  }

if(gameState===1){
  background(bg);

  restart1.visible = false;
  badges.visible = true;

  

  alien.visible = true;
  if(keyDown("RIGHT_ARROW")){
      alien.velocityX=6;
    }
  if(keyDown("LEFT_ARROW")){
    alien.velocityX=-6;
  }
  
  stroke("black");
  textSize(22);
  fill("white");
  text("Score: " +score,10,displayHeight-displayHeight+50);

  spawnGrass();
  spawnGerm();

  if(score === 100){
    gameState=2;
  }
  
}else if(gameState === 0){
  background(bg);

  restart1.visible = true;
  badges.visible = true;

  if(mousePressedOver(restart1)) {
    restart();
  }
   
  grassGroup.setVelocityYEach(0);
  grassGroup.setLifetimeEach(-1);

  germGroup.setVelocityYEach(0);
  germGroup.setLifetimeEach(-1);

  alien.setVelocityX = 0;
  stroke("white");
  textSize(22);
  fill("red");
  text("You Lose!",300,displayHeight/2-50);
 }

  if(alien.isTouching(grassGroup)){
  score=score+10;
  grassGroup[0].destroy();
  }

  if(alien.isTouching(germGroup)){
  gameState=0;
  }

  if(gameState===2){

    restart1.visible = false;

    textSize(30);
    fill("red");
    text("YOU WON!",300,displayHeight/2);
  }
  drawSprites();

  
}

//functions to spawn NPCs.
function spawnGrass(){
  if (frameCount % 100 === 0) {
    grass = createSprite(600,displayHeight-50,40,10);
    grass.x = Math.round(random(50,575));
    grass.addImage(grassImg);
    grass.scale = 0.3;
    grass.velocityY = -5;
    
     //assign lifetime to the variable
    grass.lifetime = 200;
    
    grassGroup.add(grass);

  }
}

function spawnGerm(){
  if (frameCount % 60 === 0) {
    germ = createSprite(600,displayHeight-50,20,20);
    germ.x = Math.round(random(50,575));
    germ.addAnimation("alien",germImg);
    germ.scale = 0.1;
    germ.velocityY = -(score/5);
    
    germGroup.add(germ);
  }

  if(germGroup.y<0){
    germGroup.destroyEach(0);
  }
}


function restart(){
  gameState=3;
  score=0;

  console.log("restart");
  grassGroup.destroyEach();
  germGroup.destroyEach();
}