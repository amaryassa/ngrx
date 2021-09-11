import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/Post.model';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';
import { Observable } from 'rxjs';
export const POST_STATE_NAME = 'postsState';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});
export const getPostById = () =>
  createSelector(
    getPosts,
    getCurrentRoute,
    (posts: Post[], route: RouterStateUrl) => {
      return posts ? posts.find((post) => post.id == route.params['id']) : null;
    }
  );

export const getCount = createSelector(getPostsState, (state) => {
  return state?.posts?.length || 0;
});
