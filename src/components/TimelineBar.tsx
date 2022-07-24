// Dependencies
import React, { useEffect, useRef } from "react";
import {
  ONE_SECOND_WIDTH,
} from "../utils/constants";
import { clearCanvasArea } from "../utils/canvasUtils";
import { shoudPoseBeSnapped, newSnapedPosition } from "../utils/draggingUtils";
import { connect } from "react-redux";
import { CANVAS_MODES } from "../utils/types";

const SECOND_MARK_HEIGHT = 15;
const MILL_SECOND_MARK_HEIGHT = 20;

interface TimelineBarProps{
  timeIndicatorTimeStamp:any,
  executeAnimationForTimestamp:any,
  currentTimeStamp:any,
}
const TimelineBar = ({
  timeIndicatorTimeStamp,
  executeAnimationForTimestamp,
  currentTimeStamp,
}:TimelineBarProps) => {
  const timeLineCanvasLocalRef = useRef<HTMLCanvasElement>(null);
  const timeLineScrollAbleParentRef = useRef<HTMLDivElement>(null);
  const timeSTampIndecatorLastPosition = useRef({ x: 0, y: 5 });
  const canDragTimeINdecator = useRef(false);
  const mouseStartPosition = useRef({ y: 0, x: 0 });

  useEffect(() => {
    if (!timeLineCanvasLocalRef.current) return;
    var ctx = timeLineCanvasLocalRef.current.getContext("2d");
    
    
    if(ctx !== null){
      drawTimelineMarks(ctx);
      drawCurrentTimeStampIndecator(
        ctx,
        timeSTampIndecatorLastPosition.current.x,
        timeSTampIndecatorLastPosition.current.y
      );
    }

    var BB = timeLineCanvasLocalRef.current.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;

    const onMouseDown = (e:MouseEvent) => {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();
      if (typeof timeSTampIndecatorLastPosition.current == "undefined") return;
      // get the current mouse position
      var mx = parseInt((e.clientX - offsetX).toString(), 10);
      var my = parseInt((e.clientY - offsetY).toString(), 10);

      canDragTimeINdecator.current = true;
      mouseStartPosition.current = { x: mx, y: my };
    };

    const onMouseUp = (e:MouseEvent) => {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      if (
        canDragTimeINdecator.current &&
        canDragTimeINdecator.current === true && 
        timeLineScrollAbleParentRef.current !== null
      ) {
        // get the current mouse position
        const scrollOffset = parseInt(
          (timeLineScrollAbleParentRef.current.scrollLeft).toString()
        );
        let mx = parseInt((e.clientX - offsetX).toString(), 10) + scrollOffset;
        var my = parseInt((e.clientY - offsetY).toString(), 10);

        if (shoudPoseBeSnapped(mx, ONE_SECOND_WIDTH / 10))
          mx = newSnapedPosition(mx, ONE_SECOND_WIDTH / 10);
        //mx = snapToGrid(r, prevPose);

        if(ctx !== null){
          clearCanvasArea(ctx, ONE_SECOND_WIDTH * 60, 50);
          drawCurrentTimeStampIndecator(ctx, mx, 5);
          drawTimelineMarks(ctx);
        }
        
        // reset the starting mouse position for the next mousemove
        mouseStartPosition.current = { x: mx, y: my };
        const selectedTimeStamp = getTimeIndicatorTimeStamp(mx);
        timeIndicatorTimeStamp.current = selectedTimeStamp;
      }
      // clear all the dragging flags
      canDragTimeINdecator.current = false;
    };
    const onMouseMove = (e:MouseEvent) => {
      // if we're dragging anything...
      e.preventDefault();
      e.stopPropagation();

      if (
        canDragTimeINdecator.current &&
        canDragTimeINdecator.current === true
        && timeLineScrollAbleParentRef.current !== null
      ) {
        // get the current mouse position
        const scrollOffset = parseInt(
          (timeLineScrollAbleParentRef.current.scrollLeft).toString()
        );
        let mx = parseInt((e.clientX - offsetX).toString(), 10) - 5 + scrollOffset;
        var my = parseInt((e.clientY - offsetY).toString(), 10);
        
        if(ctx !== null){
          clearCanvasArea(ctx, ONE_SECOND_WIDTH * 60, 50);
          drawCurrentTimeStampIndecator(ctx, mx, 5);
          drawTimelineMarks(ctx);
        }

        // escute animation at specific time stamp
        executeAnimationForTimestamp({
          timestamp: getTimeIndicatorTimeStamp(mx)
        });

        // reset the starting mouse position for the next mousemove
        mouseStartPosition.current = { x: mx, y: my };
        timeSTampIndecatorLastPosition.current = {
          ...timeSTampIndecatorLastPosition.current,
          x: mx,
        };
      }
    };

    timeLineCanvasLocalRef.current.onmousedown = onMouseDown;
    timeLineCanvasLocalRef.current.onmousemove = onMouseMove;
    timeLineCanvasLocalRef.current.onmouseup = onMouseUp;
  }, []);

  useEffect(() => {
    if (!timeLineCanvasLocalRef.current) return;
    var ctx = timeLineCanvasLocalRef.current.getContext("2d");

    if(ctx === null) return 
    clearCanvasArea(ctx, ONE_SECOND_WIDTH * 60, 50);
    drawCurrentTimeStampIndecator(
      ctx,
      (currentTimeStamp / 1000) * ONE_SECOND_WIDTH,
      5
    );
    drawTimelineMarks(ctx);
  }, [currentTimeStamp]);

  const drawTimelineMarks = (ctx:CanvasRenderingContext2D) => {
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    for (let i = 0; i < 60; i++) {
      // draw seconds marks
      ctx.beginPath();
      const second_x = ONE_SECOND_WIDTH * i;
      ctx.moveTo(second_x, 25);
      ctx.lineTo(second_x, SECOND_MARK_HEIGHT);
      ctx.stroke();
      // draw millseconds marks
      for (let i = 0; i < 10; i++) {
        const mill_second_x = second_x + i * (ONE_SECOND_WIDTH / 10);
        ctx.beginPath();
        ctx.moveTo(mill_second_x, 25);
        ctx.lineTo(mill_second_x, MILL_SECOND_MARK_HEIGHT);
        ctx.stroke();
      }
      ctx.fillText(i + "s", second_x, SECOND_MARK_HEIGHT);
    }
  };
  const drawCurrentTimeStampIndecator = (ctx:CanvasRenderingContext2D, xOffset:number, yOffset:number) => {
    // the triangle
    const length = 5;
    ctx.beginPath();
    ctx.moveTo(xOffset + length, yOffset);
    ctx.lineTo(xOffset + length * 3, yOffset);
    ctx.lineTo(xOffset + length * 3, yOffset + length * 3);
    ctx.lineTo(xOffset + length * 2, yOffset + length * 4);
    ctx.lineTo(xOffset + length, yOffset + length * 3);
    ctx.closePath();

    // the outline

    ctx.strokeStyle = "white";
    ctx.stroke();

    // the fill color
    ctx.fillStyle = "red";
    ctx.fill();
  };

  const getTimeIndicatorTimeStamp = (timeStampX:number) =>
    (timeStampX / ONE_SECOND_WIDTH) * 1000;

  return (
    <div
      ref={timeLineScrollAbleParentRef}
      style={{
        bottom: 12,
        width: window.innerWidth - 8,
      }}
      className="p-2 blur-lg bg-transparent h-12 left-0 absolute overflow-auto"
    >
      <canvas
        ref={timeLineCanvasLocalRef}
        id="canvas"
        width={ONE_SECOND_WIDTH * 60}
        height={50}
        style={{ background: "transparent", zIndex: -1 }}
      ></canvas>
    </div>
  );
};

interface TimelineBarConditionalRenderPROPS{
  currentCanvasMode:any,
  timeIndicatorTimeStamp:any,
  executeAnimationForTimestamp:any,
  currentTimeStamp:any,
}
const TimelineBarConditionalRender = ({
  currentCanvasMode,
  timeIndicatorTimeStamp,
  executeAnimationForTimestamp,
  currentTimeStamp,
}:TimelineBarConditionalRenderPROPS) => {
  if (
    currentCanvasMode === CANVAS_MODES.COMPOSING ||
    currentCanvasMode === CANVAS_MODES.PLAYING
  )
    return (
      <TimelineBar
        {...{
          timeIndicatorTimeStamp,
          executeAnimationForTimestamp,
          currentTimeStamp,
        }}
      />
    );
  return null;
};
export default connect(
  (state:any) => ({
    currentTimeStamp: state.timeline.currentTimeStamp,
    currentCanvasMode: state.canvasMode.currentCanvasMode,
  }),
  (dispatch) => ({
    executeAnimationForTimestamp:
      dispatch.timeline.executeAnimationForTimestamp,
  })
)(TimelineBarConditionalRender);
