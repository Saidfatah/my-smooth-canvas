// Dependencies
import React, { useEffect, useRef } from "react";
import { drawGrid, createGradiantBackground } from "../utils/canvasUtils";
import { WIDTH, HEIGHT } from "../utils/constants";


const Background = () => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current === true && backgroundCanvasRef.current) {
      var ctx= backgroundCanvasRef.current.getContext("2d");
      if(ctx){
        ctx.moveTo(0, 0);
        createGradiantBackground(ctx, WIDTH, HEIGHT);
        drawGrid(ctx);
      }
      firstRender.current = false;
    }
  }, []);

  return (
    <canvas
      ref={backgroundCanvasRef}
      id="canvas"
      width={WIDTH}
      height={HEIGHT}
      style={{ background: "#fff", zIndex: -1 }}
    ></canvas>
  );
};

export default Background;
