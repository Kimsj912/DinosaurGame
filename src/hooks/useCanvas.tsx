import { RefObject, useRef, useEffect } from "react";


const useCanvas = (canvasWidth:number, canvasHeight:number, animate:(ctx:CanvasRenderingContext2D)=>void) => {
    const canvasRef:RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

    let canvas = canvasRef.current;
    let ctx = canvas?.getContext("2d");

    useEffect(() => {
      canvas = canvasRef.current;
      ctx = canvas?.getContext('2d');
  
      const setCanvas = () => {
        // 고해상도 대응을 위한 스케일 설정
        const devicePixelRatio = window.devicePixelRatio ?? 1;
        if (canvas && ctx) {
          canvas.style.width = canvasWidth + 'px';
          canvas.style.height = canvasHeight + 'px';
  
          canvas.width = canvasWidth * devicePixelRatio;
          canvas.height = canvasHeight * devicePixelRatio;
  
          ctx.scale(devicePixelRatio, devicePixelRatio);
        }
      };
        setCanvas();
    }, [canvasHeight, canvasWidth]);
  
    return { canvas, ctx, canvasRef};
}

export default useCanvas;
