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
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImg);
  ghost.scale=0.4

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  if(gameState="play"){
  if(tower.y > 400){
      tower.y = 300;
    }
  
  if(keyDown("space")){
    ghost.velocityY=-4
  }
  ghost.velocityY+=0.5

  if(keyDown("left_arrow")){
    ghost.x-=4
  }
  if(keyDown("right_arrow")){
    ghost.x+=4
  }

  spawnDoor();

  if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0
  }



  if(ghost.isTouching(invisibleBlockGroup)||(ghost.y>=600)){
    gameState="end"
  }
  drawSprites();
  }
  
if (gameState==="end"){
  textSize(30)
  fill("yellow")
  text("Game Over",220,300)
  ghost.destroy()
  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  invisibleBlockGroup.destroyEach()
}

 
}

function spawnDoor(){
if(frameCount%200===0){
  door=createSprite(Math.round(random(120,400)),-10);
  door.addImage(doorImg);
  door.velocityY=2;
  door.lifetime=300;
  ghost.depth=door.depth
  ghost.depth+=1
  doorsGroup.add(door);

  climber=createSprite(door.x,55);
  climber.addImage(climberImg);
  climber.velocityY=2;
  climber.lifetime=300;
  climbersGroup.add(climber);

  invisibleBlock=createSprite(climber.x,60,climber.width,2)
  invisibleBlock.velocityY=2
  //invisibleBlock.debug=true
  invisibleBlock.liftime=300
  invisibleBlockGroup.add(invisibleBlock)
}
}

