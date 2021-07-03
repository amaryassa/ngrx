import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/Post.model';
import { AppState } from '../../store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
  }

  showDescriptionErrors(): String | void {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm?.valid) {
      if (descriptionForm?.errors?.required) {
        return 'Description is required';
      }
      if (descriptionForm?.errors?.minlength) {
        return 'Description should be of minimum 10 characters length';
      }
    }
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    //post without id
    // const post: Omit<Post, 'id'> = {
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addPost({ post }));
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
}
