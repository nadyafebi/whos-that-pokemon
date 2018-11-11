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
  hints: string[] = [];
  hintLoading: boolean;
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

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
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
    switch (this.hints.length) {
      case 0:
        const types = this.randomPokemon.types.map((type) => {
          return this.capitalize(type.type.name);
        });
        this.hints.push('Type: ' + types.join('/'));
        break;
      case 1:
        this.hintLoading = true;
        this.pokemonService.getPokemonSpecies(this.randomPokemon.id)
          .subscribe((pokemonSpecies: PokemonSpecies) => {
            let hint = pokemonSpecies.flavor_text_entries.find(entry => {
              return entry.language.name === 'en';
            }).flavor_text;
            hint = hint.replace(this.capitalize(this.randomPokemon.name) + `'s`, 'Its');
            this.hints.push(hint.replace(this.capitalize(this.randomPokemon.name), 'It'));
            this.hintLoading = false;
          });
        break;
      case 2:
        const length = this.randomPokemon.name.length;
        let name = this.randomPokemon.name[0];
        for (let i = 0; i < length - 2; i++) {
          name += '_';
        }
        name += this.randomPokemon.name[length - 1];
        this.hints.push(name);
        break;
    }
  }

  guessPokemon() {
    if (this.guess.toLowerCase() === this.randomPokemon.name) {
      this.winCount++;
      this.reveal = true;
      this.showCorrect = true;
      this.reset();
      setTimeout(() => {
        this.showCorrect = false;
        this.reveal = false;
        this.getRandomPokemon();
      }, 5000);
    } else if (this.guess) {
      this.loseCount++;
      this.showWrong = true;
      setTimeout(() => {
        this.showWrong = false;
      }, 1000);
    }
  }

  skip() {
    this.skipCount++;
    this.reset();
    this.getRandomPokemon();
  }

  reset() {
    this.guess = '';
    this.hints = [];
  }
}
