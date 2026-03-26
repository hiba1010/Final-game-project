/*

The Game Project

By HibaTanveer

Game interaction

*/


// Game Character Positions
let gameChar_x;
let gameChar_y;
let floorPos_y;

// Controls for Character
let isLeft = false 
let isRight = false
let isFalling = false 
let isPlummeting = false

// Game status
let score = 0;
let lives = 6;
let gameOver = false;
let gameWon = false;
let lastDamageTime = 0;
let damageCooldown = 1200;

// World Element Arrays
let trees_x = []
let clouds = []
let mountains = []
let heart = []
let enemies = [];
let cars = [];
let cameraPosX = 0;
let platforms = [];
let flagpole;
let flagY;
let flowers = [];
let fireflies = [];
let sunflowers = [];
let ants = [];
let stones = [];
let worldWidth = 6500; 

// Hot air balloon arrays
let balloonX = 200;        
let balloonBaseY = 170;     
let balloonFloat = 0;       

// Day and Night System
let cycleStartTime = 0;
let cycleDuration = 45000; // full cycle = 45 seconds

let rainDrops = [];
let isRaining = false;
let splashes = [];

let sunX = 0;
let sunY = 0;
let sunStartX = 0; // starting world position of the sun

// Lightning(bolt)
let lightningOn = false;
let lightningSequence = false;

let lastLightningTime = 0;
let lightningInterval = 5000;

let lastBoltTime = 0;
let boltGap = 0;
let boltsRemaining = 0;

let lightningDuration = 120; 
let lightningCloudIndex = -1;

// Screen lightning flash
let boltCounter = 0;      // counts total bolts
let flashScreen = false;  // triggers screen flash
let flashStart = 0;       // when flash started
let flashDuration = 120;  // flash length in ms

// Leaves Arrays
let leaves = [];
let numLeaves = 15;
let windSpeed = 1.5;

// Background music 
let bgMusic;

function preload()
{
    bgMusic = loadSound('assets/background.mp3');
}

function setup()
{
	
  createCanvas(windowWidth, windowHeight);

  // Background music loop
  bgMusic.setLoop(true);
  bgMusic.play();

	floorPos_y = height * 0.60; //ground position

	//Game character position
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

  //World elements positions; 

  
  // Mountain positions
  mountains =
  [
    { x_pos: -2940, y_pos: floorPos_y, width: 245, height: 265 }, // big middle
    { x_pos: -2800, y_pos: floorPos_y, width: 160, height: 178 },  // small right
    { x_pos: -940, y_pos: floorPos_y, width: 245, height: 262 }, // big middle
    { x_pos: -800, y_pos: floorPos_y, width: 160, height: 180 },  // small right
    { x_pos: -200, y_pos: floorPos_y, width: 245, height: 262 }, // big middle
    { x_pos: -360, y_pos: floorPos_y, width: 160, height: 180 },  // small right
    { x_pos: 550, y_pos: floorPos_y, width: 245, height: 262 }, // big middle
    { x_pos: 690, y_pos: floorPos_y, width: 160, height: 180 },  // small right
    { x_pos: 1400, y_pos: floorPos_y, width: 245, height: 265 }, // big middle
    { x_pos: 1540, y_pos: floorPos_y, width: 160, height: 178 },  // small right
    { x_pos: 2300, y_pos: floorPos_y, width: 245, height: 265 }, // big middle
    { x_pos: 2440, y_pos: floorPos_y, width: 160, height: 178 },  // small right
    { x_pos: 3500, y_pos: floorPos_y, width: 245, height: 245 }, // big middle
    { x_pos: 3640, y_pos: floorPos_y, width: 160, height: 158 },  // small right
    { x_pos: 6000, y_pos: floorPos_y, width: 245, height: 295 }, // big middle
    { x_pos: 6200, y_pos: floorPos_y, width: 160, height: 190 },  // small right
    { x_pos: 5400, y_pos: floorPos_y, width: 265, height: 245 }, // big middle

  ];

  // Tree positions
  trees_x = [-3100,-2500,-2300,-1500,-550,350,880, 1200, 2000, 2600, 3000, 3300, 3900, 4450, 4700, 5200, 5890]

	treePos_x = 900;
	treePos_y = floorPos_y;
  
  // Cloud positons
  clouds = 
  [
    { x_pos: 5,  y_pos: 100, size: 0.9, speed: 0.47 },
    { x_pos: -800, y_pos:80, size: 0.8, speed: -0.85 },
    { x_pos: 800, y_pos:85, size: 0.7, speed: 0.65 },
    { x_pos: 960, y_pos:97, size: 1, speed: -0.75 },
    { x_pos: -50, y_pos:85, size: 0.9, speed: -0.45 },
    { x_pos: 160, y_pos: 100, size: 1.0, speed: 0.7 },
    { x_pos: 800, y_pos:80, size: 0.8, speed: -0.95 },
    { x_pos: -1500, y_pos: 120, size: 1.2, speed: 0.45 },
    { x_pos: 1800, y_pos: 90, size: 1, speed: -0.28 },
    { x_pos: 2000, y_pos: 92, size: 0.8, speed: 0.88 },
    { x_pos: 2600, y_pos: 83, size: 0.7, speed: 0.48 },
    { x_pos: 3100, y_pos: 94, size: 1, speed: 0.82 }
  ]

  // Canyon positions
  canyons = 
  [
  { x_pos: 100,  outerWidth: 140, innerOffset: 20, innerWidth: 100 },
  { x_pos: 1800, outerWidth: 140, innerOffset: 20, innerWidth: 100 },
  { x_pos: 2760, outerWidth: 140, innerOffset: 20, innerWidth: 100 },
  { x_pos: 4100, outerWidth: 140, innerOffset: 20, innerWidth: 100 },
  { x_pos: -1200,  outerWidth: 140, innerOffset: 20, innerWidth: 100 },
  { x_pos: -1900, outerWidth: 140, innerOffset: 20, innerWidth: 100 }
  ];

  // Platforms positions
  platforms = 
  [ 
  [-700, floorPos_y - 75, 130, 100, -700],
  [1100, floorPos_y - 80, 140, 100, 600],   
  [1500, floorPos_y - 100, 160, 0, 2300],  
  [3300, floorPos_y - 90, 120, 100, 3000],
  [3300, floorPos_y - 90, 115, 100, 3700],
  [4600, floorPos_y - 90, 120, 100, 4600],
  [5300, floorPos_y - 90, 115, 0, 5300]
  ];

  // Heart positions(collectable object)
  hearts = 
  [
  { x_pos: -3200, y_pos: floorPos_y - 60, size: 25, isCollected: false },
  { x_pos: -2100, y_pos: floorPos_y - 90, size: 26.5, isCollected: false },
  { x_pos: -1130, y_pos: floorPos_y - 75, size: 25, isCollected: false },
  { x_pos: -400, y_pos: floorPos_y - 90, size: 27, isCollected: false },
  { x_pos: 300,  y_pos: floorPos_y - 60, size: 25, isCollected: false },
  { x_pos: 1050,  y_pos: floorPos_y - 80, size: 26, isCollected: false },
  { x_pos: 1730, y_pos: floorPos_y - 60, size: 25, isCollected: false },
  { x_pos: 2200, y_pos: floorPos_y - 110, size: 26.5, isCollected: false },
  { x_pos: 2830, y_pos: floorPos_y - 70, size: 25, isCollected: false },
  { x_pos: 3500, y_pos: floorPos_y - 100, size: 27, isCollected: false },
  { x_pos: 4900, y_pos: floorPos_y - 105, size: 26.5, isCollected: false },
  { x_pos: 5050, y_pos: floorPos_y - 80, size: 25, isCollected: false },
  { x_pos: 5800, y_pos: floorPos_y - 70, size: 25, isCollected: false }
  ];

  // Enemy positions
  enemies = [];

  enemies.push(new Enemy(860, floorPos_y, 1, 120, 2));
  enemies.push(new Enemy(2300, floorPos_y, 1.5, 120, 2));
  enemies.push(new Enemy(-600, floorPos_y, 1, 120, 2));
  enemies.push(new Enemy(-2300, floorPos_y, 1.5, 125, 2.5));
  enemies.push(new Enemy(3300, floorPos_y, 1.25, 100, 2));
  enemies.push(new Enemy(3900, floorPos_y, 1, 90, 1));
  enemies.push(new Enemy(4600, floorPos_y, 2, 110, 2));
  enemies.push(new Enemy(5300, floorPos_y, 1, 95, 1.5));
 
  // Car positions
  cars.push(new Car(-600, floorPos_y + 77, 1));
  cars.push(new Car(-100, floorPos_y + 77, 1.5));
  cars.push(new Car(400, floorPos_y + 77, 1));
  cars.push(new Car(900, floorPos_y + 77, 1.5));
  cars.push(new Car(-400, floorPos_y + 177, 1));
  cars.push(new Car(200, floorPos_y + 177, 1.5));
  cars.push(new Car(800, floorPos_y + 177, 1));
  cars.push(new Car(1400, floorPos_y + 177, 1.5));

  //Flag position
  flagpole =
   {
  x_pos: 6500,   // near end of world
  isReached: false
  };

  flagY = floorPos_y - 40;   // starts down

  // Initial object positions
  cloud={x_pos:160,y_pos:100,size:1.0}

  mountain={x_pos: 530, y_pos: floorPos_y, width: 245, height: 262}

  collectable = { x_pos: 400, y_pos: floorPos_y - 40, size: 50, isFound: false}

  // Leaves positions
  for (let i = 0; i < numLeaves; i++) {
  leaves.push({
   x: random(width),
   y: random(height - 190, height - 40), // near ground
   size: random(8, 14),
   speed: random(0.5, 1.5),
   angle: random(TWO_PI),
   rotationSpeed: random(-0.05, 0.05)
   })
   }

  // create flowers
  for(let i = 0; i < 120; i++)
  {
  flowers.push({
    x: random(-1000, worldWidth),
    y: floorPos_y,
    size: random(6,10),
    color: color(random(200,255), random(80,180), random(150,255))
   });
  }

  // create stones
  for(let i = 0; i < 150; i++)
    {
  let x = random(-1000, worldWidth);

  if(isInsideCanyon(x)) continue;

  stones.push({
    x: x,
    y: random([floorPos_y + 45, floorPos_y + 145]), // same strips as ants
    size: random(9,14), // larger stones
    rotation: random(TWO_PI)
  });
  }

  // create fireflies
  for(let i=0;i<90;i++)
  {
  fireflies.push({
    x: random(-1000, worldWidth),
    y: random(floorPos_y-120, floorPos_y+10), // allows slightly below ground
    speed: random(0.3,0.8),
    phase: random(TWO_PI),
    twinkle: random(0.02,0.08) // new property
  });
  }

  // create rain drops
  for(let i = 0; i < 200; i++)
  {
  rainDrops.push({
    x: random(-1000, worldWidth),
    y: random(-height, 0),
    speed: random(6, 10)
  });
  }

  // create ant trails
  for(let i = 0; i < 25; i++)
  {
  let startX = random(-1000, worldWidth);

  // dont appear over canyon
  if(isInsideCanyon(startX)) continue;

  ants.push({
    x: startX,
    y: random([floorPos_y + 45, floorPos_y + 145]), // green strips above roads
    speed: random(0.4,0.8),
    length: floor(random(4,8)) // ants in a line
  });
  }

  // create sunflowers
  for(let i=0;i<25;i++)
  {
  sunflowers.push({
    x: random(-1000, worldWidth)
  });
  }

  cycleStartTime = millis();
  // sun appears at camera position
  sunStartX = cameraPosX;

  startGame();

}

function draw()
{

	/////////DRAWING CODE//////////


 // Sky
	updateSkyCycle(); 

 // Ground 
 noStroke();
 fill(15, 79, 3);
 rect(0, floorPos_y, width, height - floorPos_y);

// --- Score and Lives count ---
fill(255);
noStroke();
textSize(24);
textAlign(LEFT);

text("Score: " + score, 20, 35);
text("Lives: " + lives, 20, 65);

if(!gameOver && !gameWon)
 { 
  //Move character left
  if(isLeft)
  {
    gameChar_x-= 3;
  }

  //Move character right
  if(isRight)
  {
    gameChar_x+= 3;
  } 
  
  //Character movement
  if (isLeft && !isPlummeting) 
  {
    gameChar_x -= 3;
  }

  if (isRight && !isPlummeting) 
  {
    gameChar_x += 3;
  }

let contactIndex = checkPlatformContact(gameChar_x, gameChar_y);

// move platforms
for(let i = 0; i < platforms.length; i++)
{
  let oldX = platforms[i][0];

  platforms[i][0] =
      platforms[i][4] +
      sin(frameCount * 0.03) * platforms[i][3];

  // platform logic (player moves with platform)
  if(contactIndex === i)
  {
    gameChar_x += (platforms[i][0] - oldX);
  }
}

// gravity
if(gameChar_y < floorPos_y && contactIndex == -1 && !isPlummeting)
{
  gameChar_y += 5;
  isFalling = true;
}
else if(!isPlummeting)
{
  isFalling = false;

  if(contactIndex != -1)
  {
    gameChar_y = platforms[contactIndex][1];
  }
}

// Plummeting down canyon
if (isPlummeting) {
  gameChar_y += 5;
}
 }

 // lose life if fall down the canyon
if(gameChar_y > height + 100 && !gameOver && !gameWon)
{
  lives--;
  lastDamageTime = millis();

  gameChar_x = width/2;
  gameChar_y = floorPos_y;
  isPlummeting = false;

  if(lives <= 0)
  {
    gameOver = true;
  }
}

for (let i = 0; i < canyons.length; i++) {
  if (
    gameChar_x > canyons[i].x_pos &&
    gameChar_x < canyons[i].x_pos + canyons[i].outerWidth &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
  }
}
  
  // side scrolling
  cameraPosX = gameChar_x - width / 2
  push();
  translate (-cameraPosX, 0)

  //Function elements
  drawRain();
  drawSplashes();
  drawRoads();
  drawAnts();
  drawStones();
  drawFlowers();
  drawSunflowers();

  // Draw mountains
  for (let i = 0; i < mountains.length; i++) {
  let mountain = mountains[i];


   // Snow peak (for brown outline)
  fill(245, 239, 235)
  stroke(82, 40, 12)
  strokeWeight(2.5)
   beginShape();
  vertex(mountain.x_pos + mountain.width * 0.22, mountain.y_pos - mountain.height * 0.45);
  vertex(mountain.x_pos + mountain.width * 0.34, mountain.y_pos - mountain.height * 0.58);
  vertex(mountain.x_pos + mountain.width * 0.45, mountain.y_pos - mountain.height * 0.48);
  vertex(mountain.x_pos + mountain.width * 0.55, mountain.y_pos - mountain.height * 0.65);
  vertex(mountain.x_pos + mountain.width * 0.72, mountain.y_pos - mountain.height * 0.50);
  vertex(mountain.x_pos + mountain.width * 0.78, mountain.y_pos - mountain.height * 0.45);
  vertex(mountain.x_pos + mountain.width * 0.50, mountain.y_pos - mountain.height);
  endShape(CLOSE)

  noStroke();

  // Mountain body
  fill(82, 40, 12); 
  triangle(
    mountain.x_pos,
    mountain.y_pos,
    mountain.x_pos + mountain.width / 2,
    mountain.y_pos - mountain.height,
    mountain.x_pos + mountain.width,
    mountain.y_pos
  )

   // Snow peak 
  fill(245, 239, 235);

  beginShape();
  vertex(mountain.x_pos + mountain.width * 0.22, mountain.y_pos - mountain.height * 0.45);
  vertex(mountain.x_pos + mountain.width * 0.34, mountain.y_pos - mountain.height * 0.58);
  vertex(mountain.x_pos + mountain.width * 0.45, mountain.y_pos - mountain.height * 0.48);
  vertex(mountain.x_pos + mountain.width * 0.55, mountain.y_pos - mountain.height * 0.65);
  vertex(mountain.x_pos + mountain.width * 0.72, mountain.y_pos - mountain.height * 0.50);
  vertex(mountain.x_pos + mountain.width * 0.78, mountain.y_pos - mountain.height * 0.45);
  vertex(mountain.x_pos + mountain.width * 0.50, mountain.y_pos - mountain.height);
  endShape(CLOSE);
}

 // Draw fireflies when sun is about to set       
if(sunY > floorPos_y - 120 || isRaining)
{
  drawFireflies();
}

  // Draw trees
  for (let i = 0; i < trees_x.length; i++) {
  let t_x = trees_x[i];
  let t_y = floorPos_y;
  
  // Tree trunk
  push()
  fill(145, 82, 29);
  stroke(92, 42, 14)
  strokeWeight(1.75)
  rect(t_x + 17, t_y - 90, 27, 90);
  pop()

  // Tree leaves
  push()
  fill(56, 145, 39);
  stroke(17, 82, 14)
  strokeWeight(3.5)
  
  ellipse(t_x + 20, t_y - 158, 100, 80);
  ellipse(t_x-12, t_y - 112, 85, 70);
  ellipse(t_x + 72, t_y - 111, 80, 65);
  ellipse(t_x + 23, t_y - 112, 90, 75);
  ellipse(t_x -15, t_y - 142, 70, 60);
  ellipse(t_x + 76, t_y - 145, 70, 62);
  pop()

  noStroke();

  // Tree trunk
  fill(145, 82, 29);
  rect(t_x + 18, t_y - 90, 26, 90);

  // Tree leaves (round, layered like picture)
  fill(56, 145, 39);
  noStroke()
  ellipse(t_x + 20, t_y - 158, 100, 80);
  ellipse(t_x-12, t_y - 112, 85, 70);
  ellipse(t_x + 72, t_y - 111, 80, 65);
  ellipse(t_x + 23, t_y - 112, 90, 75);
  ellipse(t_x -15, t_y - 142, 70, 60);
  ellipse(t_x + 76, t_y - 145, 70, 62);
}

// Game wins when reach flagpole
renderFlagpole();

if(abs(gameChar_x - flagpole.x_pos) < 40 && !flagpole.isReached)
{
    flagpole.isReached = true;
    gameWon = true;
}

 //Draw the canyon
 for (let i = 0; i < canyons.length; i++) {

  stroke(92, 42, 14)
  strokeWeight(1.75)

  // Outer canyon
  fill(120, 167, 176);
   stroke(15, 79, 3)
  strokeWeight(1.75)
  rect(
    canyons[i].x_pos,
    floorPos_y,
    canyons[i].outerWidth,
    height - floorPos_y
  );

  // Inner canyon (inside)
  fill(149, 197, 207);
   stroke(15, 79, 3)
  strokeWeight(1.75)
  rect(
    canyons[i].x_pos + canyons[i].innerOffset,
    floorPos_y,
    canyons[i].innerWidth,
    height - floorPos_y
  );
}

drawPlatforms();

// Enemy draw and loop
for(let i=0;i<enemies.length;i++)
{
  enemies[i].update();
  enemies[i].draw();
}

// Car draw and loop
for(let i=0;i<cars.length;i++)
{
  cars[i].update();
  cars[i].draw();
}

// Enemy collision with game character
for(let i=0;i<enemies.length;i++)
{
  if(enemies[i].checkContact(gameChar_x, gameChar_y)
     && !gameOver && !gameWon)
  {
    if(millis() - lastDamageTime > damageCooldown)
    {
      lives--;
      lastDamageTime = millis();
      gameChar_x -= 100;

      if(lives <= 0)
      {
        gameOver = true;
      }
    }
  }
}

//  Move clouds
for (let i = 0; i < clouds.length; i++)
   {
  let cloud = clouds[i];
  cloud.x_pos += cloud.speed;

  // Right-moving clouds
  if (cloud.speed > 0 && cloud.x_pos > cameraPosX + width + 300) {
    cloud.x_pos = cameraPosX - 300;
  }

  // Left-moving clouds
  if (cloud.speed < 0 && cloud.x_pos < cameraPosX - 300) {
    cloud.x_pos = cameraPosX + width + 300;
  }
}
 
 // Draw clouds
 for (let i = 0; i < clouds.length; i++) {
 let cloud = clouds[i];

  fill(138, 170, 194); 
  stroke(7, 51, 74)  //for outline
  strokeWeight(2.5)
	ellipse(cloud.x_pos-1, cloud.y_pos-3, 80 * cloud.size, 65 * cloud.size);
	ellipse(cloud.x_pos + 30 * cloud.size, cloud.y_pos - 10 * cloud.size, 90 * cloud.size, 90 * cloud.size);
  ellipse(cloud.x_pos + 60 * cloud.size, cloud.y_pos +10, 47 * cloud.size, 42 * cloud.size);
	ellipse(cloud.x_pos + 90 * cloud.size, cloud.y_pos, 70 * cloud.size, 60 * cloud.size);
	ellipse(cloud.x_pos + 60 * cloud.size, cloud.y_pos - 20 * cloud.size, 70 * cloud.size, 60 * cloud.size);

  fill(138, 170, 194); 
  noStroke()
  ellipse(cloud.x_pos-1, cloud.y_pos-3, 80 * cloud.size, 65 * cloud.size);
	ellipse(cloud.x_pos + 30 * cloud.size, cloud.y_pos - 10 * cloud.size, 90 * cloud.size, 90 * cloud.size);
  ellipse(cloud.x_pos + 60 * cloud.size, cloud.y_pos +10, 47 * cloud.size, 42 * cloud.size);
	ellipse(cloud.x_pos + 90 * cloud.size, cloud.y_pos, 70 * cloud.size, 60 * cloud.size);
	ellipse(cloud.x_pos + 60 * cloud.size, cloud.y_pos - 20 * cloud.size, 70 * cloud.size, 60 * cloud.size);
   }

   drawHotAirBalloon();

   let currentTime = millis();

// Lightning sequence
if (!lightningSequence && currentTime - lastLightningTime > lightningInterval)
   {
  lightningSequence = true;

  boltsRemaining = floor(random(2, 4)); // 2–3 bolts
  boltGap = random(1000, 2000); // appears 1-2s apart

  lightningCloudIndex = floor(random(clouds.length)); // picks randomcloud

  lastBoltTime = currentTime; // tracks next bolts appearance
  lastLightningTime = currentTime; // tracks when sequence started

  lightningInterval = random(5000, 9000); // next sequence will happen after 5 to 9 seconds
}

//  Each bolt handle
if (lightningSequence) // only runs when lightning sequence has started
  {

  //how long one bolt flashes and how long since it started
  if (currentTime - lastBoltTime < lightningDuration) {
    lightningOn = true;
  } else {
    lightningOn = false;
  }

  if (currentTime - lastBoltTime > boltGap) {
  boltsRemaining--;
  lastBoltTime = currentTime;
  boltGap = random(1000, 2000);

  // count bolts
  boltCounter++;

  // every 3 bolts trigger flash
  if(boltCounter % 3 == 0)
  {
      flashScreen = true;
      flashStart = millis();
  }
}
  // Ending the lightning sequence
  if (boltsRemaining <= 0) {
    lightningSequence = false;
    lightningOn = false;
    lightningCloudIndex = -1;
  }
}

  // Draw lightning
  if (lightningOn && lightningCloudIndex >= 0) {
  let cloud = clouds[lightningCloudIndex];
   drawNeonLightning(
   cloud.x_pos + 50 * cloud.size,
   cloud.y_pos + 40 * cloud.size
   )
}

// Lightning world glow
if(lightningOn)
{
    push();
   // soft bluish lightning illumination
    fill(180,220,255,80);
    noStroke();
    rect(cameraPosX - 200, 0, width + 400, height);
    pop();
}

windSpeed = 1.2 + sin(frameCount * 0.01) * 1;  //leaves wind speed

// Draw collectible heart
for (let i = 0; i < hearts.length; i++) {
  if (!hearts[i].isCollected) {
    drawHeart(
      hearts[i].x_pos,
      hearts[i].y_pos,
      hearts[i].size - 7
    );
  }
}

// Check for heart collection
for (let i = 0; i < hearts.length; i++) {
  if (
    dist(gameChar_x, gameChar_y, hearts[i].x_pos, hearts[i].y_pos) < 30 &&
    !hearts[i].isCollected
  ) {
    hearts[i].isCollected = true;
    score++;
    console.log("Heart collected:", i);
  }
}

	////The Game Character////

	if(isLeft && isFalling)
	{
		// Jumping Left//

// Left leg
  
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  translate(gameChar_x-5, gameChar_y+5)
  rotate(0.5)
  rect(0,0,13,16,4);       
  pop();
    
 /// Blue outer body shape ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(2,28,82)
  
  /// upper center oval
  ellipse(gameChar_x-5, gameChar_y-59,63,35)
  /// middle left oval
  ellipse(gameChar_x-35,gameChar_y-37,12,50)
  /// middle lower left oval
  ellipse(gameChar_x-35,gameChar_y-19,12,52)
  /// lower left oval
  ellipse(gameChar_x-11,gameChar_y+2,55,21)
  /// lower right oval
  ellipse(gameChar_x-1,gameChar_y+2,59,21)
  /// middle right oval
  ellipse(gameChar_x+25,gameChar_y-37,12,53)
  /// middle lower right oval
  ellipse(gameChar_x+25,gameChar_y-19.75,12,53)
  
  noStroke()
  fill(2,28,82)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-32,70.5,86)
  /// middle left oval
  ellipse(gameChar_x-33.5,gameChar_y-38.125,12,50)
  /// lower left oval
  ellipse(gameChar_x-9.65,gameChar_y+0.5,58,22.5)
  /// lower right oval
  ellipse(gameChar_x-1.5,gameChar_y+1,59,21)
  /// middle right oval
  ellipse(gameChar_x+23,gameChar_y-39.75,12,50)
   
  ///Inner body face shape
  noStroke()
  fill(237,223,171)
  
  //face
  ellipse(gameChar_x-32,gameChar_y-28,18,50)
  ellipse(gameChar_x-32,gameChar_y-40,18,30)
  ellipse(gameChar_x-32,gameChar_y-17.75,18,30)
    
   ///eyes 
    
   // outer eyes
  fill("black")
  ellipse(gameChar_x-34,gameChar_y-20,10,10) //left eye 
    
  // inner eyes
  fill("white")
  ellipse(gameChar_x-34,gameChar_y-20,4,4) //left eye
    
  // Left arm
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  translate(gameChar_x+58, gameChar_y+24);
  rotate(0.5)
  rect(-79.5,-7,17,11,4);
  pop();
   
  //Antenna
   noFill()
   stroke("black")
   strokeWeight(2)
   bezier(
  gameChar_x - 7,  gameChar_y - 77,   // top center
  gameChar_x - 7,  gameChar_y - 110,  // left pull
  gameChar_x + 8,  gameChar_y - 123,  // right pull
  gameChar_x - 2,  gameChar_y - 130   // tip of the antenna
)    
  }

	else if(isLeft)
	{

  // Walking, Turned Left//

  // Left leg
  
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  rect(gameChar_x-10, gameChar_y+8, 13, 16, 4);       
  pop();
    
  /// Blue outer body shape ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(2,28,82)
  
  /// upper center oval
  ellipse(gameChar_x-5, gameChar_y-59,63,35)
  /// middle left oval
  ellipse(gameChar_x-35,gameChar_y-37,12,50)
  /// middle lower left oval
  ellipse(gameChar_x-35,gameChar_y-19,12,52)
  /// lower left oval
  ellipse(gameChar_x-11,gameChar_y+2,55,21)
  /// lower right oval
  ellipse(gameChar_x-1,gameChar_y+2,59,21)
  /// middle right oval
  ellipse(gameChar_x+25,gameChar_y-37,12,53)
  /// middle lower right oval
  ellipse(gameChar_x+25,gameChar_y-19.75,12,53)
  
  noStroke()
  fill(2,28,82)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-32,70.5,86)
  /// middle left oval
  ellipse(gameChar_x-33.5,gameChar_y-38.125,12,50)
  /// lower left oval
  ellipse(gameChar_x-9.65,gameChar_y+0.5,58,22.5)
  /// lower right oval
  ellipse(gameChar_x-1.5,gameChar_y+1,59,21)
  /// middle right oval
  ellipse(gameChar_x+23,gameChar_y-39.75,12,50)  
   
  ///Inner body face shape
  noStroke()
  fill(237,223,171)
  
  //face
  ellipse(gameChar_x-32,gameChar_y-28,18,50)
  ellipse(gameChar_x-32,gameChar_y-40,18,30)
  ellipse(gameChar_x-32,gameChar_y-17.75,18,30)
    
  ///eyes 
    
  // outer eyes
  fill("black")
  ellipse(gameChar_x-34,gameChar_y-20,10,10) //left eye 
    
  // inner eyes
  fill("white")
  ellipse(gameChar_x-34,gameChar_y-20,4,4) //left eye
    
  // Left arm
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  translate(gameChar_x+12, gameChar_y+60);
  rotate(1.4)
  rect(-79.5,-7,17,11,4);
  pop(); 
   
  //Antenna
   noFill()
   stroke("black")
   strokeWeight(2)
   bezier(
  gameChar_x - 7,  gameChar_y - 77,   // top center
  gameChar_x - 7,  gameChar_y - 110,  // left pull
  gameChar_x + 8,  gameChar_y - 123,  // right pull
  gameChar_x - 2,  gameChar_y - 130   // tip of the antenna
)

	}
	else if(isRight)
	{
	// Walking, turned right //

  // Right leg
  
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  rect(gameChar_x-10, gameChar_y+8, 13, 16, 4);       
  pop();

  /// Blue outer body shape ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(2,28,82)
  
  /// upper center oval
  ellipse(gameChar_x-5, gameChar_y-59,63,35)
  /// middle left oval
  ellipse(gameChar_x-35,gameChar_y-37,12,50)
  /// middle lower left oval
  ellipse(gameChar_x-35,gameChar_y-19,12,52)
  /// lower left oval
  ellipse(gameChar_x-11,gameChar_y+2,55,21)
  /// lower right oval
  ellipse(gameChar_x-1,gameChar_y+2,59,21)
  /// middle right oval
  ellipse(gameChar_x+25,gameChar_y-37,12,53)
  /// middle lower right oval
  ellipse(gameChar_x+25,gameChar_y-19.75,12,53)
  
  noStroke()
  fill(2,28,82)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-32,70.5,86)
  /// middle left oval
  ellipse(gameChar_x-33.5,gameChar_y-38.125,12,50)
  /// lower left oval
  ellipse(gameChar_x-9.65,gameChar_y+0.5,58,22.5)
  /// lower right oval
  ellipse(gameChar_x-1.5,gameChar_y+1,59,21)
  /// middle right oval
  ellipse(gameChar_x+23,gameChar_y-39.75,12,50)
     
  /// inner body face shape
  noStroke()
  fill(237,223,171)
  
  // face shape
  ellipse(gameChar_x+22,gameChar_y-28,18,50)
  ellipse(gameChar_x+22,gameChar_y-40,18,30)
  ellipse(gameChar_x+22,gameChar_y-17.75,18,30)
    
  ///eyes
    
  // outer eyes
  fill("black")
  ellipse(gameChar_x+24,gameChar_y-20,10,10) //left eye 
    
  // inner eyes
  fill("white")
  ellipse(gameChar_x+24,gameChar_y-20,4,4) //left eye
    
  // Right arm
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  translate(gameChar_x+15, gameChar_y-60);
  rotate(-0.9)
  rect(-64,+5,17,11,4);
  pop();
    
  //Antenna
  noFill()
  stroke("black")  
  strokeWeight(2);
  bezier(
  gameChar_x - 5 + 4,    gameChar_y - 76.5,  // top center
  gameChar_x - 5 + 4,    gameChar_y - 110,   // left pull
  gameChar_x - 5 - 11,   gameChar_y - 123,   // right pull
  gameChar_x - 5 - 1,    gameChar_y - 130    // tip of the antenna
  ) 

	}
 else if(isRight && isFalling)
	{
	// Jumping right//

  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  translate(gameChar_x-7, gameChar_y+12)
  rotate(-0.5)
  rect(0,0,13,16,4);       
  pop();
    
  /// Blue outer body shape ///
               
  stroke("black")
  strokeWeight(1.5)
  fill(2,28,82)
  
  /// upper center oval
  ellipse(gameChar_x-5, gameChar_y-59,63,35)
  /// middle left oval
  ellipse(gameChar_x-35,gameChar_y-37,12,50)
  /// middle lower left oval
  ellipse(gameChar_x-35,gameChar_y-19,12,52)
  /// lower left oval
  ellipse(gameChar_x-11,gameChar_y+2,55,21)
  /// lower right oval
  ellipse(gameChar_x-1,gameChar_y+2,59,21)
  /// middle right oval
  ellipse(gameChar_x+25,gameChar_y-37,12,53)
  /// middle lower right oval
  ellipse(gameChar_x+25,gameChar_y-19.75,12,53)
  
  noStroke()
  fill(2,28,82)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-32,70.5,86)
  /// middle left oval
  ellipse(gameChar_x-33.5,gameChar_y-38.125,12,50)
  /// lower left oval
  ellipse(gameChar_x-9.65,gameChar_y+0.5,58,22.5)
  /// lower right oval
  ellipse(gameChar_x-1.5,gameChar_y+1,59,21)
  /// middle right oval
  ellipse(gameChar_x+23,gameChar_y-39.75,12,50)
     
  /// inner body face shape
  noStroke()
  fill(237,223,171)
  
  // face shape
  ellipse(gameChar_x+22,gameChar_y-28,18,50)
  ellipse(gameChar_x+22,gameChar_y-40,18,30)
  ellipse(gameChar_x+22,gameChar_y-17.75,18,30)
    
  ///eyes
    
  // outer eyes
  fill("black")
  ellipse(gameChar_x+24,gameChar_y-20,10,10) //left eye 
    
  // inner eyes
  fill("white")
  ellipse(gameChar_x+24,gameChar_y-20,4,4) //left eye
    
  // Right arm
  push();
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  translate(gameChar_x+15, gameChar_y-60);
  rotate(-0.5)
  rect(-48,+30,17,11,4);
  pop();
    
  //Antenna
  noFill()
  stroke("black")  
  strokeWeight(2);
  bezier(
  gameChar_x - 5 + 4,    gameChar_y - 76.5,  // top center
  gameChar_x - 5 + 4,    gameChar_y - 110,   // left pull
  gameChar_x - 5 - 11,   gameChar_y - 123,   // right pull
  gameChar_x - 5 - 1,    gameChar_y - 130    // tip of the antenna
  ) 

	}
	else if(isFalling || isPlummeting)
	{
	// Jumping forwards //

	/// Arms ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  
  // Right arm
  push();
  translate(gameChar_x+50, gameChar_y-60);
  rotate(-0.5)
  rect(-48,+30,17,11,4);
  pop();
  
  // Left arm
  push();
  translate(gameChar_x+18.75, gameChar_y+26);
  rotate(0.5)
  rect(-79.5,-7,17,11,4);
  pop();
  
  /// Legs ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)

  // Left leg
  push();
  translate(gameChar_x, gameChar_y);
  rotate(0.5);
  rect(-12, +12, 13, 16, 4);
  pop();

  // Right leg
  push();
  translate(gameChar_x, gameChar_y);
  rotate(-0.5);
  rect(-4, +10.5, 13, 16, 4);
  pop();

  /// blue outer body shape ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(2,28,82)
  
  /// upper center oval
  ellipse(gameChar_x-5, gameChar_y-59,63,35)
  /// middle left oval
  ellipse(gameChar_x-35,gameChar_y-37,12,50)
  /// middle lower left oval
  ellipse(gameChar_x-35,gameChar_y-19,12,52)
  /// lower left oval
  ellipse(gameChar_x-11,gameChar_y+2,55,21)
  /// lower right oval
  ellipse(gameChar_x-1,gameChar_y+2,59,21)
  /// middle right oval
  ellipse(gameChar_x+25,gameChar_y-37,12,53)
  /// middle lower right oval
  ellipse(gameChar_x+25,gameChar_y-19.75,12,53)
  
  noStroke()
  fill(2,28,82)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-32,70.5,86)
  /// middle left oval
  ellipse(gameChar_x-33.5,gameChar_y-38.125,12,50)
  /// lower left oval
  ellipse(gameChar_x-9.65,gameChar_y+0.5,58,22.5)
  /// lower right oval
  ellipse(gameChar_x-1.5,gameChar_y+1,59,21)
  /// middle right oval
  ellipse(gameChar_x+23,gameChar_y-39.75,12,50)
  
  /// inner body face shape ///
  
  stroke("black")
  strokeWeight(2)
  fill(237,223,171)
  
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-33,50,52)
  /// middle left oval
  ellipse(gameChar_x-29,gameChar_y-34,11,39)
  /// middle right oval
  ellipse(gameChar_x+19.5,gameChar_y-34,11,39)
  /// upper center oval
  ellipse(gameChar_x-4.65, gameChar_y-48,55,30)
  /// lower center oval
  ellipse(gameChar_x-4.5, gameChar_y-20.5,55,30)
  
  noStroke()
  fill(237,223,171)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-33,50,52)
  /// middle left oval
  ellipse(gameChar_x-29,gameChar_y-34,11,40)
   /// middle right oval
  ellipse(gameChar_x+19.5,gameChar_y-34,11,40)
   /// upper center oval
  ellipse(gameChar_x-4.65, gameChar_y-48,54,30)
  /// lower center oval
  ellipse(gameChar_x-4.5, gameChar_y-20.5,55,30)
  
  /// eyes ///
  
  // outer eyes
  fill("black")
  ellipse(gameChar_x-21,gameChar_y-20,12,12)
  ellipse(gameChar_x+13,gameChar_y-20,12,12)
  
  // inner eyes
  fill("white")
  ellipse(gameChar_x-21,gameChar_y-20,5,5)
  ellipse(gameChar_x+13,gameChar_y-20,5,5)
   
  ///Antenna 
  
  noFill()
  stroke("black")
  strokeWeight(2)
  bezier(
  gameChar_x-7,gameChar_y-77,  // top center
  gameChar_x,gameChar_y-140,   // left pull
  gameChar_x-30,gameChar_y-150,// right pull
  gameChar_x-20,gameChar_y-125 // tip of antenna
  )

	}
	else 
	{
		// Standing, facing front //

   /// Arms ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)
  
  // Right arm
  push();
  translate(gameChar_x+50, gameChar_y-60);
  rotate(-0.5)
  rect(-48,+30,17,11,4);
  pop();
  
  // Left arm
  push();
  translate(gameChar_x+20, gameChar_y-40);
  rotate(-0.5)
  rect(-79.5,-7,17,11,4);
  pop();
  
  /// Legs ///
  stroke("black")
  strokeWeight(1.5)
  fill(133,62,19)

  // Left leg
  push();
  rect(gameChar_x-21, gameChar_y+9.5, 13, 16, 4);       
  pop();

  // Right leg
  push();
  rect(gameChar_x+2, gameChar_y+9.5, 13, 16, 4);
  pop();
  
  /// Blue outer body shape ///
  
  stroke("black")
  strokeWeight(1.5)
  fill(2,28,82)
  
  /// upper center oval
  ellipse(gameChar_x-5, gameChar_y-59,63,35)
  /// middle left oval
  ellipse(gameChar_x-35,gameChar_y-37,12,50)
  /// middle lower left oval
  ellipse(gameChar_x-35,gameChar_y-19,12,52)
  /// lower left oval
  ellipse(gameChar_x-11,gameChar_y+2,55,21)
  /// lower right oval
  ellipse(gameChar_x-1,gameChar_y+2,59,21)
  /// middle right oval
  ellipse(gameChar_x+25,gameChar_y-37,12,53)
  /// middle lower right oval
  ellipse(gameChar_x+25,gameChar_y-19.75,12,53)
  
  noStroke()
  fill(2,28,82)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-32,70.5,86)
  /// middle left oval
  ellipse(gameChar_x-33.5,gameChar_y-38.125,12,50)
  /// lower left oval
  ellipse(gameChar_x-9.65,gameChar_y+0.5,58,22.5)
  /// lower right oval
  ellipse(gameChar_x-1.5,gameChar_y+1,59,21)
  /// middle right oval
  ellipse(gameChar_x+23,gameChar_y-39.75,12,50)
  
  /// inner body face shape ///
  
  stroke("black")
  strokeWeight(2)
  fill(237,223,171)
  
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-33,50,52)
  /// middle left oval
  ellipse(gameChar_x-29,gameChar_y-34,11,39)
  /// middle right oval
  ellipse(gameChar_x+19.5,gameChar_y-34,11,39)
  /// upper center oval
  ellipse(gameChar_x-4.65, gameChar_y-48,55,30)
  /// lower center oval
  ellipse(gameChar_x-4.5, gameChar_y-20.5,55,30)
   
  noStroke()
  fill(237,223,171)
  /// center fill oval
  ellipse(gameChar_x-5,gameChar_y-33,50,52)
  /// middle left oval
  ellipse(gameChar_x-29,gameChar_y-34,11,40)
   /// middle right oval
  ellipse(gameChar_x+19.5,gameChar_y-34,11,40)
   /// upper center oval
  ellipse(gameChar_x-4.65, gameChar_y-48,54,30)
  /// lower center oval
  ellipse(gameChar_x-4.5, gameChar_y-20.5,55,30)
  
  /// eyes ///
  
  // outer eyes
  fill("black")
  ellipse(gameChar_x-21,gameChar_y-20,12,12) //left eye
  ellipse(gameChar_x+13,gameChar_y-20,12,12) //right eye
  
  // inner eyes
  fill("white")
  ellipse(gameChar_x-21,gameChar_y-20,5,5) //left eye
  ellipse(gameChar_x+13,gameChar_y-20,5,5) //right eye
   
  ///Antenna 
  
  noFill()
  stroke("black")
  strokeWeight(2)
  bezier(
  gameChar_x-7,gameChar_y-77,  // top center
  gameChar_x,gameChar_y-140,   // left pull
  gameChar_x-30,gameChar_y-150,// right pull
  gameChar_x-20,gameChar_y-125 // tip of antenna
  )
  }

pop()

pop()

// YOU WIN TEXT
if(gameWon)
{
  fill(255);
  textAlign(CENTER);
  textSize(60);
  text("YOU WIN!", width/2, height/2);
}

// Lightning screen flash
if(flashScreen)
{
    if(millis() - flashStart < flashDuration)
    {
        fill(255,255,255,200);
        noStroke();
        rect(0,0,width,height);
    }
    else
    {
        flashScreen = false;
    }
}

// End game text
if(gameOver)
{
  fill(255,0,0);
  textAlign(CENTER);

  textSize(60);
  text("GAME OVER", width/2, height/2);

  textSize(25);
  fill("white");
  text("press space to restart", width/2, height/2 + 55);
}


}

////////// INTERACTION CODES /////////////


// Functions for lightning 
function drawNeonLightning(x, y) {
  // outer glow
  stroke(0, 150, 255, 80);
  strokeWeight(10);
  drawBolt(x, y);

  // mid glow
  stroke(0, 180, 255, 160);
  strokeWeight(6);
  drawBolt(x, y);

  // core
  stroke(200, 230, 255);
  strokeWeight(2);
  drawBolt(x, y);
}

function drawBolt(x, y) {
  noFill();
  beginShape();
  vertex(x, y);
  vertex(x + 15, y + 40);
  vertex(x - 10, y + 80);
  vertex(x + 20, y + 120);
  vertex(x + 5, y + 160);
  endShape();
}

///// Game Function Codes /////

  function drawLeaves() {
  for (let i = 0; i < leaves.length; i++) {
  let leaf = leaves[i];

    // wind motion 
    leaf.x += windSpeed + leaf.speed;
    leaf.y += sin(frameCount * 0.05 + i) * 0.6;
    leaf.angle += leaf.rotationSpeed;

    // loop across the world 
    if (leaf.x > worldWidth + 50) {
      leaf.x = -50;
      leaf.y = random(floorPos_y - 140, floorPos_y - 40);
    }

    // draw leaf
    push();
    translate(leaf.x, leaf.y);
    rotate(leaf.angle + PI / 6);

    noStroke();
    fill(70, 160, 90); 
    ellipse(0, 0, leaf.size * 1.6, leaf.size);

    // leaf middle line
    stroke(40, 120, 60);
    strokeWeight(1);
    line(-leaf.size * 0.6, 0, leaf.size * 0.6, 0);

    pop();
  }
}

function drawPlatforms()
{
  push()
  stroke(198, 193, 201);
  strokeWeight(0.5);
  fill(74, 14, 4);
  

  for(let i = 0; i < platforms.length; i++) // draws multiple platforms
  {
    rect(
      platforms[i][0], // x position
      platforms[i][1], // y position
      platforms[i][2], // width
      12 // height
    );
  }
  pop()
}

function checkPlatformContact(gc_x, gc_y)
{
  // Loop through all platforms
  for(let i = 0; i < platforms.length; i++)
  {
    // Checks if character is above the platform
    if(gc_x > platforms[i][0] &&
       gc_x < platforms[i][0] + platforms[i][2])
    {
      // Calculates vertical distance between platform and character
      let d = platforms[i][1] - gc_y;

      // Checks if character is close enough to stand
      if(d >= -5 && d < 8)
      {
        return i;
      }
    }
  }
  
  return -1; // return -1 if no contact with platform is detected
  
}

function isInsideCanyon(x)
{
  // Loop through all canyons stored in the canyon array
  for(let i = 0; i < canyons.length; i++)
  {
    // Checks if character is within the canyon boundary
    if(
      x > canyons[i].x_pos &&
      x < canyons[i].x_pos + canyons[i].outerWidth
    )
    {
      return true; // character is inside the canyon
    }
  }

  return false; // character is not inside the canyon
}

function drawHeart(x, y, size) 
{
  fill(255, 0, 0);
  stroke(46, 9, 1);
  strokeWeight(1.5)

  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function drawFlowers()
{
    // Loop through every flower stored in the flower array
    for(let i=0;i<flowers.length;i++)
    {
    let f = flowers[i];

    // Skip drawing flower if inside the canyon
    if(isInsideCanyon(f.x)) continue;

    push();
    translate(f.x, f.y);

    // stem
    stroke(40,140,60);
    strokeWeight(2);
    line(0,0,0,-10);

    // petals
    noStroke();
    fill(f.color);

    ellipse(0,-12,f.size,f.size);
    ellipse(-4,-10,f.size,f.size);
    ellipse(4,-10,f.size,f.size);

    // center
    fill(255,200,0);
    ellipse(0,-10,4,4);

    pop();
  }
}

function drawStones()
{
  // Loop through every stone stored in the stone array
  for(let i = 0; i < stones.length; i++)
  {
    let s = stones[i];

    // Do not draw inside canyon
    if(isInsideCanyon(s.x)) continue;

    push();
    translate(s.x, s.y);
    rotate(s.rotation);
    fill(120,120,120);
    stroke(80);
    strokeWeight(1);
    ellipse(0,0,s.size,s.size*0.75);
    ellipse(-s.size*0.2,-1,s.size*0.3,s.size*0.2);
    pop();
  }
}

function drawHotAirBalloon()
{
  // floating animation
  balloonFloat = sin(frameCount * 0.02) * 12;
 
  // balloon position
  let x = balloonX;  
  let y = balloonBaseY + balloonFloat;  

  push();

  push();
let bx = x; // store x position
let by = y; // store y position
translate(bx, by); // move drawing origin to the balloons position

  stroke(30);
  strokeWeight(4);

// Balloon shape
push();

stroke(122,81,45);
strokeWeight(3.5);
fill(255);

// balloon outer shape
beginShape();

vertex(-70,-10);
bezierVertex(-80,-70, -30,-95, 0,-95);
bezierVertex(30,-95, 80,-70, 70,-10);
bezierVertex(55,30, 35,50, 18,60);
vertex(-18,60);
bezierVertex(-35,50, -55,30, -70,-10);

endShape(CLOSE);

// Balloon colour panels

push();

// clip everything inside balloon shape
drawingContext.save();

drawingContext.beginPath();
drawingContext.moveTo(-70,-10);
drawingContext.bezierCurveTo(-80,-70,-30,-95,0,-95);
drawingContext.bezierCurveTo(30,-95,80,-70,70,-10);
drawingContext.bezierCurveTo(55,30,35,50,18,60);
drawingContext.lineTo(-18,60);
drawingContext.bezierCurveTo(-35,50,-55,30,-70,-10);
drawingContext.closePath();

drawingContext.clip();

stroke(122,81,45);
strokeWeight(1.25)

// five equal vertical strips
fill(184,136,242);      
rect(-72,-100,30,200);

fill(243,166,245);    
rect(-42,-100,28,200);

fill(184,136,242);     
rect(-14,-100,28,200);

fill(243,166,245);    
rect(14,-100,28,200);

fill(184,136,242);    
rect(42,-100,30,200);

drawingContext.restore();

pop();

  // bottom neck
  stroke(122,81,45)
  strokeWeight(1.5)
  fill(243,166,245);
  rect(-18,55,36,10,4);

  // ropes
  stroke(122,81,45);
  strokeWeight(1.5);

  line(-14,65,-10,85);
  line(14,65,10,85);
  line(-6,65,-4,85);
  line(6,65,4,85);

  // basket
  fill(243,166,245);
  rect(-18,85,36,20,5);

  stroke(122,81,45);
  strokeWeight(2);
  noFill();
  rect(-18,85,36,20,5);

  pop();

  pop();
}

function drawAnts()
{
  for(let i=0;i<ants.length;i++)
  {
    let a = ants[i];

    // canyon protection
    if(isInsideCanyon(a.x)) continue;

    // move ants
    a.x += a.speed;

    // loop world
    if(a.x > worldWidth + 100)
{
  a.x = -200;

  if(isInsideCanyon(a.x)) // skip drawing if inside canyon
  {
    a.x += 200;
  }
}

  for(let j=0;j<a.length;j++)
{
  let ax = a.x - j*8; // calculate each x position, spacing them apart

  fill(20);
  noStroke();

  ellipse(ax, a.y, 4, 3);
}
}
}

function drawFireflies()
{
  for(let i=0;i<fireflies.length;i++)
  {
    let f = fireflies[i];

    if(isInsideCanyon(f.x)) continue; // skip firefly if insdie canyon

    f.x += sin(frameCount*0.01 + f.phase) * f.speed; // move slightly left and right
    f.y += cos(frameCount*0.02 + f.phase) * 0.3; // move sligtly up and down
    f.y = constrain(f.y, floorPos_y-130, floorPos_y+15); // restrict vertical movement within a certain range

    // Create glowing effect by changing brightness overtime
    let glow = map(sin(frameCount*f.twinkle + f.phase), -1, 1, 50, 255);

    noStroke();
    fill(255,255,120,glow);
    ellipse(f.x,f.y,6,6);
    ellipse(f.x,f.y,10,10);
  }
}

function drawSunflowers()
{
  for(let i=0;i<sunflowers.length;i++)
  {
    let s = sunflowers[i];

    if(isInsideCanyon(s.x)) continue; // if sunflower is inside the canyon, skip drawing it

    let angle = atan2(sunY - floorPos_y, sunX - s.x); // calculate angle between the sunflower and sun

    push();

    translate(s.x, floorPos_y);
    stroke(40,140,60);
    line(0,0,0,-35);
    translate(0,-35);
    rotate(angle*0.3);
    fill(255,200,0);
    ellipse(0,0,16,16);
    fill(120,80,30);
    ellipse(0,0,8,8);

    pop();

  }
}

function renderFlagpole()
{
  push();   

  strokeWeight(5);
  stroke(192, 186, 194);

  // pole
  line(flagpole.x_pos,
       floorPos_y,
       flagpole.x_pos,
       floorPos_y - 200);

  // flag state
  noStroke();
  fill(74, 19, 89);

  {
    // flag movement animation
if(flagpole.isReached && flagY > floorPos_y - 200)
{
  flagY -= 2;   // speed of going up
}
rect(flagpole.x_pos, flagY, 50, 40);
  }
  pop();
}

function windowResized() 
{
  {
    resizeCanvas(windowWidth, windowHeight);

    // store old floor before changing it
    let oldFloor = floorPos_y;

    // calculate new floor
    floorPos_y = height * 0.60;

    let diff = floorPos_y - oldFloor;

    // Mountains
    for(let i = 0; i < mountains.length; i++)
    {
        mountains[i].y_pos += diff;
    }

    //  Enemies
    for(let i = 0; i < enemies.length; i++)
    {
        enemies[i].y += diff;
    }

    // Platforms
    for(let i = 0; i < platforms.length; i++)
    {
        platforms[i][1] += diff;
    }

    // Hearts
    for(let i = 0; i < hearts.length; i++)
    {
        hearts[i].y_pos += diff;
    }

    // Flag
    flagY = floorPos_y - 40;
}

    // Mountains
    for(let i = 0; i < mountains.length; i++)
    {
        mountains[i].y_pos = floorPos_y;
    }

    // Enemies
    for(let i = 0; i < enemies.length; i++)
    {
        enemies[i].y = floorPos_y;
    }

    // Platforms
    for(let i = 0; i < platforms.length; i++)
    {
        let offset = platforms[i][1] - floorPos_y;
        platforms[i][1] = floorPos_y + offset;
    }

    // Hearts
    for(let i = 0; i < hearts.length; i++)
    {
        let offset = hearts[i].y_pos - floorPos_y;
        hearts[i].y_pos = floorPos_y + offset;
    }

    // Flagpole
    flagY = floorPos_y - 40;

    gameChar_y = floorPos_y;
}

function updateSkyCycle()
{
  let elapsed = millis() - cycleStartTime;
  let t = elapsed / cycleDuration;

  if(t > 1)
{
    cycleStartTime = millis();
    t = 0;

    // lock sun starting position to current camera position
    sunStartX = cameraPosX;
}

  // Sky colurs
let night = color(8,71,117);
let rainSky = color(40,100,150);
let day = color(135,206,235);
let sunset = color(255,140,70);

let skyColor;

if(t < 0.25)
{
  skyColor = lerpColor(night, rainSky, t / 0.25);
  isRaining = true;
}
else if(t < 0.5)
{
  skyColor = lerpColor(rainSky, day, (t - 0.25) / 0.25);
  isRaining = true;
}
else if(t < 0.75)
{
  skyColor = lerpColor(day, sunset, (t - 0.5) / 0.25);
  isRaining = false;
}
else
{
  skyColor = lerpColor(sunset, night, (t - 0.75) / 0.25);
}

background(skyColor);

  // Sun position
  if(t > 0.45 && t < 0.85)
{
    let sunProgress = map(t, 0.45, 0.8, 0, 1);

    // sun moves based on time only
    sunX = sunStartX + sunProgress * width;
    sunY = floorPos_y - sin(sunProgress * PI) * 260;

    drawSun();
}
}

function drawSun() {
  push();
  
  drawSunRays();
  noStroke();

  // outer glow
  fill(255, 200, 0, 30);
  ellipse(sunX, sunY, 200, 200);

  fill(255, 200, 0, 60);
  ellipse(sunX, sunY, 150, 150);

  fill(255, 200, 0, 120);
  ellipse(sunX, sunY, 110, 110);

  // main sun
  let sunsetTint = map(sunY, floorPos_y - 260, floorPos_y, 60, 10);
  fill(255, 180 + sunsetTint, 60);
  ellipse(sunX, sunY, 90, 90);

  pop();
}

let rainFade = isRaining ? 1 : 0.2; // controls rain visibiltiy depending on the weather
function drawRain()
{
  stroke(235, 242, 240,180 * rainFade);
  strokeWeight(2);

  // Loop through every raindrop stored in the raindrop array
  for(let i = 0; i < rainDrops.length; i++) 
  {
    let r = rainDrops[i];

    line(r.x, r.y, r.x + windSpeed * 2, r.y + 12); // draw rain slightly slanted based on wind direction

    r.y += r.speed * rainFade;
    r.x += windSpeed * 0.5;

    if(r.y > floorPos_y) // check if raindrop has reached ground
{
  // Create a splash effect when raindrop hits ground
  splashes.push({
    x: r.x,
    y: floorPos_y,
    size: random(2,5),
    life: 10
  });

  r.y = random(-200,0); // reset raindrop to random position above screen
  r.x = random(cameraPosX - 200, cameraPosX + width + 200);
}
  }
}


function drawSunRays()
{
  push();

  translate(sunX, sunY);

  // only visible near sunset
  let fade = map(sunY, floorPos_y - 260, floorPos_y, 0, 1);
  fade = constrain(fade, 0, 1);

  stroke(255, 200, 80, 90 * fade);
  strokeWeight(3);

  let rayLength = 160;

  for(let i = 0; i < 8; i++)
  {
    let angle = frameCount * 0.002 + i * PI/4; // calculate angle of each ray and rotate them

    // Calculate the end position of the ray
    let x = cos(angle) * rayLength;
    let y = sin(angle) * rayLength;

    line(0,0,x,y); // draw ray from center of the sun outwards
  }

  pop();
}

function drawSplashes()
{
  noStroke();
  fill(235,242,240,180);

  for(let i = splashes.length - 1; i >= 0; i--)
  {
    let s = splashes[i]; // store the current splash object

    ellipse(s.x, s.y, s.size * 3, s.size);

    s.life--; // reduce the splash lifetime each frame
    s.size += 0.5; // gradually increase splash size to pread it

    if(s.life <= 0) // if splash lifetime has ended, remove it from the array
    {
      splashes.splice(i,1); // remove splash
    }
  }
}

function drawRoads()
{
  push();

  // Top road
  fill(90);
  noStroke();
  rect(cameraPosX - 200, floorPos_y + 60, width + 400, 50);

  // dashed lines 
  stroke(240, 200, 60);
  strokeWeight(4);

  for(let x = cameraPosX - 200; x < cameraPosX + width + 200; x += 45)
  {
    line(x, floorPos_y + 82, x + 20, floorPos_y + 82);
  }

  // Bottom road
  noStroke();
  fill(100);
  rect(cameraPosX - 200, floorPos_y + 160, width + 400, 50);

  // dashed lines 
  stroke(240, 200, 60);
  strokeWeight(4);

  for(let x = cameraPosX - 200; x < cameraPosX + width + 200; x += 45)
  {
    line(x, floorPos_y + 185, x + 20, floorPos_y + 185);
  }

  pop();
}


function Enemy(x, y, size, range, speed) // constuctor function to create an enemy object
{
  // Store the enemy's starting position and properties
  this.x = x;
  this.y = y;
  this.size = size;
  this.range = range;
  this.speed = speed;

  this.currentX = x;
  this.direction = 1;
 
  // Function to update the enemy's movement
  this.update = function()
  {
    this.currentX += this.speed * this.direction;

    if(this.currentX > this.x + this.range)
    {
      this.direction = -1;
    }

    if(this.currentX < this.x - this.range)
    {
      this.direction = 1;
    }
  };

  //Function to draw the enemy 
  this.draw = function()
  {
    push();
    translate(this.currentX, this.y);
    scale(0.55);

    if(this.direction == 1) // flip the enemy depending on movement
    {
      scale(-1,1);
    }

    noStroke();
    fill(0,0,0,40);
    ellipse(0,8,80,20);

    let walkOffset = sin(frameCount*0.15)*6; // create walking animation
    let footAngle = (this.direction == -1 ? -0.25 : 0.25); // foot rotation depending on angle

    fill(50);
    stroke(0);
    strokeWeight(2);

    // left foot
    push();
    translate(-18 + walkOffset,0);
    rotate(footAngle);
    ellipse(0,0,28,16);
    pop();

    // right foot
    push();
    translate(18 - walkOffset,0);
    rotate(footAngle);
    ellipse(0,0,28,16);
    pop();

    fill(20);
    stroke(0);
    strokeWeight(3);

    // enemy body
    ellipse(0,-35,70,70);
    fill(230,220,140);

    // left horn/ear
    beginShape();
    vertex(-26,-40);
    vertex(-10,-35);
    vertex(-8,-28);
    vertex(-24,-30);
    endShape(CLOSE);

    // right horn/ear
    beginShape();
    vertex(26,-40);
    vertex(10,-35);
    vertex(8,-28);
    vertex(24,-30);
    endShape(CLOSE);

    // higlight of body
    fill(255,255,255,120);
    ellipse(-20,-50,18,10);

    // curved antenna
    stroke(0);
    strokeWeight(4);
    noFill();
    bezier(5,-68,20,-90,35,-85,38,-100);

    // make antenna blink every second by changing colour
    if(floor(millis()/1000)%2==0)
      fill(180,40,40);
    else
      fill(255,140,0);

    noStroke();
    star(38,-100,6,14,8); // draw blinking start on top of the antenna

    pop();
  };
 
  // Function to check if game character touches enemy
  this.checkContact = function(gc_x, gc_y)
  {
    let d = dist(gc_x, gc_y, this.currentX, this.y); // calculate distance between enemy and game character
    return d < 40; // return true if game character is close enough to collide with enemy
  };
}

function Car(x, y, speed)
{
  this.x = x;
  this.y = y;
  this.speed = speed;
  let colors = [
  [40,120,255],   // blue
  [220,60,60],    // red
  [255,200,40]    // yellow
];

this.color = random(colors);

  this.visible = true;

  this.update = function()
  {
    this.x += this.speed;

    // loop world
    if(this.x > worldWidth + 500)
    {
      this.x = -600;
    }

    // Canyon check
    this.visible = true;

    for(let i = 0; i < canyons.length; i++)
    {
      if(this.x > canyons[i].x_pos &&
         this.x < canyons[i].x_pos + canyons[i].outerWidth)
      {
        this.visible = false;
      }
    }
  };

this.draw = function()
{
  if(!this.visible) return;

  push();
  translate(this.x, this.y);

  // Body
  fill(this.color);
  noStroke();
  rect(-45,-18,90,36,8);

  // Roof
  rect(-20,-35,40,18,5);

  // Windows
  fill(200,230,255);
  rect(-15,-32,30,12,3);

  // Wheels
  fill(30);
  ellipse(-28,18,20,20);
  ellipse(28,18,20,20);

  pop();
};
}

function star(x,y,r1,r2,n)
{
  beginShape();
  // Loop around a full circle to crate star edges
  for(let i=0;i<TWO_PI;i+=TWO_PI/n)
  {
    vertex(x + cos(i)*r2, y + sin(i)*r2); // draw outer point of the star
    vertex(x + cos(i+PI/n)*r1, y + sin(i+PI/n)*r1); // draw inner point between star tips
  }
  endShape(CLOSE);
}

function startGame()
{
  score = 0;
  lives = 6;
  gameOver = false;
  gameWon = false;

  flagpole.isReached = false;
  flagY = floorPos_y - 40;

  gameChar_x = width/2;
  gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  for(let i = 0; i < hearts.length; i++)
  {
    hearts[i].isCollected = false;
  }
}
  
function keyPressed(){
   
// if statements to control the animation of the character when keys are pressed.

userStartAudio()
if(!bgMusic.isPlaying()) // start music and make it loop continously
{
    bgSound.setLoop(true);  // make the sound repeat
    bgSound.play(); // start playing the sound
}

// If game over, press space to restart
if(gameOver && keyCode == 32) 
{
  startGame(); // reset the game
  return; // stop running the rest of the function
}

  if(gameOver || gameWon) // if game is won or already over, ignore the other key presses
{
  return;
}

   //Moves left
   if (key == 'a')
    {
      isLeft = true;
    }

    //Moves right
    else if(key == 'd')
    {
      isRight = true;
    }

    //Jumps if not falling
    else if (key == 'w' && !isFalling)
    {
      gameChar_y -= 150; //jumping
      isFalling = true;
    }
   
    //If plummenting, all horizontal movement stops.
	  if(isPlummeting){
      isLeft = false;
      isRight = false;
	  }
}


function keyReleased() {
  
	// if statements to control the animation of the character when keys are released.


  //Stops moving left
  if (key == 'a')
  {
    isLeft = false;
  }

  //Stops moving right
  else if (key == 'd')
  {
    isRight = false;
  }
  
}
  




