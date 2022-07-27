// Dependencies
import React, { useEffect, useRef } from "react";

import { clearCanvasArea, drawCurrentTimeStampIndecator, drawTimelineMarks } from "../utils/canvasUtils";
import { shoudPoseBeSnapped, newSnapedPosition } from "../utils/draggingUtils";
import { connect } from "react-redux";
import { CANVAS_MODES, Omit } from "../utils/types";
import { Dispatch, RootState } from "../store/store.index";
import { ONE_SECOND_WIDTH } from "../utils/constants";



type TimelineBarProps= Omit<Props , 'currentCanvasMode' >
const TimelineBar = ({
  executeKeyframeAnimation,
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
        executeKeyframeAnimation({
          timeStamp: getTimeIndicatorTimeStamp(mx)
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

 
const TimelineBarConditionalRender = ({
  currentCanvasMode,
  executeKeyframeAnimation,
  currentTimeStamp,
}:Props ) => {
  if (
    currentCanvasMode === CANVAS_MODES.COMPOSING ||
    currentCanvasMode === CANVAS_MODES.PLAYING
  )
    return (
      <TimelineBar
        {...{
          executeKeyframeAnimation,
          currentTimeStamp,
        }}
      />
    );
  return null;
};


const mapState= (state:RootState) => ({
  currentTimeStamp: state.timeline.currentTimeStamp,
  currentCanvasMode: state.canvasMode.currentCanvasMode,
})
const mapDispatch =(dispatch:Dispatch) => ({
  executeKeyframeAnimation:
  dispatch.timeline.executeKeyframeAnimation,
})

type StateProps = ReturnType<typeof mapState>
type DispatchProps = ReturnType<typeof mapDispatch>
type Props = StateProps & DispatchProps & {currentTimeStamp:number}

export default connect(mapState,mapDispatch)(TimelineBarConditionalRender);
