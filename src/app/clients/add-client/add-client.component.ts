import { addClientsRequest } from './../state/clients.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Client } from '../../models/Client.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
  }

  onAddClient() {
    if (!this.clientForm.valid) {
      return;
    }
    //post without id
    // const post: Omit<Post, 'id'> = {
    const client: Client = {
      nom: this.clientForm.value.nom,
      prenom: this.clientForm.value.prenom,
    };
    this.store.dispatch(addClientsRequest({ client }));
  }

  showPrenomErrors(): String | void {
    const prenomForm = this.clientForm.get('prenom');
    if (prenomForm?.touched && !prenomForm?.valid) {
      if (prenomForm?.errors?.required) {
        return 'prenom is required';
      }
      if (prenomForm?.errors?.minlength) {
        return 'Prenom should be of minimum 10 characters length';
      }
    }
  }
  createForm() {
    this.clientForm = new FormGroup({
      nom: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      prenom: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
}
