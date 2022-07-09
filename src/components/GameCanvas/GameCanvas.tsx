import styled from "@emotion/styled";
import React, { RefObject, useEffect, useMemo, useRef } from "react";
import useCanvas from "../../hooks/useCanvas";
import useClientWidthHeight from "../../hooks/useClientWidthHeight";

// Const final variables
const imagePath = '../../../public/image';

const manInitLocX = 10;
const manInitLocY = 200;
const manInitSizeW = 100;
const manInitSizeH = 75;

const dinoInitLocX =500;
const dinoInitLocY = 125;
const dinoInitSizeW = 180;
const dinoInitSizeH = 150;


// Variables
let nowFrameNum = 0;
let timer = 0;
let veloc = 170

// types
type CanvasSizeProps = {
  canvasWidth: number;
  canvasHeight: number;
}

// Game Objects ==================
// Character
class GameObj {
  // size
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  imgArr:any[] = [];

  // image
  draw(ctx: CanvasRenderingContext2D) {
    let curImage = this.imgArr[nowFrameNum % this.imgArr.length];
    curImage.onload = () => {
      console.log("TEST : ", curImage);
      console.log("TEST2 : ", this.x);
      console.log("TEST3 : ", this.y);
      console.log("TEST4 : ", this.width);
      console.log("TEST5 : ", this.height);
      ctx.drawImage(curImage, this.x, this.y, this.width, this.height);
    }
  };

  constructor(x:number, y:number, width:number, height:number, imgArr:any[]) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imgArr = imgArr;
  }
}

// Main ======================================================
const GameCanvas: React.FC<CanvasSizeProps> = ({canvasWidth, canvasHeight}) => {
  // Variables
  let manImgArr: HTMLElement[] = []
  let dinoImgArr: HTMLElement[] = [];
  let firebalImgArr: HTMLElement[] = [];

  // set Canvas
  const redrawCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
  const {canvas, ctx, canvasRef} = useCanvas(canvasWidth, canvasHeight, redrawCanvas);


  // main initilaize funciton
  useEffect(() => {
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
      firebalImgArr.push(image);
    }
    runAnimation();

  }, []);

  const Man = new GameObj(manInitLocX, manInitLocY, manInitSizeW, manInitSizeH,  manImgArr);
  const Dino = new GameObj(dinoInitLocX, dinoInitLocY, dinoInitSizeW, dinoInitSizeH,  dinoImgArr);
  const fireballArr = [];
  // const fireball = new GameObj(500, 200, 50, 50, firebalImgArr);

  let animation;

  function runAnimation() {
    animation = requestAnimationFrame(runAnimation);
    timer++;


    if (timer % 10 === 0) nowFrameNum++;

    if (ctx) {
      Man.draw(ctx);
      Dino.draw(ctx);
    }

  }
  // runAnimation();

  return (
    <Canvas ref={canvasRef}></Canvas>
    );
}

// Styles ======================================================
const Canvas = styled.canvas`
  width: 100%;
  background-color: whitesmoke;
`;

export default GameCanvas;
