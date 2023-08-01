import axios from 'axios';

export type PokemonStats = {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
};
export type PokemonBasics = {
    name: string,
    type: string,
    weight: number,
}

export class PokemonApi {

    async fetchPokemonTypes(): Promise<string[]> {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/type');
            const types: string[] = response.data.results.map((type: { name: string }) => type.name);
            return types;
        } catch (error) {
            console.error('Error al obtener los tipos de Pokémon:', error);
            return [];
        }
    };
    async getTotalPokemonsByType(type: string): Promise<number> {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/type/${type}`
            );
            return response.data.pokemon.length;
        } catch (error) {
            console.error("Error al obtener la suma de pokemones por tipo:", error);
            return 0;
        }
    };
    async getPokemonsNamesByType(type: string): Promise<string[]> {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/type/${type}`
            );
            const pokemonsNames = response.data.pokemon.map((pokemon: any) => pokemon.pokemon.name);
            return pokemonsNames;
        } catch (error) {
            console.error("Error al obtener la suma de pokemons por tipo:", error);
            return [];
        }
    };
    async getPokemonNumberByName(pokemonName: string): Promise<number> {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            return response.data.id;
        } catch (error) {
            console.error("Error al obtener el número del pokemon por nombre:", error);
            return -1;
        }
    };
    async getStatsByNumber(pokemonNumber: number): Promise<PokemonStats> {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
            return {
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                specialAttack: response.data.stats[3].base_stat,
                specialDefense: response.data.stats[4].base_stat,
                speed: response.data.stats[5].base_stat,
            };
        } catch (error) {
            console.error("Error al obtener las stats del Pokémon:", error);
            throw error;
        }
    };

    async getPokemonsByIdsList(idsList: Array<number>, sorter: any): Promise<PokemonBasics[]> {
        try {
            const pokemonPromises = idsList.map((id) => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
            const responses = await Promise.all(pokemonPromises);
            const pokemons = responses.map((response) => ({
                name: response.data.name,
                type: response.data.types[0].type.name,
                weight: response.data.weight,
            }));
            switch (sorter) {
                case "name":
                    pokemons.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "type":
                    pokemons.sort((a, b) => a.type.localeCompare(b.type));
                    break;
                case "weight":
                    pokemons.sort((a, b) => a.weight - b.weight);
                    break;
                default:
                    pokemons.sort((a, b) => a.name.localeCompare(b.name));
            }
            return pokemons;
        } catch (error) {
            console.error("Error al obtener los pokemons", error);
            return [];
        }
    }

    async verifyPokemonType(id: number, type: string) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return response.data.types.some((t: any) => t.type.name === type);
        } catch (error) {
            console.error("Error al verificar:", error);
            return false;
        }
    }
}

