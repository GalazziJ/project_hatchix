import { useEffect, useState } from "react";
import { getPokemonData } from "./services/pokeapi";

function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonData("charizard").then(setPokemon);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hatchix - Teste de PokéAPI</h1>
      {pokemon ? (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Tipo(s): {pokemon.types.map(t => t.type.name).join(", ")}</p>
        </div>  
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default App;
