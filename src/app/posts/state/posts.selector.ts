import { PostsState, postsAdapter } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/Post.model';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';
import { Dictionary } from '@ngrx/entity';
export const POST_STATE_NAME = 'postsState';

export const postSelectors = postsAdapter.getSelectors();

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, postSelectors.selectAll);
export const getPostsEntities = createSelector(
  getPostsState,
  postSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostsEntities,
  getCurrentRoute,
  (posts: Dictionary<Post>, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);

// export const getPostById = () =>
// createSelector(
//   getPostsEntities,
//   getCurrentRoute,
//   (posts: Dictionary<Post>, route: RouterStateUrl) => {
//     return posts ? posts[route.params['id']] : null;
//   }
// );
export const getCount = createSelector(
  getPostsState,
  postSelectors.selectTotal
);
