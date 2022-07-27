import React from "react";
import TimelineBar from "./TimelineBar";
import Background from "./Background";
import ComposingPlayGround from "./ComposingPlayGround";
import CanvasModesBar from "./CanvasModesBar";

import "../tailwind.output.css";
import { Provider } from "react-redux";
import {store} from "../store/store.index";
import ShapesSideBar from "./ShapesSideBar";

const App = () => {

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-500 relative">
        <CanvasModesBar />
        <ShapesSideBar />
        <TimelineBar key="timeline" />
        <Background />
        <ComposingPlayGround />
      </div>
    </Provider>
  );
};

export default App;
