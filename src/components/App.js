// Dependencies
import React, { useRef, useState } from "react";
import { SCENE_LENGTH } from "../utils/constants";
import TimelineBar from "./TimelineBar";
import Background from "./Background";
import ComposingPlayGround from "./ComposingPlayGround";
import CanvasModesBar from "./CanvasModesBar";
// Styles
import "../tailwind.output.css";
import { Provider } from "react-redux";
import store from "../store/store.index";

const App = () => {
  const [sceneLength, setSceneLength] = useState(SCENE_LENGTH);
  const timeIndicatorTimeStamp = useRef(undefined);
  const timeLineCanvasRef = useRef();
  const composingPlayGroundRef = useRef();

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-500 relative">
        <CanvasModesBar />

        <TimelineBar
          key="timeline"
          {...{
            sceneLength,
            setSceneLength,
            setTimeLineCanvasRef: (ref) => {
              timeLineCanvasRef.current = ref;
            },
            timeIndicatorTimeStamp,
          }}
        />

        <Background />
        <ComposingPlayGround
          {...{
            sceneLength,
            setSceneLength,
            setComposingPlayGroundRef: (ref) => {
              composingPlayGroundRef.current = ref;
            },
            timeIndicatorTimeStamp,
          }}
        />
      </div>
    </Provider>
  );
};

export default App;
