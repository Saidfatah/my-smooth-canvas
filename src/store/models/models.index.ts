import timeline from './timeline/timeline.model';
import canvasMode from './canvasMode/canvas.mode.model';
import { Models } from '@rematch/core';

export interface RootModel extends Models<RootModel> {
  timeline: typeof timeline;
  canvasMode: typeof canvasMode;
}
 

export const models: RootModel = {
  timeline,
  canvasMode
};
