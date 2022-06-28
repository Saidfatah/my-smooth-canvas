// Dependencies
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle
} from "react";
import { drawRectangle, clearCanvasArea } from "./canvasUtils";
import {
  WIDTH,
  HEIGHT,
  requestAnimationFrame,
  cancelAnimationFrame
} from "./constants";
import { calcSpeed, snapToGrid } from "./draggingUtils";
import { lerp, easeInOut } from "./utils";
import {
  MIN_SPEED_THRESHEHOLD,
  ANIMATIONS_TYPES,
  CANVAS_MODES_ENUM,
  shapes,
  timelineAnimations,
  timeStamps
} from "./constants";
//import mergeRefs from "merge-refs";

// steps
// 1 - [Building timline bar] (should be built using html and react usestate a,d ref) use native elemnt and style it
//     - https://www.w3schools.com/howto/howto_js_rangeslider.asp
//     - bar with time stamps , use interval of 10 secons [......*...|..........|..........|..........]
//     - time indecators are going to be below [MAYBE_LATER]
//     - current time stamp indecator (acts as a slider)
//       - listen to mouse
//     - update current timestamp when moving time stamp indecator

const ComposingPlayGround = forwardRef(
  (
    {
      canvasMode,
      sceneLength,
      currentTimeStamp,
      setComposingPlayGroundRef,
      setSceneLength,
      setCanvasMode,
      timeIndicatorTimeStamp
    },
    ref
  ) => {
    const canvasRef = useRef(false);
    const canDragShapes = useRef(false);

    const firstRender = useRef(true);
    const mouseStartPosition = useRef({ y: 0, x: 0 });

    const onMouseDown = useCallback(
      (offsetX, offsetY) => (e) => {
        console.log({ canvasMode });
        if (canvasMode !== CANVAS_MODES_ENUM.COMPOSING) return;
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
          if (
            mx > r.x &&
            mx < r.x + r.width &&
            my > r.y &&
            my < r.y + r.height
          ) {
            // if yes, set that rects isDragging=true
            canDragShapes.current = true;
            r.isDragging = true;
          }
        }
        // save the current mouse position
        mouseStartPosition.current = { x: mx, y: my };
      },
      [canvasMode]
    );

    const onMouseUp = useCallback(
      (e) => {
        if (canvasMode !== CANVAS_MODES_ENUM.COMPOSING) return;
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // clear all the dragging flags
        canDragShapes.current = false;
        for (var i = 0; i < shapes.length; i++) {
          shapes[i].isDragging = false;
        }
      },
      [canvasMode]
    );
    const onMouseMove = useCallback(
      (ctx, offsetX, offsetY) => (e) => {
        if (canvasMode !== CANVAS_MODES_ENUM.COMPOSING) return;
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
      },
      [canvasMode]
    );

    useEffect(() => {
      if (canvasRef && canvasRef.current) {
        var ctx = canvasRef.current.getContext("2d");
        if (firstRender.current === true) {
          refreshCanvasScene(ctx);
          firstRender.current = false;
        }
      }
    }, []);

    useEffect(() => {
      if (canvasRef && !canvasRef.current) {
        var ctx = canvasRef.current.getContext("2d");

        var BB = canvasRef.current.getBoundingClientRect();
        var offsetX = BB.left;
        var offsetY = BB.top;

        canvasRef.current.onmousedown = onMouseDown(offsetX, offsetY);
        canvasRef.current.onmousemove = onMouseMove(ctx, offsetX, offsetY);
        canvasRef.current.onmouseup = onMouseUp;
      }
    }, [onMouseDown, onMouseMove, onMouseUp]);
    useImperativeHandle(ref, () => ({
      executeAnimationFrame(timestamp, ctx) {
        executeAnimationFrame(timestamp, ctx);
      }
    }));

    const executeAnimationFrame = (timestamp, ctx) => {
      const targetAnimation =
        timelineAnimations[currentTimeStamp.current.animationId];
      const targetShape = shapes.filter(
        (shape) => shape.id === targetAnimation.shapeId
      )[0];

      if (targetShape) {
        const type = targetAnimation.type;
        if (
          type === ANIMATIONS_TYPES.moveX ||
          type === ANIMATIONS_TYPES.moveY
        ) {
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
            if (type === ANIMATIONS_TYPES.moveX)
              targetShape.x = calculatedValue;
            if (type === ANIMATIONS_TYPES.moveY)
              targetShape.y = calculatedValue;
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
    const recordFrameState = () => {
      // check for shapes that have changed their state
      // position
    };

    return (
      <canvas
        ref={(elem) => {
          canvasRef.current = elem;
          setComposingPlayGroundRef(elem);
        }}
        id="canvas"
        width={WIDTH}
        height={HEIGHT}
        style={{ background: "transparent", marginTop: -HEIGHT, zIndex: 99 }}
      ></canvas>
    );
  }
);

export default ComposingPlayGround;
