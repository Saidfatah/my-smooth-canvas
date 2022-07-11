// Dependencies
import React, { useCallback, useEffect, useRef } from "react";
import { drawRectangle, clearCanvasArea } from "../utils/canvasUtils";
import { WIDTH, HEIGHT } from "../utils/constants";
import { calcSpeed, snapToGrid } from "../utils/draggingUtils";

import { MIN_SPEED_THRESHEHOLD, CANVAS_MODES_ENUM } from "../utils/constants";
import { connect } from "react-redux";

const ComposingPlayGround = ({
  canvasMode,
  setComposingPlayGroundRef,
  shapes,
}) => {
  const canvasContext = useRef(undefined);
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
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
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
        const { x: mouseStartXPosition, y: mouseStartYPosition } =
          mouseStartPosition.current;
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
    if (canvasRef.current && canvasContext.current) {
      refreshCanvasScene(canvasContext.current, shapes);
    }
  }, [shapes]);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      var ctx = canvasRef.current.getContext("2d");
      canvasContext.current = ctx;
      if (firstRender.current === true) {
        refreshCanvasScene(ctx,shapes);
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

  const refreshCanvasScene =   (ctx,_shapes) => {
      if (!ctx) return;
      clearCanvasArea(ctx, WIDTH, HEIGHT);

      ctx.fillStyle = "transparent";
      // redraw each rect in the rects[] array
      for (var i = 0; i < _shapes.length; i++) {
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
};

export default connect((state) => ({ shapes: state.timeline.shapes }))(
  ComposingPlayGround
);
