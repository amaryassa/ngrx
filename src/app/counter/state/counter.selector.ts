import { CounterState } from './counter.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const COUNT_STATE_NAME = 'counterState';
//le nom du reducer qui est dans module.ts
const getCounterState = createFeatureSelector<CounterState>(COUNT_STATE_NAME);

export const getCounter = createSelector(getCounterState, (state) => {
  return state.counter;
});

export const getChannelName = createSelector(getCounterState, (state) => {
  return state.channelName;
});
