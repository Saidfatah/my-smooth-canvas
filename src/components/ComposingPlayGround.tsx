// Dependencies
import React, { useCallback, useEffect, useRef } from "react";
import { clearCanvasArea, drawShape } from "../utils/canvasUtils";
import { WIDTH, HEIGHT } from "../utils/constants";
import {  ANIMATIONS_TYPES,CANVAS_MODES } from "../utils/types";

import { connect } from "react-redux";
import { shape, shapePose } from "../utils/schemas";
import { Dispatch, RootState } from "../store/store.index";

 
const ComposingPlayGround = ({
  currentCanvasMode,
  shapes,
  addNewTimeStamp,
}:Props) => {
  const _shapesLocal = useRef([...shapes.map((shape:shape)=>({...shape,isDragging:false}))]);
  const canvasContext = useRef<CanvasRenderingContext2D | null>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedShapeIndex = useRef(-1);
  const selectedShapePreviousPositionState = useRef<shapePose>();

  const firstRender = useRef(true);
  const mouseStartPosition = useRef({ y: 0, x: 0 });

  const onMouseDown = useCallback(
    (offsetX:number, offsetY:number) => (e:MouseEvent) => {
      if (currentCanvasMode !== CANVAS_MODES.COMPOSING) return;
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      
      var mx = parseInt((e.clientX - offsetX).toString(), 10);
      var my = parseInt((e.clientY - offsetY).toString(), 10);

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
    (e:MouseEvent) => {
      if (!_shapesLocal.current.length || selectedShapeIndex.current === -1 || currentCanvasMode !== CANVAS_MODES.COMPOSING) return;
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
          prevValue : selectedShapePreviousPositionState?.current?.x || 0
        },
      });
      addNewTimeStamp({
        shapeId: targetShape.id,
        animationConfig: {
          type: ANIMATIONS_TYPES.moveY,
          value: targetShape.y,
          prevValue : selectedShapePreviousPositionState?.current?.y || 0
        },
      });
      selectedShapeIndex.current = -1;
    },
    [currentCanvasMode, selectedShapeIndex.current,selectedShapePreviousPositionState.current]
  );
  const onMouseMove = useCallback(
    (ctx:CanvasRenderingContext2D | null, offsetX:number, offsetY:number) => (e:MouseEvent) => {
      if (currentCanvasMode !== CANVAS_MODES.COMPOSING ||  ctx === null) return;

      // if we're dragging anything...
      if (selectedShapeIndex.current !== -1) {
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt((e.clientX - offsetX).toString(), 10);
        var my = parseInt((e.clientY - offsetY).toString(), 10);

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
      _shapesLocal.current = [...shapes.map((shape:any)=>({...shape,isDragging:false}))];
      refreshCanvasScene(canvasContext.current, shapes);
    }
  }, [shapes]);

  useEffect(() => {
    if (canvasRef.current) {
      var ctx = canvasRef.current.getContext("2d");
      canvasContext.current = ctx;
      if (firstRender.current === true && ctx !== null) {
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

  const refreshCanvasScene = (ctx:CanvasRenderingContext2D, _shapes:any) => {
    if (!ctx) return;
    clearCanvasArea(ctx, WIDTH, HEIGHT);

    ctx.fillStyle = "transparent";
    // redraw each rect in the rects[] array
    for (var i = 0; i < _shapes.length; i++) {
      drawShape(ctx, _shapes[i]);
    }
  };


  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={WIDTH}
      height={HEIGHT}
      style={{ background: "transparent", marginTop: -HEIGHT, zIndex: 99 }}
    ></canvas>
  );
};

const mapState= (state:RootState) => ({
  shapes: state.timeline.shapes,
  currentCanvasMode: state.canvasMode.currentCanvasMode,
})
const mapDispatch =(dispatch:Dispatch) => ({
  addNewTimeStamp: dispatch.timeline.addNewTimeStamp,
})

type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps

export default connect(mapState,mapDispatch)(ComposingPlayGround);
