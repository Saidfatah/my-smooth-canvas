// Dependencies
import React, { useRef } from "react";
import TimelineBar from "./TimelineBar";
import Background from "./Background";
import ComposingPlayGround from "./ComposingPlayGround";
import CanvasModesBar from "./CanvasModesBar";
// Styles
import "../tailwind.output.css";
import { Provider } from "react-redux";
import store from "../store/store.index";

const App = () => {
  const timeIndicatorTimeStamp = useRef(undefined);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-500 relative">
        <CanvasModesBar />

        <TimelineBar
          key="timeline"
          {...{
            timeIndicatorTimeStamp,
          }}
        />

        <Background />
        <ComposingPlayGround
          {...{
            timeIndicatorTimeStamp,
          }}
        />
      </div>
    </Provider>
  );
};

export default App;
