import { Action, createReducer, on } from '@ngrx/store';
import { addPost } from './posts.actions';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  // on(increment, (state) => {
  //   return {
  //     ...state,
  //     counter: state.counter + 1,
  //   };
  // }),

  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = state.posts.length + 1;
    return {
      ...state,
      posts: [...state.posts, post],
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  console.log('action', action);

  return _postsReducer(state, action);
}
