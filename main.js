var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width =window.innerWidth -100;
canvas.height =window.innerHeight -100;
// 여기까지가 기본 canvas를 사용하기 위한 환경을 마련한것.

// object자료로 등장 캐릭터의 속성을 미리 정의
var dino = {
    // 공룡 등장 위치
    x:10, 
    y:200,
    // 공룡 폭과 높이
    width : 50,
    height : 50,

    // 공룡 등장마다 호출할 method
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 장애물은 데미지량, 사이즈등이 다를 뿐 기능은 비슷한 종류의 object가 많음.
// 이럴경우 class를 만들면 유리하다.
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
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 동작 부분
// 애니메이션은 1초에 60번정도 w,h가 변화하도록 하면 됨.
var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusArr = [];
function runByFrame(){
    // js기본 라이브러리 requestAnimationFrame사용. 
    // 사용하면 알아서 1초에 60번 함수를 호출하도록 함.
    requestAnimationFrame(runByFrame)
    timer++;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    //게임세상은 프레임으로 진행됨. -> timer이용
    if(timer%120===0){
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }

    cactusArr.forEach((a)=>{
        a.x--;
        a.draw();
    })

    dino.draw();
}
runByFrame();