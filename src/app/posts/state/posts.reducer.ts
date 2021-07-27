import { Action, createReducer, on } from '@ngrx/store';
import { loadPostsSuccess, updatePostSuccess } from './posts.actions';
import { initialState, PostsState } from './posts.state';
import { addPostSuccess, deletePostSuccess } from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, action) => {
    console.log('on est là)');
    return {
      ...state,
      posts: action.posts,
    };
  }),
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccess, (state, action) => {
    const id = action.post.id;
    let updatedPosts = [...state.posts];
    const indexOfUpdate = updatedPosts.findIndex((post) => post.id == id);

    if (indexOfUpdate != -1) {
      const updatedPost = { ...state.posts[indexOfUpdate], ...action.post };
      updatedPosts[+indexOfUpdate] = updatedPost;
    }

    return {
      ...state,
      posts: [...updatedPosts],
    };
  }),
  on(deletePostSuccess, (state, action) => {
    const updatedPosts = state.posts.filter((post) => post.id != action.id);
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return _postsReducer(state, action);
}
