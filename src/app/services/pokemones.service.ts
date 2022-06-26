import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemones } from '../models/pokemones';
import { PokemonDetail } from '../models/pokemonesDetails';

@Injectable({
  providedIn: 'root'
})
export class PokemonesService {

  private apiURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }


  getPokemones(offset: number, limit: number = 30) : Observable<Pokemones[]>{
    return this.http.get<Pokemones[]>(`${this.apiURL}/pokemon?offset=${offset}$limit=${30}`)
            .pipe(
              map((x: any) => x.results)
            );
  }

  getPokemonDetail(pokemon: number | string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiURL}/pokemon/${pokemon}`);
  }
}
