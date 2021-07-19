import { Action, createReducer, on } from '@ngrx/store';
import { SharedState, initialState } from './shared.state';
import { setLoader, setErrorMessage } from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoader, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
      errorMessage: '',
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
      showLoading: false,
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
