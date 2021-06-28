import { CounterState } from './counter.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

//le nom du reducer qui est dans module.ts
const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(getCounterState, (state) => {
  return state.counter;
});

export const getChannelName = createSelector(getCounterState, (state) => {
  return state.channelName;
});
