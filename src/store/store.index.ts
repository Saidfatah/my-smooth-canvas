import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models/models.index';


export const store = init({ models });;
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
export type Store = typeof store

