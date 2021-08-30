import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post.model';
import { Observable, tap, delay, exhaustAll } from 'rxjs';
// const BASE_URL = 'http://localhost:3000';
// const URL_POSTS = `${BASE_URL}/posts`;
const BASE_URL = 'https://ng-test-b9633.firebaseio.com';
const URL_POSTS = `${BASE_URL}/posts.json`;
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[] | []> {
    return this.http.get<Post[]>(URL_POSTS).pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }

  addPost(post: Post) {
    return this.http.post<Post>(URL_POSTS, post).pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }
  updatePost(post: Post) {
    return this.http.put<Post>(`${URL_POSTS}/${post.id}`, post).pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }
  deletePost(id: string | number) {
    return this.http.delete<Post>(`${URL_POSTS}/${id}`).pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }
}
