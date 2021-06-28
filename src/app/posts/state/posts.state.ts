import { Post } from '../../models/Post.model';
export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    { id: '1', title: 'simple title', description: 'Lorem ipsum dolor' },
    { id: '2', title: 'simple title 2', description: 'Lorem2 ipsum2 dolor2' },
  ],
};
