import { Component, OnInit } from '@angular/core';
import { PokemonService } from './service/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomPokemon: Pokemon;
  randomPokemonImg: SafeStyle;
  guess: string;
  showCorrect: boolean;
  showWrong: boolean;

  constructor(private pokemonService: PokemonService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getRandomPokemon();
  }

  getRandomPokemon() {
    const randomNum = Math.floor(Math.random() * 807) + 1;
    this.pokemonService.getPokemon(randomNum)
      .subscribe((pokemon: Pokemon) => {
        this.randomPokemon = pokemon;
        this.randomPokemonImg = this.sanitizer.bypassSecurityTrustStyle('url(' + pokemon.sprites.front_default + ')');
      });
  }

  guessPokemon() {
    if (this.guess === this.randomPokemon.name) {
      this.showCorrect = true;
      setTimeout(() => {
        this.showCorrect = false;
      }, 1000);
      this.guess = '';
      this.getRandomPokemon();
    } else {
      this.showWrong = true;
      setTimeout(() => {
        this.showWrong = false;
      }, 1000);
    }
  }
}
