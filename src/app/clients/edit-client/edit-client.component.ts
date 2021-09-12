import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../../models/Client.model';
import { AppState } from '../../store/app.state';
import { Router, ActivatedRoute } from '@angular/router';
import { getClientById } from '../state/clients.selector';
import { Subscription } from 'rxjs';
import { updateClientsRequest } from '../state/clients.actions';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit, OnDestroy {
  clientForm: FormGroup;
  client?: Client | null;
  clientSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((params) => {
      console.log('params', params);
      const id = params.get('id');
      if (id) {
        this.clientSubscription = this.store
          .select(getClientById(id))
          .subscribe((data) => {
            this.client = data;
            this.clientForm.patchValue({
              nom: data?.nom,
              prenom: data?.prenom,
            });
          });
      }
    });
  }

  onSubmit() {
    if (!this.clientForm.valid) {
      return;
    }
    //post without id
    // const post: Omit<Post, 'id'> = {
    const client: Client = {
      id: this.client?.id,
      nom: this.clientForm.value.nom,
      prenom: this.clientForm.value.prenom,
    };
    this.store.dispatch(updateClientsRequest({ client }));
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

  ngOnDestroy() {
    if (this.clientSubscription) {
      this.clientSubscription.unsubscribe();
    }
  }
}
