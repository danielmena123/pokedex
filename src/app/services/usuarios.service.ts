import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiURL = environment.usersURL;

  constructor(
    private http: HttpClient
  ) { }

  register(usuario: Usuarios): Observable<Usuarios>{
    return this.http.post<Usuarios>(`${this.apiURL}/api/register`, usuario);
  }

  login(usuario: Usuarios): Observable<any>{
    return this.http.post<any>(`${this.apiURL}/api/login`, usuario);
  }
}
