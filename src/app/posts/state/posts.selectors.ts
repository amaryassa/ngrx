import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/Post.model';
const getPostsState = createFeatureSelector<PostsState>('posts');

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
