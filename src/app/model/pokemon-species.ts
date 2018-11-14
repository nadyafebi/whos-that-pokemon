export interface PokemonEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export interface PokemonSpecies {
  id: number;
  flavor_text_entries: PokemonEntry[];
}
