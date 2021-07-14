import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { getCount, getPosts } from '../state/posts.selector';
import { deletePost } from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]> = of([]);
  count: Observable<number> = of(0);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.count = this.store.select(getCount);
  }

  onDeletePost(id: string | number | undefined) {
    if (confirm('Are you sure you want to delete')) {
      if (id) this.store.dispatch(deletePost({ id }));
    }
  }
}
