// Dependencies
import React, { useEffect, useRef } from "react";
import { drawGrid, createGradiantBackground } from "./utils";
import { WIDTH, HEIGHT } from "./constants";
// Styles
import "./tailwind.output.css";

const Background = () => {
  const backgroundCanvasRef = useRef();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!backgroundCanvasRef.current) return;
    if (firstRender.current === true) {
      var ctx = backgroundCanvasRef.current.getContext("2d");
      ctx.moveTo(0, 0);
      createGradiantBackground(ctx, WIDTH, HEIGHT);
      drawGrid(ctx);
      firstRender.current = false;
    }
  }, []);

  return (
    <canvas
      ref={backgroundCanvasRef}
      id="canvas"
      width={WIDTH}
      height={HEIGHT}
      style={{ background: "#fff", magrin: 20, zIndex: -1 }}
    ></canvas>
  );
};

export default Background;
