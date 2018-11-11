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
  hint: string;
  showCorrect: boolean;
  showWrong: boolean;
  winCount: Number = 0;
  loseCount: Number = 0;

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

  getHint() {
    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    this.pokemonService.getPokemonSpecies(this.randomPokemon.id)
      .subscribe((pokemonSpecies: PokemonSpecies) => {
        const hint = pokemonSpecies.flavor_text_entries.find(entry => {
          return entry.language.name === 'en';
        }).flavor_text;
        this.hint = hint.replace(capitalize(this.randomPokemon.name), 'It');
      });
  }

  guessPokemon() {
    if (this.guess === this.randomPokemon.name) {
      this.winCount++;
      this.showCorrect = true;
      setTimeout(() => {
        this.showCorrect = false;
      }, 1000);
      this.guess = '';
      this.hint = '';
      this.getRandomPokemon();
    } else {
      this.loseCount++;
      this.showWrong = true;
      setTimeout(() => {
        this.showWrong = false;
      }, 1000);
    }
  }
}
