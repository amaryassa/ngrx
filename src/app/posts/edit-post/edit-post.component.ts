import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';
import { Observable, of, Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatePost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  post?: Post | null;
  postSubscription: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store
      .select(getPostById())
      .subscribe((post) => {
        console.log('post', post);
        this.post = post;
        this.postForm.patchValue({
          title: post?.title,
          description: post?.description,
        });
      });
    // this.route.paramMap.subscribe((params) => {
    // console.log('params', params);
    // const id = params.get('id');
    // if (id) {
    // this.postSubscription = this.store
    // .select(getPostById(id))
    // .subscribe((data) => {
    // this.post = data;
    // this.createForm();
    // });
    // }
    // });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post?.id,
      title,
      description,
    };

    //dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
