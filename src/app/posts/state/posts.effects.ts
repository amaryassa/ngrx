import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../../services/posts.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import {
  mergeMap,
  of,
  tap,
  map,
  catchError,
  exhaustMap,
  filter,
  switchMap,
  withLatestFrom,
  EMPTY,
} from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  setLoader,
  setErrorMessage,
  dummyAction,
} from '../../store/shared/shared.actions';
import { getPostById, getPosts, getCount } from './posts.selector';
import { Update } from '@ngrx/entity';
import { Post } from 'src/app/models/Post.model';
import {
  loadPosts,
  loadPostsSuccess,
  addPost,
  addPostSuccess,
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
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPosts),
        withLatestFrom(this.store.select(getCount)),
        mergeMap(([action, countPosts]) => {
          //éviter les appels http qui ne sont pas nécessaire
          if (countPosts <= 1) {
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
          }
          return of(dummyAction());
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
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postsService.getPostById(id).pipe(
            map((post) => {
              // const postData = [{ ...post, id }];
              return loadPostsSuccess({ posts: [post] });
            }),
            catchError((errorResponse) => {
              return of(
                setErrorMessage({
                  message:
                    (errorResponse?.status == '404'
                      ? `Status : ${errorResponse?.status} : ${errorResponse?.statusText}`
                      : errorResponse?.message) ?? 'Error occured',
                })
              );
            })
          );
        }
        return EMPTY;
      })
    );
  });

  request$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loadPosts, addPost, updatePost, deletePost]),
        map((action) => {
          return setLoader({ status: true });
        })
      );
    },
    { dispatch: true }
  );
  success$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ...[
            loadPostsSuccess,
            addPostSuccess,
            updatePostSuccess,
            deletePostSuccess,
            dummyAction,
          ]
        ),
        map((action) => {
          return setLoader({ status: false });
        })
      );
    },
    { dispatch: true }
  );
}
