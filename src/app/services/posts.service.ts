import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post.model';
import { Observable, tap, delay, exhaustAll } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  getPosts(): Observable<Post[] | []> {
    return this.http.get<Post[]>('http://localhost:3000/posts').pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }

  addPost(post: Post) {
    return this.http.post<Post>('http://localhost:3000/posts', post).pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }
  updatePost(post: Post) {
    console.log('jsk');
    return this.http
      .put<Post>('http://localhost:3000/posts/' + post.id, post)
      .pipe(
        delay(1500),
        tap((data) => console.log(data))
      );
  }
  deletePost(id: string | number) {
    return this.http.delete<Post>(`http://localhost:3000/posts/${id}`).pipe(
      delay(1500),
      tap((data) => console.log(data))
    );
  }
}
