var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 doorsGroup=createGroup();

 climbersGroup=createGroup();
 ghost=createSprite(200,200,50,50);
 ghost.addImage(ghostImg);
 ghost.scale=0.4;

 invisibleBlockGroup=createGroup();
 spookySound.loop();
}

function draw() {
  background(200);
if(gameState==="play"){

  if(tower.y > 400){
      tower.y = 300
    }
if(keyDown("space")){
  ghost.velocityY=-10
}
ghost.velocityY=ghost.velocityY+0.8;
if(keyDown("left_arrow")){
  ghost.x=ghost.x-3;

}
if(keyDown("right_arrow")){
  ghost.x=ghost.x+3;
  
}

    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;

    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="end";
    }
    drawSprites();
}
if(gameState==="end"){
  fill("black");
  textSize(30);
  text("GAME OVER",250,250);
}
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(Math.round(random(120,450)),0);
    door.addImage(doorImg);
    door.velocityY=1;
    door.lifetime=600;
    doorsGroup.add(door);
    door.depth=ghost.depth;
    ghost.depth+=1
    
    climber=createSprite(door.x,50);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.lifetime=600;
    climbersGroup.add(climber);

    invisibleBlock=createSprite(door.x,60,climber.width,2);
    invisibleBlock.debug=true;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=600;
    invisibleBlockGroup.add(invisibleBlock);
  }
}