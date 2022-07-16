import React from 'react'
import { useCallback } from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { CANVAS_MODES_ENUM } from "../utils/constants";

const TimeLineExecuter = (({ canvasMode, executeAnimationForTimestamp,timelineLength,currentTimeStamp }) => {
    // useEffect(() => {
    //   if (canvasMode === CANVAS_MODES_ENUM.PLAYING) {
    //     exectueTimeline();
    //   }
    // }, [canvasMode]);
  
    // // const exectueTimeline = useCallback(
    //   () => {
 
    //     var requestAnimationID;
    //     console.log({canvasMode})
    //     function step(_timestamp) {
    //       const timestamp = _timestamp - 1000;
    //       executeAnimationForTimestamp({
    //         timestampValue: timestamp,
    //         requestAnimationID,
    //         handleRefreshCallback: undefined,
    //       });
          
    //       // send requestAnimationID with the dispatched effect and  cancelAnimationFrame(requestAnimationID) when all time stamps are done
    //       if(timestamp < timelineLength && canvasMode === CANVAS_MODES_ENUM.PLAYING ) requestAnimationFrame(step)
    //       if(canvasMode !== CANVAS_MODES_ENUM.PLAYING){ 
           
    //         cancelAnimationFrame(requestAnimationID)
    //       }
    //     }
    //     requestAnimationID = requestAnimationFrame(step);
    //   },
    //   [timelineLength,canvasMode],
    // )
    // ;
  
    return <div></div>;
  });


  export default connect(
    state=>({
      timelineLength:state.timeline.timelineLength,
      currentTimeStamp:state.timeline.currentTimeStamp,
    }),
     (dispatch) => ({
    executeAnimationForTimestamp: dispatch.timeline.executeAnimationForTimestamp,
  }))(TimeLineExecuter)