import { Component, OnInit } from '@angular/core';
import { loadClientsRequest } from '../state/clients.actions';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { Client } from '../../models/Client.model';
import { getClients } from '../state/clients.selector';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  clients$: Observable<Client[]> = of([]);
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.clients$ = this.store.select(getClients);

    this.store.dispatch(loadClientsRequest());
  }
}
