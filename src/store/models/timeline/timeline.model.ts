import initialState from './timeline.intial.state';

import executeKeyframeAnimation from './effects/executeKeyframeAnimation';
import playTimeline from './effects/playTimeline';
import addNewTimeStamp from './effects/addNewTimeStamp';
import { createModel, RematchDispatch } from '@rematch/core';
import { RootModel } from '../models.index';
import { AddNewAnimationEffectArgs, ExecuteKeyframeAnimationArgs } from '../../../utils/types';
import { RootState } from '../../store.index';
const timeline = createModel<RootModel>()({
  state :initialState ,
  reducers:{
    UPDATE_SHAPES: (state, { shapes }: any) => ({
      ...state,
      shapes: [...shapes]
    }),
    UPDATE_CURRENT_TIME_STAMP: (state, { currentTimeStamp }: any) => ({
      ...state,
      currentTimeStamp
    }),
    UPDATE_TIME_STAMPS: (state, { keyframes }: any) => ({
      ...state,
      keyframes: [...keyframes]
    }),
    UPDATE_TIMELINE_ANIMATIONS: (state, { animations }: any) => ({
      ...state,
      animations
    }),
    UPDATE_PREVIOUS_REQUEST_ANIMATION_ID: (
      state,
      previousRequestAnimationID: any
    ) => ({
      ...state,
      previousRequestAnimationID
    }),
    UPDATE_REQUEST_ANIMATION_FRAME_LAST_TIMESTAMP: (
      state,
      requestAnimationFrameLastTimeStamp: any
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
    addNewTimeStamp: (args: AddNewAnimationEffectArgs, state: RootState) =>
      addNewTimeStamp(dispatch, args, state),
  }),
}) ;

export default timeline;
