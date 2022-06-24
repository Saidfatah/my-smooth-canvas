// Dependencies
import React, { useEffect, useRef } from "react";
import { ONE_SECOND_WIDTH } from "./constants";

const SECOND_MARK_HEIGHT = 15;
const MILL_SECOND_MARK_HEIGHT = 20;
const Timeline = () => {
  const timeLineCanvasRef = useRef();

  useEffect(() => {
    if (!timeLineCanvasRef.current) return;
    var ctx = timeLineCanvasRef.current.getContext("2d");
    // draw time anchor  |0s  |1s  |2s  |3s
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
  }, []);
  // draw timline sconds and millseconds
  // create current time-stamp-indecator
  // - move current time-stamp-indecator
  // - - use layers to refresh canvas with new values

  return (
    <div
      style={{
        bottom: 12,
        width: window.innerWidth - 8
      }}
      className="p-2 bg-transparent h-12 left-0 absolute overflow-auto"
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
