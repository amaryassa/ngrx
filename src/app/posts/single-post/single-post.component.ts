import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Post } from '../../models/Post.model';
import { Observable, of } from 'rxjs';
import { getPostById } from '../state/posts.selector';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  post: Observable<Post | null | undefined>;
  id: string | number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
    this.store.select(getCurrentRoute).subscribe((currenteRoute) => {
      this.id = currenteRoute.params['id'];
    });
  }
}
