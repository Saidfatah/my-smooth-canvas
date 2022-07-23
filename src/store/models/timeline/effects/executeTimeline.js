import { CANVAS_MODES_ENUM } from "../../../../utils/constants";

export default (dispatch,_, state) => {
    const { currentTimeStamp, timelineLength, previousRequestAnimationID,requestAnimationFrameLastTimeStamp,previousRequestAnimationFrameEndDate } =
      state.timeline;
    const { currentCanvasMode } = state.canvasMode;

    let firstTimeCalled = false;
    if (typeof previousRequestAnimationID !== "undefined"){
      cancelAnimationFrame(previousRequestAnimationID);
    }
  
  const timeElapsedSinceLastActiveFrame =performance.now() - previousRequestAnimationFrameEndDate
    function step(_timestamp) {
      let timestamp = _timestamp - 1000 - requestAnimationFrameLastTimeStamp + timeElapsedSinceLastActiveFrame ;

      if (!firstTimeCalled) {
        timestamp += currentTimeStamp;
        firstTimeCalled = true;
      }
      dispatch.timeline.executeAnimationForTimestamp({
        timestamp: timestamp,
      });

      dispatch.timeline.UPDATE_REQUEST_ANIMATION_FRAME_LAST_TIMESTAMP( timestamp);

      // send requestAnimationID with the dispatched effect and  cancelAnimationFrame(requestAnimationID) when all time stamps are done
      if (
        timestamp < timelineLength &&
        currentCanvasMode === CANVAS_MODES_ENUM.PLAYING
      )
        requestAnimationFrame(step);
        else dispatch.timeline.UPDATE_PREVIOUS_REQUEST_ANIMATION_END_DATE( performance.now() )
      if (currentCanvasMode !== CANVAS_MODES_ENUM.PLAYING) {
        cancelAnimationFrame(previousRequestAnimationID);
      }
    }
    const requestAnimationID = requestAnimationFrame(step);
    dispatch.timeline.UPDATE_PREVIOUS_REQUEST_ANIMATION_ID(requestAnimationID);
  }