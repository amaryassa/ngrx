import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SingleClientComponent } from './single-client/single-client.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CLIENTS_STATE_NAME } from './state/clients.state';
import { StoreModule } from '@ngrx/store';
import { clientsReducer } from './state/clients.reducer';
import { ClientsEffects } from './state/clients.effects';
import { EffectsModule } from '@ngrx/effects';
const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent,
    children: [
      { path: 'add', component: AddClientComponent },
      { path: 'edit/:id', component: EditClientComponent },
    ],
  },
];
@NgModule({
  declarations: [
    AddClientComponent,
    EditClientComponent,
    SingleClientComponent,
    ClientsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CLIENTS_STATE_NAME, clientsReducer),
    EffectsModule.forFeature([ClientsEffects]),
  ],
})
export class ClientModule {}
