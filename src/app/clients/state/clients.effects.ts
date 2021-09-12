import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../services/clients.service';
import { mergeMap, catchError, map, of, throwError } from 'rxjs';
import { loadClientsSuccess, loadClientsRequest } from './clients.actions';
import { Injectable } from '@angular/core';
import { setLoader, setErrorMessage } from '../../store/shared/shared.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class ClientsEffects {
  constructor(
    private actions$: Actions,
    private clientsService: ClientsService,
    private store: Store<AppState>
  ) {}

  loadClients$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadClientsRequest),
        mergeMap((action) => {
          return this.clientsService.getClients().pipe(
            map((data) => {
              // throw 'Parameter is not a number!';
              return loadClientsSuccess({ clients: data });
            }),
            catchError((errorResponse) => {
              return of(
                setErrorMessage({
                  message: errorResponse?.message ?? 'Error occured',
                })
              );
            })
          );
        })
      );
    },
    {
      dispatch: true,
    }
  );

  request$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loadClientsRequest]),
        map((action) => {
          // this.store.dispatch(setLoader({ status: true }));
          return setLoader({ status: true });
        })
      );
    },
    { dispatch: true }
  );
  success$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loadClientsSuccess]),
        map((action) => {
          // this.store.dispatch(setLoader({ status: true }));
          return setLoader({ status: false });
        })
      );
    },
    { dispatch: true }
  );
}
