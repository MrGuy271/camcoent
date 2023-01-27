var canvasWidth = 640;
var canvasHeight = 480;

var canvasWidth2 = 640;
var canvasHeight2 = 480;
 
var player = 0;
var playerX = 200;
var playerY = 200;
var sprWidth = 64;
var sprHeight = 64;
var speed = 5;

var monster = 0;
var monsterX = 300;
var monsterY = 300;

var ghost = 0;
var ghostX = 400;
var ghostY = 400;

var projectiles;

var direction = 90;

var score = 0;

var song;

var lose;


var answer3 = prompt("Do you want to see the rules? Answer yes or no ONLY.");
answer3 = answer3.toLowerCase();
if (answer3 == "yes") {
  alert("Rome is on fire! Help put out the Great Fire of Rome by controlling Grumio! Control him with the arrow keys or wasd, and click to shoot water at the fire. But beware! Nero is chasing you while playing the fiddle, and you must not let him catch you. Good luck!");}
else if (answer3 == "y") {
  alert("Rome is on fire! Help put out the Great Fire of Rome by controlling Grumio! Control him with the arrow keys or wasd, and click to shoot water at the fire. But beware! Nero is chasing you while playing the fiddle, and you must not let him catch you. Good luck!");}
else if (answer3 == "no"){}
else if (answer3 == "n"){}
else if (answer3 == "only"){alert("Ha ha, very funny, I said yes or no, only wasn't an answer. So, here are the rules. Rome is on fire! Help put out the Great Fire of Rome by controlling Grumio! Control him with the arrow keys or wasd, and click to shoot water at the fire. But beware! Nero is chasing you while playing the fiddle, and you must not let him catch you. Good luck!");}
else if (answer3 == ""){}
else if (answer3 == "cameron is the best") {
  alert("Thank you, I agree!");}
else {
  alert("I said answer yes or no ONLY, so here are the rules. Rome is on fire! Help put out the Great Fire of Rome by controlling Grumio! Control him with the arrow keys or wasd, and click to shoot water at the fire. But beware! Nero is chasing you while playing the fiddle, and you must not let him catch you. Good luck!");}

  
function preload() {
  playerImg = loadImage("Grumio.png"); 
  monsterImg = loadImage("fire.png");
  ghostImg = loadImage("Nerro2.png");
  bgImg = loadImage("Rome.png");
  projectileImg = loadImage("splash.png");
  song = loadSound("LatinMusic4.mp3", loaded);
  lose = loadSound("sadtrombone.swf.mp3");
  win = loadSound("win1.mp3");
}


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = createSprite(playerX, playerY, sprWidth, sprHeight);
   player.addImage(playerImg, "Grumio.png"); 
   monster = createSprite(monsterX, monsterY, sprWidth, sprHeight);
  monster.addImage(monsterImg, "fire.png");
  ghost = createSprite(ghostX, ghostY, sprWidth, sprHeight);
  ghost.addImage(ghostImg, "Nerro2.png");

  
  
  enemy = new Group();
  enemy.add(monster);
  //enemy.add(ghost);
  
  projectiles = new Group();
  
  player.setCollider("rectangle", 0, 0, 40, 40);
  monster.setCollider("rectangle", 0, 0, 40, 40);
  ghost.setCollider("rectangle", 0, 0, 40, 40);
  
  for (var o = 0; o < 2; o++) {
    var ox =  random(180);
    var oy =  random(180);
    createEnemy(ox, oy);
  }
  for (var t = 0; t < 2; t++) {
    var tx =  (random(420)) + 220;
    var ty =  random(180);
    createEnemy(tx, ty);
  }
  for (var th = 0; th < 3; th++) {
    var thx =  (random(420)) + 220;
    var thy =  (random(260)) + 220;
    createEnemy(thx, thy);
  }
  for (var f = 0; f < 2; f++) {
    var fx =  random(420);
    var fy =  (random(260)) + 220;
    createEnemy(fx, fy);
  }
} 


  function loaded(){
    song.play();
    song.loop();
  }



function playerControls() {
   if (keyIsDown(68)) {
     player.position.x += speed;
     if (player.position.x + sprWidth/2 > canvasWidth) {
     player.position.x = canvasWidth - sprWidth/2;
     }
   } else if (keyIsDown(65)) { 
          player.position.x -= speed; 
     if (player.position.x < 0 + sprWidth/2) { 
     player.position.x = 0 + sprWidth/2;
     } 
  }  else if (keyIsDown(83)) {
  player.position.y += speed;
    if (player.position.y + sprHeight/2 > canvasHeight) {
    player.position.y = canvasHeight - sprHeight/2;
    }
  }   else if (keyIsDown(87)) {
   player.position.y -= speed;
    if (player.position.y < 0 + sprHeight/2) { 
    player.position.y = 0 + sprHeight/2;
    }
  } 
}

function enemyMovements() {
  direction += 2;
  monster.setSpeed(0, direction);
}

function collisions() {
  enemy.overlap(projectiles, destroyOther);
  player.collide(enemy, gameOver);
  player.collide(ghost, gameOver);
}

function destroyOther (destroyed, projectile) { 
  destroyed.remove();
  projectiles.remove(projectile);
  score++;
}

function gameOver() {
   if (score >= 6){
     song.stop();
     lose.play();
     ghost.remove();
     alert("You lose. But, due to your efforts, only half of Rome burns.   Score: " +score);
     window.location.reload();
   }
  if(score < 6) {
  song.stop();
  lose.play();
  ghost.remove();
  alert("You lose. Rome is destroyed and so are you.   Score: " +score);
    window.location.reload();
  }
}

function mousePressed() {
  var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(11+speed, mouseX, mouseY);
  projectile.setCollider("rectangle", 0, 0, 40, 40);
  projectiles.add(projectile);
}

function aShoot(){
  if (keyCode === RIGHT_ARROW) {
    var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(11+speed, player.position.x+1, player.position.y);
  projectile.setCollider("rectangle", 0, 0, 40, 40);
  projectiles.add(projectile);
  }
  else if (keyCode === LEFT_ARROW) {
    var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(11+speed, player.position.x-1, player.position.y);
  projectile.setCollider("rectangle", 0, 0, 40, 40);
  projectiles.add(projectile);
  }
  else if (keyCode === UP_ARROW) {
    var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(11+speed, player.position.x, player.position.y-1);
  projectile.setCollider("rectangle", 0, 0, 40, 40);
  projectiles.add(projectile);
  }
  else if (keyCode === DOWN_ARROW) {
    var projectile = createSprite(player.position.x, player.position.y);
  projectile.addImage(projectileImg);
  projectile.attractionPoint(11+speed, player.position.x, player.position.y+1);
  projectile.setCollider("rectangle", 0, 0, 40, 40);
  projectiles.add(projectile);
  }
}
function esc(){
  if (keyIsDown(27)){
    pie();
  }
}
function createEnemy(x, y){
  var newEnemy = createSprite(x,y);
  var attackImg = loadImage("fire.png");
  newEnemy.addImage(attackImg);
  newEnemy.setSpeed(0, random(360));
  newEnemy.setCollider("rectangle", 0, 0, 40, 40);
  ghost.setCollider("rectangle", 0, 0, 40, 40);
  enemy.add(newEnemy);
}

function draw() {
  background(bgImg);
  playerControls();
  aShoot();
  esc();
  collisions();
  enemyMovements();
  ghost.attractionPoint(0.2, player.position.x, player.position.y);
  ghost.maxSpeed = 4.5;
  drawSprites();
  if (score >= 10) {
  song.stop();
  win.play();
  win.loop();
  ghost.remove();
  alert("YOU WIN! Nero and his fiddle are defeated and Rome lives to see another day!   Score: " + score);
    score = 0;
     window.location.reload();
  }
  
  for (var i = 0; i < enemy.length; i++) {
    var s = enemy[i];
    if (s.position.x < -40) s.position.x = canvasWidth +40;
    if (s.position.x > canvasWidth + 40) s.position.x = -40;
    if (s.position.y < -40) s.position.y = canvasHeight +40;
    if (s.position.y > canvasHeight + 40) s.position.y = -40;
  }
   
}
       function gameOverer(){       
       }
