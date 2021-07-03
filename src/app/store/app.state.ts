import { CounterState } from '../counter/state/counter.state';
import { PostsState } from '../posts/state/posts.state';
import { postsReducer } from '../posts/state/posts.reducer';
import { counterReducer } from '../counter/state/counter.reducer';

export interface AppState {
  counter: CounterState;
  posts: PostsState;
}

export const appReducer = {
  counter: counterReducer,
  posts: postsReducer,
};
