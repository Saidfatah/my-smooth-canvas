// Dependencies
import React, { useRef, useState } from "react";
import { CANVAS_MODES_ENUM, SCENE_LENGTH } from "../utils/constants";
import Timeline from "./Timeline";
import Background from "./Background";
import ComposingPlayGround from "./ComposingPlayGround";
import CanvasModesBar from "./CanvasModesBar";
// Styles
import "../tailwind.output.css";
import { Provider } from "react-redux";
import store from "../store/store.index";
import TimeLineExecuter from "./TimeLineExecuter";

const App = () => {
  const [sceneLength, setSceneLength] = useState(SCENE_LENGTH);
  const [canvasMode, setCanvasMode] = useState(CANVAS_MODES_ENUM.IDLE);
  const timeIndicatorTimeStamp = useRef(undefined);
  const timeLineCanvasRef = useRef();
  const composingPlayGroundRef = useRef();

  // have play here
  const showTimeLine =
    canvasMode === CANVAS_MODES_ENUM.COMPOSING ||
    canvasMode === CANVAS_MODES_ENUM.PLAYING;
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-500 relative">
       
        <CanvasModesBar {...{ setCanvasMode, canvasMode }} />
        {showTimeLine && (
          <Timeline
            key="timeline"
            {...{
              sceneLength,
              setSceneLength,
              setCanvasMode,
              setTimeLineCanvasRef: (ref) => {
                timeLineCanvasRef.current = ref;
              },
              canvasMode,
              timeIndicatorTimeStamp,
            }}
          />
        )}
        <Background />
        <ComposingPlayGround
          {...{
            sceneLength,
            setSceneLength,
            setCanvasMode,
            setComposingPlayGroundRef: (ref) => {
              composingPlayGroundRef.current = ref;
            },
            timeIndicatorTimeStamp,
          }}
        />
         <TimeLineExecuter
          {...{ canvasMode, composingPlayGroundRef, timeLineCanvasRef }}
        />
      </div>
    </Provider>
  );
};


export default App;
