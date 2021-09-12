import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../services/clients.service';
import { mergeMap, catchError, map, of, throwError, exhaustMap } from 'rxjs';
import {
  loadClientsSuccess,
  loadClientsRequest,
  addClientsRequest,
} from './clients.actions';
import { Injectable } from '@angular/core';
import { setLoader, setErrorMessage } from '../../store/shared/shared.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { deleteClientsRequest, deleteClientsSuccess } from './clients.actions';
import {
  addClientsSuccess,
  updateClientsRequest,
  updateClientsSuccess,
} from './clients.actions';

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

  addClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addClientsRequest),
      exhaustMap((action) => {
        return this.clientsService.addClient(action.client).pipe(
          map((client) => {
            return addClientsSuccess({ client });
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
  });
  updateClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateClientsRequest),
      exhaustMap((action) => {
        return this.clientsService.updateClient(action.client).pipe(
          map((client) => {
            return updateClientsSuccess({ client });
            // return updatePostSuccess({ post });
          })
        );
      })
    );
  }, {});

  deleteClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteClientsRequest),
      exhaustMap((action) => {
        return this.clientsService.deleteClient(action.id).pipe(
          map((id) => {
            console.log(action.id);
            return deleteClientsSuccess({ id: action.id });
          })
        );
      })
    );
  });

  request$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loadClientsRequest, addClientsRequest]),
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
        ofType(...[loadClientsSuccess, addClientsSuccess]),
        map((action) => {
          // this.store.dispatch(setLoader({ status: true }));
          return setLoader({ status: false });
        })
      );
    },
    { dispatch: true }
  );
}
