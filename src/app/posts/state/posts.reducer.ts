import { Action, createReducer, on } from '@ngrx/store';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState
  // on(increment, (state) => {
  //   return {
  //     ...state,
  //     counter: state.counter + 1,
  //   };
  // }),

  // on(customIncrement, (state, action) => {
  //   return {
  //     ...state,
  //     counter: state.counter + action.count,
  //   };
  // }),
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  console.log('action', action);

  return _postsReducer(state, action);
}
