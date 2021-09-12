import { Component, OnInit } from '@angular/core';
import {
  loadClientsRequest,
  deleteClientsRequest,
} from '../state/clients.actions';
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
  count: Observable<number> = of(0);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadClientsRequest());
    this.clients$ = this.store.select(getClients);
  }

  onDeleteClient(id: string | number | undefined) {
    if (confirm('Are you sure you want to delete')) {
      if (id) this.store.dispatch(deleteClientsRequest({ id }));
    }
  }
}
