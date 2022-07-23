// Dependencies
import React, { useCallback, useEffect, useRef } from "react";
import { clearCanvasArea, drawShape } from "../utils/canvasUtils";
import { WIDTH, HEIGHT, ANIMATIONS_TYPES } from "../utils/constants";

import { CANVAS_MODES_ENUM } from "../utils/constants";
import { connect } from "react-redux";

const ComposingPlayGround = ({
  currentCanvasMode,
  setComposingPlayGroundRef,
  shapes,
  addNewTimeStamp,
}) => {
  const _shapesLocal = useRef([...shapes]);
  const canvasContext = useRef(undefined);
  const canvasRef = useRef(false);
  const selectedShapeIndex = useRef(-1);
  const selectedShapePreviousPositionState = useRef({x:0,y:0});

  const firstRender = useRef(true);
  const mouseStartPosition = useRef({ y: 0, x: 0 });

  const onMouseDown = useCallback(
    (offsetX, offsetY) => (e) => {
      if (currentCanvasMode !== CANVAS_MODES_ENUM.COMPOSING) return;
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      var mx = parseInt(e.clientX - offsetX, 10);
      var my = parseInt(e.clientY - offsetY, 10);

      // test each rect to see if mouse is inside
      selectedShapeIndex.current = -1;
      for (var i = 0; i < _shapesLocal.current.length; i++) {
        var shape = _shapesLocal.current[i];
        if (
          mx > shape.x &&
          mx < shape.x + shape.width &&
          my > shape.y &&
          my < shape.y + shape.height
        ) {
          selectedShapeIndex.current = i;
          selectedShapePreviousPositionState.current = {
            x: shape.x,
            y: shape.y,
          };
          shape.isDragging = true;
        }
      }
      mouseStartPosition.current = { x: mx, y: my };
    },
    [currentCanvasMode]
  );

  const onMouseUp = useCallback(
    (e) => {
      if (!_shapesLocal.current.length || selectedShapeIndex.current === -1 || currentCanvasMode !== CANVAS_MODES_ENUM.COMPOSING) return;
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      _shapesLocal.current[selectedShapeIndex.current].isDragging = false;
      // here we will add a new timestamp with an animation of type moveX
      // and an other animation of type moveY
      const targetShape = _shapesLocal.current[selectedShapeIndex.current];
      addNewTimeStamp({
        shapeId: targetShape.id,
        animationConfig: {
          type: ANIMATIONS_TYPES.moveX,
          value: targetShape.x,
          previousValue : selectedShapePreviousPositionState.current.x
        },
      });
      addNewTimeStamp({
        shapeId: targetShape.id,
        animationConfig: {
          type: ANIMATIONS_TYPES.moveY,
          value: targetShape.y,
          previousValue : selectedShapePreviousPositionState.current.y
        },
      });
      selectedShapeIndex.current = -1;
    },
    [currentCanvasMode, selectedShapeIndex.current,selectedShapePreviousPositionState.current]
  );
  const onMouseMove = useCallback(
    (ctx, offsetX, offsetY) => (e) => {
      if (currentCanvasMode !== CANVAS_MODES_ENUM.COMPOSING) return;

      // if we're dragging anything...
      if (selectedShapeIndex.current !== -1) {
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

        const shape = _shapesLocal.current[selectedShapeIndex.current];
        if (shape && shape.isDragging) {
          shape.x += dx;
          shape.y += dy;
        }

        // redraw the scene with the new rect positions
        refreshCanvasScene(ctx, _shapesLocal.current);

        // reset the starting mouse position for the next mousemove
        mouseStartPosition.current = { x: mx, y: my };
      }
    },
    [currentCanvasMode]
  );

  useEffect(() => {
    if (canvasRef.current && canvasContext.current) {
      _shapesLocal.current = [...shapes];
      refreshCanvasScene(canvasContext.current, shapes);
    }
  }, [shapes]);

  useEffect(() => {
    if (canvasRef.current) {
      var ctx = canvasRef.current.getContext("2d");
      canvasContext.current = ctx;
      if (firstRender.current === true) {
        refreshCanvasScene(ctx, shapes);
        firstRender.current = false;
      }
    }
  }, []);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      var ctx = canvasRef.current.getContext("2d");

      var BB = canvasRef.current.getBoundingClientRect();
      var offsetX = BB.left;
      var offsetY = BB.top;

      canvasRef.current.onmousedown = onMouseDown(offsetX, offsetY);
      canvasRef.current.onmousemove = onMouseMove(ctx, offsetX, offsetY);
      canvasRef.current.onmouseup = onMouseUp;
    }
  }, [onMouseDown, onMouseMove, onMouseUp]);

  const refreshCanvasScene = (ctx, _shapes) => {
    if (!ctx) return;
    clearCanvasArea(ctx, WIDTH, HEIGHT);

    ctx.fillStyle = "transparent";
    // redraw each rect in the rects[] array
    for (var i = 0; i < _shapes.length; i++) {
      drawShape(ctx, _shapes[i]);
    }
  };

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

export default connect(
  (state) => ({
    shapes: state.timeline.shapes,
    currentCanvasMode: state.canvasMode.currentCanvasMode,
  }),
  (dispatch) => ({
    addNewTimeStamp: dispatch.timeline.addNewTimeStamp,
  })
)(ComposingPlayGround);
