import { createReducer, Action, on } from '@ngrx/store';
import { ClientsState, initialState } from './clients.state';
import { loadClientsSuccess } from './clients.actions';

const _clientsReducer = createReducer(
  initialState,
  on(loadClientsSuccess, (state, action) => {
    return {
      ...state,
      clients: action.clients,
    };
  })
);

export function clientsReducer(
  state: ClientsState | undefined,
  action: Action
) {
  return _clientsReducer(state, action);
}
