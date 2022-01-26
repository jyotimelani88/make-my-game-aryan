var rocket,rocketImg;
var ufo1Img
var ufo2Img;
var ufo3Img;
var ufo4Img;
var bg,bgImg,bgSound,explosionSound,explosionImg,explosion;
var obstacle;
var laser,laserImg;
var obstacleGroup;
var laserSound;
var score;
var missedLaserSound;
var rays=50;
var gameState="fight";
var checkPointSound;
function preload() {
  checkPointSound=loadSound("checkPointSound.mp3");
  missedLaserSound=loadSound("missedLaser.mp3");
  laserSound=loadSound("laserSound.mp3");
  explosionSound=loadSound("explosionSound.mp3");
  bgSound=loadSound("backgroundSound.mp3");
  ufo1Img=loadImage("UFO1.png");
  ufo4Img=loadImage("UFO4.png");
  ufo3Img=loadImage("UFO3.png");
  ufo2Img=loadImage("UFO2.png");
  laserImg=loadImage("laser.png");
  bgImg=loadImage("spaceImg.jpg");
  rocketImg=loadImage("Rocket.png");
  explosionImg=loadImage("explosion.png");
}
function setup() {  
  createCanvas(800,600);

  bg=createSprite(500,500,500,500)
  bg.addImage(bgImg);
  bg.scale=1.7;

  rocket=createSprite(500,500);
  rocket.addImage(rocketImg);
  rocket.scale=0.1;
  rocket.debug = 'true'
  //rocket.x = mouseX;

  
  score=0;
  obstacleGroup=new Group();
}

function draw() {
 // background("red");
 //bgSound.play();
 bg.velocityY=10
 if(bg.y>700){
  bg.y=height/2;
}
 textSize(18);
 fill("yellow")
 text("Score: "+ score, 100,100); 
 // score = score + Math.round(getFrameRate()/100);
 // if(score>0 && score%100 === 0){
 //   checkPointSound.play() 
 //}
 if(gameState == 'fight'){
  if(keyDown("RIGHT_ARROW")){
    if(rocket.x<770)
    {
     rocket.x = rocket.x+ 10;
    }
    //rocket.x=rocket.x+8;
  }
  if(keyDown("LEFT_ARROW")){
    if(rocket.x>25)
    {
     rocket.x = rocket.x- 10;
    }
    //rocket.x=rocket.x-8;
  }
  
  if(keyWentDown("space")){
    laser= createSprite(500,500);
    laser.addImage(laserImg);
    laser.x = 360;
    rocket.x = laser.x
    laser.velocityY = -11;
    laser.scale = 0.05;
    laserSound.play();
  }
  
  spawnObstacles();
  if(obstacleGroup.isTouching(rocket)){
    obstacleGroup.destroyEach();
    gameState = 'lose';
  }

  if(obstacleGroup.isTouching(laser)){
    laser.destroy();
   // obstacleGroup.destroyEach();
    score++
  }
}

  drawSprites();
  if(gameState == 'lose'){
    bg.velocityY = 0
    textSize(35);
    strokeWeight(4)
    fill("white")
    text("GAME OVER",200,200)
  
   }
 //fill("yellow")
 //text("Rays = " + rays,displayWidth-10,displayHeight/2-10)
  //text("Score = " + score,displayWidth-200,displayHeight/2-220)
  //text("Lives = " + life,displayWidth-200,displayHeight/2-280)
}

function spawnObstacles(){
  if(frameCount%60===0){    
  obstacle=createSprite(random(50,400),100,10,40);
  obstacle.velocityY = 2;
  obstacle.debug = true
  var rand=Math.round(random(1,4))
  switch(rand){
    case 1:obstacle.addImage(ufo1Img);
    break;
    case 2:obstacle.addImage(ufo2Img);
    break;
    case 3:obstacle.addImage(ufo3Img);
    break;
    case 4:obstacle.addImage(ufo4Img);
    break;
    default:break;
  }
 
obstacle.scale=0.08
obstacle.lifetime=165;
obstacleGroup.add(obstacle);  
}

}
/*function UFO1() {
  ufo1 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  ufo1.addImage(ufo1Img);
  ufo1.velocityY = 3;
  ufo1.lifetime = 150;
  ufo1.scale = 0.1;
}

function UFO2() {
  var ufo2 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  ufo2.addImage(ufo2Img);
  ufo2.velocityY = 3;
  ufo2.lifetime = 150;
  ufo2.scale = 0.1;
}

function UFO3() {
  var ufo3 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  ufo3.addImage(ufo3Img);
  ufo3.velocityY = 3;
  ufo3.lifetime = 150;
  ufo3.scale = 0.1;
}

function UFO4() {
  var ufo4 = createSprite(0,Math.round(random(20, 370)), 10, 10);
  ufo4.addImage(ufo4Img);
  ufo4.velocityY = 3;
  ufo4.lifetime = 150;
  ufo4.scale = 1
}*/
