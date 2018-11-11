import { Component, OnInit } from '@angular/core';
import { PokemonService } from './service/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomPokemon: Pokemon;
  randomPokemonImg: string;

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
}
