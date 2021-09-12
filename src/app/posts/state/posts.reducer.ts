import { Action, createReducer, on } from '@ngrx/store';
import { loadPostsSuccess, updatePostSuccess } from './posts.actions';
import { initialState, postsAdapter, PostsState } from './posts.state';
import { addPostSuccess, deletePostSuccess } from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  }),
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { id }) => {
    return postsAdapter.removeOne(String(id), state);
  }),
  on(updatePostSuccess, (state, { post }) => {
    return postsAdapter.updateOne(post, state);
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
