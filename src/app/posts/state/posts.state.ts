import { Post } from '../../models/Post.model';
export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [],
};
