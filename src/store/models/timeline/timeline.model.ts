import initialState from './timeline.intial.state';

import executeKeyframeAnimation from './effects/executeKeyframeAnimation';
import playTimeline from './effects/playTimeline';
import addNewKeyframe from './effects/addNewKeyframe';
import addNewShape from './effects/addNewShape';
import toggleSelectShape from './effects/toggleSelectShape';
import updateShape from './effects/updateShape';

import { createModel, RematchDispatch } from '@rematch/core';
import { RootModel } from '../models.index';
import { AddNewAnimationEffectArgs, AddNewShapeEffectArgs, Animations, ExecuteKeyframeAnimationArgs, ToggleSelectShapeEffectArgs, UpdateShapeArgs } from '../../../utils/types';
import { RootState } from '../../store.index';
import { keyframe, shape } from '../../../utils/schemas';

const timeline = createModel<RootModel>()({
  state :initialState ,
  reducers:{
    UPDATE_SHAPES: (state, shapes: Array<shape>) => ({
      ...state,
      shapes: [...shapes]
    }),
   UPDATE_SELECTED_SHAPE: (state, selectedShape: shape) => ({
      ...state,
      selectedShape
    }),
    UPDATE_CURRENT_TIME_STAMP: (state, currentTimeStamp: number) => ({
      ...state,
      currentTimeStamp
    }),
    UPDATE_TIME_KEYFRAMES: (state, keyframes : Array<keyframe>) => ({
      ...state,
      keyframes: [...keyframes]
    }),
    UPDATE_TIMELINE_ANIMATIONS: (state, animations : Animations) => ({
      ...state,
      animations
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_ID: (
      state,
      previousRequestAnimationID: number
    ) => ({
      ...state,
      previousRequestAnimationID
    }),
    UPDATE_REQUEST_ANIMATION_FRAME_LAST_TIMESTAMP: (
      state,
      requestAnimationFrameLastTimeStamp: number
    ) => ({
      ...state,
      requestAnimationFrameLastTimeStamp
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_END_DATE: (
      state,
      previousRequestAnimationFrameEndDate: any
    ) => ({
      ...state,
      previousRequestAnimationFrameEndDate
    })},
  effects:(dispatch: RematchDispatch<RootModel>) => ({
    executeKeyframeAnimation: (args: ExecuteKeyframeAnimationArgs, state: RootState) =>
    executeKeyframeAnimation(dispatch, args, state),
    playTimeline: (args: any, state: RootState) =>
      playTimeline(dispatch, args, state),
    addNewKeyframe: (args: AddNewAnimationEffectArgs, state: RootState) =>
      addNewKeyframe(dispatch, args, state),
    addNewShape: (args: AddNewShapeEffectArgs, state: RootState) =>
      addNewShape(dispatch, args, state),
    toggleSelectShape: (args: ToggleSelectShapeEffectArgs, state: RootState) =>
      toggleSelectShape(dispatch, args, state),
    updateShape: (args: UpdateShapeArgs, state: RootState) =>
    updateShape(dispatch, args, state),
  }),
}) ;

export default timeline;
