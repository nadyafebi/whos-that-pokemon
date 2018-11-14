export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  id: number;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}
