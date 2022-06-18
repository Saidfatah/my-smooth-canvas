// Dependencies
import React, { useEffect, useRef } from "react";
import {
  Shape,
  drawRectangle,
  clearCanvasArea,
  drawGrid,
  createGradiantBackground
} from "./utils";
// Styles
import "./tailwind.output.css";

let WIDTH;
let HEIGHT = window.innerHeight;
if (typeof window !== "undefined") {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
}

const shapes = [Shape()];
const App = () => {
  const canvasRef = useRef();
  const backgroundCanvasRef = useRef();
  const canDragShapes = useRef(false);
  const firstRender = useRef(true);
  const mouseStartXPosition = useRef(0);
  const mouseStartYPosition = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    var ctx = canvasRef.current.getContext("2d");

    var BB = canvasRef.current.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;
    if (firstRender.current === true) {
      drawBackgroundCanvas();
      refreshCanvasScene(ctx);
      firstRender.current = false;
    }

    const onMouseDown = (e) => {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      var mx = parseInt(e.clientX - offsetX, 10);
      var my = parseInt(e.clientY - offsetY, 10);

      // test each rect to see if mouse is inside
      canDragShapes.current = false;
      for (var i = 0; i < shapes.length; i++) {
        var r = shapes[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
          // if yes, set that rects isDragging=true
          canDragShapes.current = true;
          r.isDragging = true;
        }
      }
      // save the current mouse position
      mouseStartXPosition.current = mx;
      mouseStartYPosition.current = my;
    };

    const onMouseUp = (e) => {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // clear all the dragging flags
      canDragShapes.current = false;
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].isDragging = false;
      }
    };
    const onMouseMove = (e) => {
      // if we're dragging anything...
      if (canDragShapes.current) {
        console.log("mouse move");
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX, 10);
        var my = parseInt(e.clientY - offsetY, 10);

        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - mouseStartXPosition.current;
        var dy = my - mouseStartYPosition.current;

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < shapes.length; i++) {
          var r = shapes[i];
          if (r.isDragging) {
            r.x += dx;
            r.y += dy;
          }
        }

        // redraw the scene with the new rect positions
        refreshCanvasScene(ctx, WIDTH, HEIGHT);

        // reset the starting mouse position for the next mousemove
        mouseStartXPosition.current = mx;
        mouseStartYPosition.current = my;
      }
    };

    canvasRef.current.onmousedown = onMouseDown;
    canvasRef.current.onmousemove = onMouseMove;
    canvasRef.current.onmouseup = onMouseUp;
  }, []);

  function refreshCanvasScene(ctx, width, height) {
    if (!ctx) return;
    clearCanvasArea(ctx, WIDTH, HEIGHT);

    ctx.fillStyle = "transparent";
    drawRectangle(ctx, 0, 0, width, height);
    // redraw each rect in the rects[] array
    for (var i = 0; i < shapes.length; i++) {
      var r = shapes[i];
      ctx.fillStyle = r.fill;
      drawRectangle(ctx, r.x, r.y, r.width, r.height);
    }
  }
  const drawBackgroundCanvas = () => {
    if (!backgroundCanvasRef.current) return;
    var ctx = backgroundCanvasRef.current.getContext("2d");
    ctx.moveTo(0, 0);
    createGradiantBackground(ctx, WIDTH, HEIGHT);
    drawGrid(ctx, 10);
  };

  return (
    <div className="min-h-screen bg-gray-500 relative">
      <canvas
        ref={backgroundCanvasRef}
        id="canvas"
        width={WIDTH}
        height={HEIGHT}
        style={{ background: "#fff", magrin: 20, zIndex: -1 }}
      ></canvas>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={WIDTH}
        height={HEIGHT}
        style={{ background: "transparent", marginTop: -HEIGHT, zIndex: 99 }}
      ></canvas>
    </div>
  );
};

export default App;
