import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/Post.model';

export interface PostsState extends EntityState<Post> {}
export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();
export const initialState: PostsState = postsAdapter.getInitialState();
