import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post.model';
import { Observable, tap, delay, exhaustAll, map } from 'rxjs';
const BASE_URL = 'http://localhost:3000';
const URL_POSTS = `${BASE_URL}/posts`;
// const BASE_URL = 'https://ng-test-b9633.firebaseio.com';
// const URL_POSTS = `${BASE_URL}/posts.json`;
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  _getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(URL_POSTS).pipe(
      map((data) => {
        const posts: Post[] = [];
        for (let key in data) {
          posts.push({ ...data[key], id: key });
        }
        return posts;
      })
    );
  }

  _updatePost(post: Post) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(URL_POSTS, postData);
  }

  getPosts(): Observable<Post[] | []> {
    return this.http.get<Post[]>(URL_POSTS).pipe(
      // delay(1500),
      tap((data) => console.log(data))
    );
  }

  addPost(post: Post) {
    return this.http.post<Post>(URL_POSTS, post).pipe(
      // delay(1500),
      tap((data) => console.log(data))
    );
  }
  updatePost(post: Post) {
    // console.log(post);
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

  getPostById(id: string): Observable<Post> {
    console.log('getPostById Service');
    return this.http.get<Post>(`${URL_POSTS}/${id}`);
  }
}
