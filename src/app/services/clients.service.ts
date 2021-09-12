import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client.model';
import { Observable, tap, delay, exhaustAll, map } from 'rxjs';
const BASE_URL = 'http://localhost:3000';
const URL_CLIENTS = `${BASE_URL}/clients`;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[] | []> {
    return this.http
      .get<Client[]>(URL_CLIENTS)
      .pipe(tap((data) => console.log(data)));
  }

  addClient(client: Client) {
    return this.http
      .post<Client>(URL_CLIENTS, client)
      .pipe(tap((data) => console.log(data)));
  }
  updatePost(client: Client) {
    return this.http
      .put<Client>(`${URL_CLIENTS}/${client.id}`, client)
      .pipe(tap((data) => console.log(data)));
  }
  deleteClient(id: string | number) {
    return this.http
      .delete<Client>(`${URL_CLIENTS}/${id}`)
      .pipe(tap((data) => console.log(data)));
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${URL_CLIENTS}/${id}`);
  }
}
