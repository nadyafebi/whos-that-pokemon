import { PokemonEntry } from './pokemon-entry';

export interface PokemonSpecies {
  id: number;
  flavor_text_entries: PokemonEntry[];
}
