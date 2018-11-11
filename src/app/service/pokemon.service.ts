import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemon(pokeNum: Number): Observable<any> {
    return this.http.get('https://cors.io/?https://pokeapi.co/api/v2/pokemon/' + pokeNum);
  }

  getPokemonSpecies(pokeNum: Number): Observable<any> {
    return this.http.get('https://cors.io/?https://pokeapi.co/api/v2/pokemon-species/' + pokeNum);
  }
}
