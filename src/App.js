// Dependencies
import React, { useEffect, useRef } from "react";
import { drawRectangle, clearCanvasArea } from "./utils";
import { WIDTH, HEIGHT } from "./constants";
import { Shape, animation } from "./schemas";
import { calcSpeed, snapToGrid } from "./draggingUtils";
import { MIN_SPEED_THRESHEHOLD, ANIMATIONS_TYPES } from "./constants";
import Timeline from "./Timeline";
import Background from "./Background";
// Styles
import "./tailwind.output.css";

const shapes = [Shape({ x: 100, y: 100, height: 30, width: 30 })];

const timelineAnimations = {
  FIRST_ANIMATION_ID: animation({
    type: ANIMATIONS_TYPES.moveX,
    value: 200,
    prevValue: 100,
    duration: 1000,
    shapeId: shapes[0].id
  }),
  FIRST_ANIMATION_ID_2: animation({
    type: ANIMATIONS_TYPES.moveY,
    value: 200,
    prevValue: 100,
    duration: 1000,
    shapeId: shapes[0].id
  }),
  FIRST_ANIMATION_ID_3: animation({
    type: ANIMATIONS_TYPES.moveX,
    value: 100,
    prevValue: 200,
    duration: 1000,
    shapeId: shapes[0].id
  }),
  FIRST_ANIMATION_ID_4: animation({
    type: ANIMATIONS_TYPES.moveY,
    value: 100,
    prevValue: 200,
    duration: 1000,
    shapeId: shapes[0].id
  })
};
// these should ordered from the first to the last one
const timeStamps = [
  { time: 3000, animationId: "FIRST_ANIMATION_ID" },
  { time: 4000, animationId: "FIRST_ANIMATION_ID_2" },
  { time: 5000, animationId: "FIRST_ANIMATION_ID_3" },
  { time: 6000, animationId: "FIRST_ANIMATION_ID_4" }
];

var requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const SCENE_LENGTH = 12 * 1000;

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// we're going  to have an array of animations

//modes : composing | idle | playing

// steps
// 1 - [Building timline bar] (should be built using html and react usestate a,d ref) use native elemnt and style it
//     - https://www.w3schools.com/howto/howto_js_rangeslider.asp
//     - bar with time stamps , use interval of 10 secons [......*...|..........|..........|..........]
//     - time indecators are going to be below [MAYBE_LATER]
//     - current time stamp indecator (acts as a slider)
//       - listen to mouse
//     - update current timestamp when moving time stamp indecator

const App = () => {
  const canvasRef = useRef();
  const canDragShapes = useRef(false);
  const currentTimeStamp = useRef(undefined);
  const firstRender = useRef(true);
  const mouseStartPosition = useRef({ y: 0, x: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    var ctx = canvasRef.current.getContext("2d");

    var BB = canvasRef.current.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;
    if (firstRender.current === true) {
      refreshCanvasScene(ctx);
      firstRender.current = false;
    }

    exectueTimeline(ctx);
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
      mouseStartPosition.current = { x: mx, y: my };
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
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX, 10);
        var my = parseInt(e.clientY - offsetY, 10);

        // calculate the distance the mouse has moved
        // since the last mousemove
        const {
          x: mouseStartXPosition,
          y: mouseStartYPosition
        } = mouseStartPosition.current;
        let dx = mx - mouseStartXPosition;
        let dy = my - mouseStartYPosition;

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < shapes.length; i++) {
          var r = shapes[i];
          if (r.isDragging) {
            const prevPose = { x: r.x, y: r.y };
            r.x += dx;
            r.y += dy;

            // calculate mouse speed
            const { xSpeed, ySpeed } = calcSpeed(dx, dy);
            // handle snapping xposition to the vertical grid
            if (
              xSpeed < MIN_SPEED_THRESHEHOLD ||
              ySpeed < MIN_SPEED_THRESHEHOLD
            )
              snapToGrid(r, prevPose);
          }
        }

        // redraw the scene with the new rect positions
        refreshCanvasScene(ctx, WIDTH, HEIGHT);

        // reset the starting mouse position for the next mousemove
        mouseStartPosition.current = { x: mx, y: my };
      }
    };

    canvasRef.current.onmousedown = onMouseDown;
    canvasRef.current.onmousemove = onMouseMove;
    canvasRef.current.onmouseup = onMouseUp;
  }, []);

  const exectueTimeline = (ctx) => {
    var myReq;
    currentTimeStamp.current = timeStamps.shift();
    function step(timestamp) {
      if (!currentTimeStamp.current) return cancelAnimationFrame(myReq);
      if (currentTimeStamp && timestamp > currentTimeStamp.current.time)
        executeAnimationFrame(timestamp, ctx);

      if (timestamp / 1000 < SCENE_LENGTH / 1000)
        myReq = requestAnimationFrame(step);
      else cancelAnimationFrame(myReq);
    }
    myReq = requestAnimationFrame(step);
  };

  const executeAnimationFrame = (timestamp, ctx) => {
    const targetAnimation =
      timelineAnimations[currentTimeStamp.current.animationId];
    const targetShape = shapes.filter(
      (shape) => shape.id === targetAnimation.shapeId
    )[0];

    if (targetShape) {
      const type = targetAnimation.type;
      if (type === ANIMATIONS_TYPES.moveX || type === ANIMATIONS_TYPES.moveY) {
        const value = targetAnimation.value;
        const prevValue = targetAnimation.prevValue;
        const duration = targetAnimation.duration;
        const elapsedTimeSinceAnimationStart =
          timestamp - currentTimeStamp.current.time;

        let calculatedValue;

        calculatedValue = lerp(
          prevValue,
          value,
          easeInOut(elapsedTimeSinceAnimationStart / duration)
        );

        const hasntFinishedYet =
          prevValue > value
            ? calculatedValue >= value
            : calculatedValue <= value;
        if (hasntFinishedYet) {
          if (type === ANIMATIONS_TYPES.moveX) targetShape.x = calculatedValue;
          if (type === ANIMATIONS_TYPES.moveY) targetShape.y = calculatedValue;
        } else {
          // reset currentTimeStamp to the next animation
          currentTimeStamp.current = timeStamps.shift();
        }
      }

      refreshCanvasScene(ctx);
    }
  };
  function refreshCanvasScene(ctx) {
    if (!ctx) return;
    clearCanvasArea(ctx, WIDTH, HEIGHT);

    ctx.fillStyle = "transparent";
    drawRectangle(ctx, 0, 0);
    // redraw each rect in the rects[] array
    for (var i = 0; i < shapes.length; i++) {
      var r = shapes[i];
      ctx.fillStyle = r.fill;
      drawRectangle(ctx, r.x, r.y, r.width, r.height);
    }
  }

  return (
    <div className="min-h-screen bg-gray-500 relative">
      <Timeline />
      <Background />
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
