// Dependencies
import React, { useRef, useState, useEffect } from "react";

import { CANVAS_MODES_ENUM, SCENE_LENGTH, timeStamps } from "./constants";
import Timeline from "./Timeline";
import Background from "./Background";
import ComposingPlayGround from "./ComposingPlayGround";
import CanvasModesBar from "./CanvasModesBar";
// Styles
import "./tailwind.output.css";

// steps
// 1 - [Building timline bar] (should be built using html and react usestate a,d ref) use native elemnt and style it
//     - https://www.w3schools.com/howto/howto_js_rangeslider.asp
//     - bar with time stamps , use interval of 10 secons [......*...|..........|..........|..........]
//     - time indecators are going to be below [MAYBE_LATER]
//     - current time stamp indecator (acts as a slider)
//       - listen to mouse
//     - update current timestamp when moving time stamp indecator

const App = () => {
  const [sceneLength, setSceneLength] = useState(SCENE_LENGTH);
  const [canvasMode, setCanvasMode] = useState(CANVAS_MODES_ENUM.IDLE);
  const timeIndicatorTimeStamp = useRef(undefined);
  const timeLineCanvasRef = useRef();
  const ComposingPlayGroudComponentref = useRef();
  const timelineComponentref = useRef();
  const composingPlayGroundRef = useRef();
  const currentTimeStamp = useRef(undefined);

  useEffect(() => {
    if (canvasMode === CANVAS_MODES_ENUM.PLAYING) {
      if (!composingPlayGroundRef.current) return;
      //if (!timeLineCanvasRef.current) return;
      var ctx1 = composingPlayGroundRef.current.getContext("2d");
      var ctx2 = timeLineCanvasRef.current.getContext("2d");
      exectueTimeline(ctx1, ctx2);
    }
  }, [canvasMode]);

  const exectueTimeline = (composingPlayGroundCtx, timeLineCanvasCtx) => {
    var myReq;
    currentTimeStamp.current = timeStamps.shift();
    function step(_timestamp) {
      const timestamp=_timestamp-1000
      timelineComponentref.current.animateTimlineIndecator(
        timestamp,
        timeLineCanvasCtx
      );
      if (!currentTimeStamp.current || !ComposingPlayGroudComponentref.current)
        return cancelAnimationFrame(myReq);
      if (currentTimeStamp && timestamp > currentTimeStamp.current.time) {
        ComposingPlayGroudComponentref.current.executeAnimationFrame(timestamp,composingPlayGroundCtx);
      }

      if (timestamp / 1000 < sceneLength / 1000)
        myReq = requestAnimationFrame(step);
      else cancelAnimationFrame(myReq);
    }
    myReq = requestAnimationFrame(step);
  };

  // have play here
  const showTimeLine =
    canvasMode === CANVAS_MODES_ENUM.COMPOSING ||
    canvasMode === CANVAS_MODES_ENUM.PLAYING;
  return (
    <div className="min-h-screen bg-gray-500 relative">
      <CanvasModesBar {...{ setCanvasMode, canvasMode }} />
      {showTimeLine && (
        <Timeline
          key="timeline"
          ref={timelineComponentref}
          {...{
            sceneLength,
            setSceneLength,
            setCanvasMode,
            setTimeLineCanvasRef: (ref) => {
              timeLineCanvasRef.current = ref;
            },
            canvasMode,
            timeIndicatorTimeStamp
          }}
        />
      )}
      <Background />
      <ComposingPlayGround
        ref={ComposingPlayGroudComponentref}
        {...{
          sceneLength,
          setSceneLength,
          setCanvasMode,
          currentTimeStamp,
          setComposingPlayGroundRef: (ref) => {
            composingPlayGroundRef.current = ref;
          },
          timeIndicatorTimeStamp
        }}
      />
    </div>
  );
};

export default App;
