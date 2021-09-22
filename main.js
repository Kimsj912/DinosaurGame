// Setting
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width =700;
canvas.height =300;

// Basic Value
var veloc = 170;

// Basic Array
var imgArr = [];
for (let index = 0; index < 10; index++) {
    var imgname = `image/man${index}.png`;
    var image = new Image();
    image.src=imgname;
    imgArr.push(image);
}

// Basic Function
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function canvasInital(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'Black';
    ctx.fillRect(0,canvas.height-floor,canvas.width,floor);
}

// Object - object자료로 등장 캐릭터의 속성을 미리 정의
// Man
var nowNum=0;
var man = {
    // 공룡 등장 위치
    x:10, 
    y:200,
    // 공룡 폭과 높이
    width : 50,
    height : 75,

    // 공룡 등장마다 호출할 method
    nowNum : 0,
    draw(){
        ctx.drawImage(imgArr[nowNum%10],this.x,this.y,this.width,this.height);
    }
}

// Dragon
var dragonImg = new Image();
dragonImg.src='image/dragon.png';
var dragon = {
 // 공룡 등장 위치
    x:500, 
    y:125,
    // 공룡 폭과 높이
    width : 180,
    height : 150,

    // 공룡 등장마다 호출할 method
    nowNum : 0,
    draw(){
        ctx.drawImage(dragonImg,this.x,this.y,this.width,this.height);
    }
}

// Fireball
    // Class
    // 장애물은 데미지량, 사이즈등이 다를 뿐 기능은 비슷한 종류의 object가 많음.
    // 이럴경우 class를 만들면 유리하다.
var fireImg = new Image();
fireImg.src='image/fire.png';
class Cactus{
    constructor(){
        // 등장할 위치
        this.x=500;
        this.y=200;
        // 사이즈
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.drawImage(fireImg,this.x,this.y,this.width,this.height);
    }
}


// Running Part
    // 애니메이션은 1초에 60번정도 w,h가 변화하도록 하면 됨.
//basic
const floor = 27;
var animation;
var timer = 0;
// for cactus
var cactusArr = [];
// for man
var jump_timer =0;
var jumping =false;
// for man& cactus
var crushed = false;


function runByFrame(){
    // initialize
    // js기본 라이브러리 requestAnimationFrame사용. - 알아서 1초에 60번 함수를 호출하도록 함.
    animation = requestAnimationFrame(runByFrame)
    timer++;
    canvasInital();
    // score, life etc..
    if(timer%100===0){
        setScore();

    }

    // 장애물
    //게임세상은 프레임으로 진행됨. -> timer이용
    if(timer%rand(veloc,veloc+150)===0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }    
    cactusArr.forEach((object , index  ,arr)=>{
        if(object.x<0) arr.splice(index,1); // 지우기
        
        object.x-=3;
        isCrashed(man, object); // 모든 장애물의 충돌상태를 체크해야하기 떄문에.
        object.draw();
    })

    //  Event
    // jumping
    if(jumping){
        man.y-=6;
        jump_timer++;
    } else{
        if(man.y<200) man.y+=3;
        else if(man.y==200) jump_timer=0;
    }
    if (jump_timer >25) jumping=false;
    // change man img 
    if(timer%10===0) nowNum++;

    // draw object
    man.draw();
    dragon.draw();

}
runByFrame();

// Collision check
function isCrashed(dino, cactus){
    var xDiff = cactus.x-(dino.x+dino.width);
    var yDiff = cactus.y-(dino.y+dino.height);
    if(xDiff<=-25 && yDiff<=0){
        // test
        canvasInital();
        cancelAnimationFrame(animation);
        // crushed = true;
    }
}
// TODO: 나중에 할 것.
// var crushNum = 3;
// function setHeartBar() {
    // crushNum--;
    // document.getElementById("myLife").textContent = crushNum;
    // if(crushNum==0){
        //     canvasInital();
        //     cancelAnimationFrame(animation);
        // }
// }

// Score
var myscore = 0;
function setScore(){
    var myscore = Number(document.getElementById("score").textContent)+ veloc;
    document.getElementById("score").textContent=myscore;
}

// Event
document.addEventListener('keydown', function(e){
    if(e.code==='Space'){
        jumping=true;
    }
})

document.getElementById("restart").addEventListener('click',function(e){
    location.reload();
})

