import { PokemonType } from './pokemon-type';

export interface Pokemon {
  name: string;
  id: number;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}
