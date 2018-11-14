import { Component, OnInit, Inject } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  generations: boolean[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.generations = this.pokemonService.getGenerations();
  }

  set(num: number) {
    this.pokemonService.setGeneration(num, this.generations[num]);
    this.update();
  }

}
