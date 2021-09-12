import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../../services/posts.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadPosts,
  loadPostsSuccess,
  addPost,
  addPostSuccess,
} from './posts.actions';
import {
  mergeMap,
  of,
  tap,
  map,
  catchError,
  exhaustMap,
  filter,
  switchMap,
} from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setLoader, setErrorMessage } from '../../store/shared/shared.actions';
import { getPostById } from './posts.selector';
import { Update } from '@ngrx/entity';
import { Post } from 'src/app/models/Post.model';
import {
  updatePost,
  updatePostSuccess,
  deletePost,
  deletePostSuccess,
} from './posts.actions';
import {
  RouterNavigatedAction,
  routerNavigatedAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPosts),
        mergeMap((action) => {
          return this.postsService.getPosts().pipe(
            map((data) => {
              return loadPostsSuccess({ posts: data });
            }),
            catchError((errorResponse) => {
              return of(
                setErrorMessage({
                  message: errorResponse?.message ?? 'Error occured',
                })
              );
            })
          );
        })
      );
    },
    {
      dispatch: true,
    }
  );

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      exhaustMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((post) => {
            return addPostSuccess({ post });
          })
        );
      })
    );
  }, {});
  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      exhaustMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((post) => {
            const updatedPost: Update<Post> = {
              id: post.id,
              changes: { ...post },
            };
            return updatePostSuccess({ post: updatedPost });
            // return updatePostSuccess({ post });
          })
        );
      })
    );
  }, {});
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((id) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction | any) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.postsService.getPostById(id).pipe(
          map((post) => {
            // const postData = [{ ...post, id }];
            return loadPostsSuccess({ posts: [post] });
          })
        );
      })
    );
  });

  // request$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(...[loadPosts, addPost]),
  //       map((action) => {
  //         return setLoader({ status: true });
  //       })
  //     );
  //   },
  //   { dispatch: true }
  // );
  // success$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(...[loadPostsSuccess, addPostSuccess]),
  //       map((action) => {
  //         return setLoader({ status: false });
  //       })
  //     );
  //   },
  //   { dispatch: true }
  // );
}
