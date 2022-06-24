// Dependencies
import React, { useEffect, useRef } from "react";
import { ONE_SECOND_WIDTH } from "./constants";
import { clearCanvasArea } from "./utils";
import { shoudPoseBeSnapped, newSnapedPosition } from "./draggingUtils";

const SECOND_MARK_HEIGHT = 15;
const MILL_SECOND_MARK_HEIGHT = 20;

// draw timline sconds and millseconds
// create current time-stamp-indecator
// - move current time-stamp-indecator
// - - use layers to refresh canvas with new values

const Timeline = () => {
  const timeLineCanvasRef = useRef();
  const timeLineScrollAbleParentRef = useRef();
  const timeSTampIndecatorLastPosition = useRef({ x: 50, y: 5 });
  const canDragTimeINdecator = useRef(false);
  const mouseStartPosition = useRef({ y: 0, x: 0 });

  useEffect(() => {
    if (!timeLineCanvasRef.current) return;
    var ctx = timeLineCanvasRef.current.getContext("2d");
    // draw time anchor  |0s  |1s  |2s  |3s
    drawTimelineMarks(ctx);
    drawCurrentTimeStampIndecator(
      ctx,
      timeSTampIndecatorLastPosition.current.x,
      timeSTampIndecatorLastPosition.current.y
    );

    var BB = timeLineCanvasRef.current.getBoundingClientRect();
    var offsetX = BB.left;
    var offsetY = BB.top;

    const onMouseDown = (e) => {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();
      if (typeof timeSTampIndecatorLastPosition.current == "undefined") return;
      // get the current mouse position
      var mx = parseInt(e.clientX - offsetX, 10);
      var my = parseInt(e.clientY - offsetY, 10);

      canDragTimeINdecator.current = true;
      mouseStartPosition.current = { x: mx, y: my };
    };

    const onMouseUp = (e) => {
      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      if (
        canDragTimeINdecator.current &&
        canDragTimeINdecator.current === true
      ) {
        // get the current mouse position
        const scrollOffset = parseInt(
          timeLineScrollAbleParentRef.current.scrollLeft
        );
        let mx = parseInt(e.clientX - offsetX, 10) + scrollOffset;
        var my = parseInt(e.clientY - offsetY, 10);

        if (shoudPoseBeSnapped(mx, ONE_SECOND_WIDTH / 10)) {
          mx = newSnapedPosition(mx, ONE_SECOND_WIDTH / 10);
          //mx = snapToGrid(r, prevPose);
          clearCanvasArea(ctx, ONE_SECOND_WIDTH * 60, 50);
          drawCurrentTimeStampIndecator(ctx, mx, 5);
          drawTimelineMarks(ctx);
          // reset the starting mouse position for the next mousemove
          mouseStartPosition.current = { x: mx, y: my };
        }
      }
      // clear all the dragging flags
      canDragTimeINdecator.current = false;
    };
    const onMouseMove = (e) => {
      // if we're dragging anything...
      e.preventDefault();
      e.stopPropagation();

      if (
        canDragTimeINdecator.current &&
        canDragTimeINdecator.current === true
      ) {
        // get the current mouse position
        const scrollOffset = parseInt(
          timeLineScrollAbleParentRef.current.scrollLeft
        );
        let mx = parseInt(e.clientX - offsetX, 10) - 5 + scrollOffset;
        var my = parseInt(e.clientY - offsetY, 10);

        clearCanvasArea(ctx, ONE_SECOND_WIDTH * 60, 50);
        drawCurrentTimeStampIndecator(ctx, mx, 5);
        drawTimelineMarks(ctx);
        // reset the starting mouse position for the next mousemove
        mouseStartPosition.current = { x: mx, y: my };
        timeSTampIndecatorLastPosition.current = {
          ...timeSTampIndecatorLastPosition.current,
          x: mx
        };
      }
    };

    timeLineCanvasRef.current.onmousedown = onMouseDown;
    timeLineCanvasRef.current.onmousemove = onMouseMove;
    timeLineCanvasRef.current.onmouseup = onMouseUp;
  }, []);

  const drawTimelineMarks = (ctx) => {
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
  const drawCurrentTimeStampIndecator = (ctx, xOffset, yOffset) => {
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

  return (
    <div
      ref={timeLineScrollAbleParentRef}
      style={{
        bottom: 12,
        width: window.innerWidth - 8
      }}
      className="p-2 blur-lg bg-transparent h-12 left-0 absolute overflow-auto"
    >
      <canvas
        ref={timeLineCanvasRef}
        id="canvas"
        width={ONE_SECOND_WIDTH * 60}
        height={50}
        style={{ background: "transparent", magrin: 20, zIndex: -1 }}
      ></canvas>
    </div>
  );
};

export default Timeline;
