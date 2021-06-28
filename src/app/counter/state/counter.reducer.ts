import {
  increment,
  decrement,
  reset,
  customIncrement,
  changeChannelName,
} from './counter.actions';
import { CounterState, initialState } from './counter.state';
import { Action, createReducer, on } from '@ngrx/store';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeChannelName, (state) => {
    return {
      ...state,
      channelName: 'Modified Text Amar',
    };
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action
) {
  console.log('action', action);

  return _counterReducer(state, action);
}
