import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/Post.model';
export const POST_STATE_NAME = 'postsState';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});
export const getPostById = (id: number | string) =>
  createSelector(getPostsState, (state) => {
    return state.posts.find((post) => post.id == id);
  });

export const getCount = createSelector(getPostsState, (state) => {
  return state.posts.length;
});
