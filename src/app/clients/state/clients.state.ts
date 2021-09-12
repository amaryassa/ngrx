import { Client } from '../../models/Client.model';

export const CLIENTS_STATE_NAME = 'clientsState';

export interface ClientsState {
  clients: Client[];
}

export const initialState: ClientsState = {
  clients: [],
};
