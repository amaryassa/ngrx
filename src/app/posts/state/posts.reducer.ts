import { Action, createReducer, on } from '@ngrx/store';
import { addPost, deletePost, updatePost } from './posts.actions';
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
  }),
  on(updatePost, (state, action) => {
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
  on(deletePost, (state, action) => {
    console.log('jsk');
    const updatedPosts = state.posts.filter((post) => post.id != action.id);
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  console.log('action', action);

  return _postsReducer(state, action);
}
