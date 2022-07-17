// Const final variables
const imagePath = './images';

const manInitLocX = 10;
const manInitLocY = 200;
const manInitSizeW = 75;
const manInitSizeH = 75;

const dinoInitLocX = 500;
const dinoInitLocY = 125;
const dinoInitSizeW = 180;
const dinoInitSizeH = 150;

// Variables ================
// for setting
let veloc = 170
let fireballSpeed = 3;
let floor = 30; // 땅 높이 (채색 후 다시 보여줄 때 사용하기 위함.)
let backgroundColor = "White";
let floorColor = "Green";
let maxJumpHeight = 200;
let nowFrameNum = 0;
// object image
let manImgArr: HTMLImageElement[] = []
let dinoImgArr: HTMLImageElement[] = [];
let fireballImgArr: HTMLImageElement[] = [];


// Initialize canvas ==========================================================
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Types ==========================================================
interface canvasProps extends CanvasSizeProps {
  setScore: (score: number) => void;
  
}
type CanvasSizeProps = {
  canvasWidth: number;
  canvasHeight: number;
}

// Basic function
// draw functions
function redrawCanvas() {
  if (!ctx) return;
  ctx.fillStyle = backgroundColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = floorColor;
  ctx.fillRect(0, canvas.height - floor, canvas.width, floor);
}

// min~max 사이의 난수를 반환하는 함수
let rand = (min:number, max: number) =>  Math.floor(Math.random() * (max - min)) + min;

// 충돌 체크 함수
function isCrashed(dino: GameObj, cactus: GameObj){
  var xDiff = cactus.x-(dino.x+dino.width);
  var yDiff = cactus.y - (dino.y + dino.height);
  // 충돌
  if(xDiff<=-25 && yDiff<=0){
    setLife(1);
    crushedStatus = true;
    redrawCanvas();
    cancelAnimationFrame(animation);
  }
  // 종료 
  if(life <= 0){

  }
}


// main initilaize funciton
function initialize() {
  // set canvas size
  canvas.width = 700;
  canvas.height = 300;

  // main character img inital
  for (let index = 0; index < 10; index++) {
    let image = new Image();
    image.src = `${imagePath}/man${index}.png`;
    manImgArr.push(image);
  }

  // dino img inital
  for (let index = 0; index < 1; index++) {
    let image = new Image();
    image.src = `${imagePath}/dragon.png`;
    dinoImgArr.push(image);
  }

  // fireball img inital
  for (let index = 0; index < 1; index++) {
    let image = new Image();
    image.src = `${imagePath}/fire.png`;
    fireballImgArr.push(image);
  }
}

initialize();




// Running Part
// Object - object자료로 등장 캐릭터의 속성을 미리 정의
class GameObj {
  // size
  x: number;
  y: number;
  width: number;
  height: number;
  imgArr: any[];

  // constructor
  constructor(propX: number, propY: number, propWidth: number, propHeight: number, imgArr: any[]) {
    this.x = propX;
    this.y = propY;
    this.width = propWidth;
    this.height = propHeight;
    this.imgArr = imgArr;
  }

  // methods
  draw(now: number) {
    if (!ctx) return;
    ctx.drawImage(this.imgArr[now], this.x, this.y, this.width, this.height);
  }
}

let man: GameObj = new GameObj(manInitLocX, manInitLocY, manInitSizeW, manInitSizeH, manImgArr);
let dino: GameObj = new GameObj(dinoInitLocX, dinoInitLocY, dinoInitSizeW, dinoInitSizeH, dinoImgArr);
let fireballArr: GameObj[] = [];

// game status variables
let animation: number;
// let nowFrameNum = 0;
let jumping_timer = 0;
let jumpingStatus = false;
let crushedStatus = false; 

let timer = 0;
let score = 0;
let life = 3;
let lifeTimer = 1000;

 
function runAnimation() {
  // initialize
  // js기본 라이브러리 requestAnimationFrame사용. - 알아서 1초에 60번 함수를 호출하도록 함.
  animation = requestAnimationFrame(runAnimation);
  timer++;
  redrawCanvas();

  // score update
  if (timer % 100 === 0) {
    // score
    setScore();
  }
  lifeTimer--;

  // character update
  if (timer % rand(veloc - 100, veloc + 150) === 0) {
    let fireball = new GameObj(500, 200, 50, 50, fireballImgArr);
    fireballArr.push(fireball);
  }
  fireballArr.forEach((fireball, index, arr) => {
    if (fireball.x < 0) arr.splice(index, 1); // fireball 사라짐
    fireball.x -= fireballSpeed;
    isCrashed(man, fireball);
    // TODO: edit fireball Img number
    fireball.draw(0);
  });

  // Event Checking
  if (jumpingStatus) {
    man.y -= 6;
    jumping_timer++;
  } else {
    if (man.y < maxJumpHeight) man.y += 3;
    else if (man.y >= maxJumpHeight) jumping_timer = 0;
  }
  if (jumping_timer > 25) jumpingStatus = false;
  if (timer % 10 === 0) nowFrameNum++;

  if (ctx) {
    man.draw(nowFrameNum%10);
    dino.draw(0);
  }
}
runAnimation();


// Score
function setScore() {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    score += veloc;
    scoreElement.textContent = String(score);
  }
}

// Life
function setLife(mount: number) {
  const lifeElement = document.getElementById("life");
  if (lifeElement && lifeTimer <= 0) {
    life -= mount;
    lifeElement.innerText = String(life);
    lifeTimer = 1000;
  }
}
    


// Event
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jumpingStatus = true;
  }
});

document.getElementById("restart")!!.addEventListener("click", function (e) {
  location.reload();
});
