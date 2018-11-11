import { Component, OnInit } from '@angular/core';
import { PokemonService } from './service/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import { PokemonSpecies } from './pokemon-species';
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
  hint: string;
  showCorrect: boolean;
  showWrong: boolean;
  showHint: boolean;
  reveal: boolean;
  winCount = 0;
  loseCount = 0;
  skipCount = 0;
  loading: boolean;

  constructor(private pokemonService: PokemonService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getRandomPokemon();
  }

  getRandomPokemon() {
    this.loading = true;
    const randomNum = Math.floor(Math.random() * 807) + 1;
    this.pokemonService.getPokemon(randomNum)
      .subscribe((pokemon: Pokemon) => {
        this.randomPokemon = pokemon;
        this.randomPokemonImg = this.sanitizer.bypassSecurityTrustStyle('url(' + pokemon.sprites.front_default + ')');
        this.loading = false;
      });
  }

  getHint() {
    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    this.pokemonService.getPokemonSpecies(this.randomPokemon.id)
      .subscribe((pokemonSpecies: PokemonSpecies) => {
        let hint = pokemonSpecies.flavor_text_entries.find(entry => {
          return entry.language.name === 'en';
        }).flavor_text;
        hint = hint.replace(capitalize(this.randomPokemon.name) + `'s`, 'Its');
        this.hint = hint.replace(capitalize(this.randomPokemon.name), 'It');
        this.showHint = true;
      });
  }

  guessPokemon() {
    if (this.guess === this.randomPokemon.name) {
      this.winCount++;
      this.reveal = true;
      this.showCorrect = true;
      this.guess = '';
      this.hint = '';
      this.showHint = false;
      setTimeout(() => {
        this.showCorrect = false;
        this.reveal = false;
        this.getRandomPokemon();
      }, 5000);
    } else {
      this.loseCount++;
      this.showWrong = true;
      setTimeout(() => {
        this.showWrong = false;
      }, 1000);
    }
  }

  skip() {
    this.skipCount++;
    this.getRandomPokemon();
  }
}
