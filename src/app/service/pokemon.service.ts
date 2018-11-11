import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  totalPokemon = [151, 251, 386, 494, 649, 721, 802];
  generation = [true, true, true, true, true, true, true];

  constructor(private http: HttpClient) { }

  getPokemon(pokeNum: Number): Observable<any> {
    return this.http.get('https://cors.io/?https://pokeapi.co/api/v2/pokemon/' + pokeNum);
  }

  getPokemonSpecies(pokeNum: Number): Observable<any> {
    return this.http.get('https://cors.io/?https://pokeapi.co/api/v2/pokemon-species/' + pokeNum);
  }

  randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPokemonNumber() {
    const randomNums = [];
    for (let i = 0; i < 7; i++) {
      if (this.generation[i]) {
        let randomNum;
        if (i === 0) {
          randomNum = this.randomRange(1, this.totalPokemon[i]);
        } else {
          randomNum = this.randomRange(this.totalPokemon[i - 1], this.totalPokemon[i]);
        }
        randomNums.push(randomNum);
      }
    }
    return randomNums[this.randomRange(0, randomNums.length - 1)];
  }
}
