import React from 'react'
import { useCallback } from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { CANVAS_MODES_ENUM } from "../utils/constants";

const TimeLineExecuter = (({ canvasMode, executeAnimationForTimestamp,timelineLength }) => {
    useEffect(() => {
      if (canvasMode === CANVAS_MODES_ENUM.PLAYING) {
        exectueTimeline();
      }
    }, [canvasMode]);
  
    const exectueTimeline = useCallback(
      () => {
 
        var requestAnimationID;
        
        function step(_timestamp) {
          const timestamp = _timestamp - 1000;
          // dispatch update timeLine indecator position
          // dispatch execute executeAnimationForTimestamp
          executeAnimationForTimestamp({
            timestampValue: timestamp,
            requestAnimationID,
            handleRefreshCallback: undefined,
          });
          
          // send requestAnimationID with the dispatched effect and  cancelAnimationFrame(requestAnimationID) when all time stamps are done
          if(timestamp < timelineLength ) requestAnimationFrame(step)
        }
        requestAnimationID = requestAnimationFrame(step);
      },
      [timelineLength],
    )
    ;
  
    return <div></div>;
  });


  export default connect(
    state=>({timelineLength:state.timeline.timelineLength}),
     (dispatch) => ({
    executeAnimationForTimestamp: dispatch.timeline.executeAnimationForTimestamp,
  }))(TimeLineExecuter)