import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loginStart } from '../state/auth.actions';
import { fromEvent, interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForm();
  }
  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(loginStart({ email, password }));
  }
  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('amaryassa@yahoo.fr', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('amaramar', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // clicks = fromEvent(document, 'click')
  //   .pipe(exhaustMap((ev) => interval(1000).pipe(take(5))))
  //   .subscribe((x) => console.log(=x));
}
