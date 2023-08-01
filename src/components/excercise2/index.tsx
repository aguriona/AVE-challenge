import React, { useState, useEffect } from "react";
import { Form, Container, ListGroup, Button } from "react-bootstrap";
import { PokemonApi, PokemonBasics, PokemonStats } from "./pokemons";

const PokemonTypeSelect = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [names1, setNames1] = useState<string[]>([]);
  const [names2, setNames2] = useState<string[]>([]);
  const [matchedNames, setMatchedNames] = useState<string[]>([]);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonNumber, setPokemonNumber] = useState<number | null>(null);
  const [stats, setStats] = useState<PokemonStats | null>(null);
  const [selectedType1, setSelectedType1] = useState("");
  const [selectedType2, setSelectedType2] = useState("");
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonBasics[]>([]);
  const [verificator, setVerificator] = useState();
  const pokemonApi = new PokemonApi();

  useEffect(() => {
    pokemonApi.fetchPokemonTypes().then((data) => setTypes(data));
    pokemonApi
      .getPokemonsByIdsList([2, 5, 7, 9, 50, 35], "name")
      .then((data) => setPokemonList(data));
    pokemonApi
      .verifyPokemonType(2, "water")
      .then((data) => setVerificator(data));
  }, []);

  useEffect(() => {
    if (selectedType1) {
      pokemonApi
        .getTotalPokemonsByType(selectedType1)
        .then((data) => setTotalPokemons(data));
      pokemonApi
        .getPokemonsNamesByType(selectedType1)
        .then((data) => setNames1(data));
    } else {
      setTotalPokemons(0);
    }
  }, [selectedType1]);

  useEffect(() => {
    if (selectedType2 && selectedType1) {
      pokemonApi
        .getPokemonsNamesByType(selectedType2)
        .then((data) => setNames2(data));

      setMatchedNames(
        names1.filter((pokemonName) => names2.includes(pokemonName))
      );
    }
  }, [selectedType2, selectedType1]);

  const handleFindId = () => {
    if (pokemonName) {
      pokemonApi
        .getPokemonNumberByName(pokemonName)
        .then((data) => setPokemonNumber(data));
    } else {
      setPokemonNumber(null);
    }
    if (pokemonNumber) {
      pokemonApi.getStatsByNumber(pokemonNumber).then((data) => setStats(data));
    } else {
      setStats(null);
    }
  };

  return (
    <Container>
      <h2>Seleccione un tipo de Pokemon:</h2>
      <Form.Select
        onChange={(e) => setSelectedType1(e.target.value)}
        value={selectedType1}
      >
        <option>Seleccionar tipo</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Form.Select>
      {selectedType1 && (
        <p>
          La suma total de Pokemons de tipo "{selectedType1}" es:{" "}
          {totalPokemons}
        </p>
      )}

      <h2>Seleccione otro tipo para buscar coincidencias:</h2>
      <Form.Select
        onChange={(e) => setSelectedType2(e.target.value)}
        value={selectedType2}
      >
        <option>Seleccionar tipo</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Form.Select>
      {matchedNames && (
        <>
          <h4>Pokemons con coincidencia de tipos: </h4>

          <ListGroup style={{ marginTop: 10 }}>
            {matchedNames.map((name) => (
              <ListGroup.Item key={name}>{name}</ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      <Form.Group>
        <Form.Label style={{ fontStyle: "italic", fontWeight: "bold" }}>
          Ingresa el nombre del Pokemon:
        </Form.Label>
        <Form.Control
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary"
        style={{ marginTop: 10 }}
        onClick={handleFindId}
      >
        Obtener Id
      </Button>
      {pokemonNumber !== null && (
        <p>El número del Pokemon es: {pokemonNumber}</p>
      )}

      {stats && (
        <ListGroup style={{ marginTop: 10 }}>
          <h4>Stats Base:</h4>

          <ListGroup.Item>HP: {stats.hp}</ListGroup.Item>
          <ListGroup.Item>Ataque: {stats.attack}</ListGroup.Item>
          <ListGroup.Item>Defensa: {stats.defense}</ListGroup.Item>
          <ListGroup.Item>
            Ataque Especial: {stats.specialAttack}
          </ListGroup.Item>
          <ListGroup.Item>
            Defensa Especial: {stats.specialDefense}
          </ListGroup.Item>
          <ListGroup.Item>Velocidad: {stats.speed}</ListGroup.Item>
        </ListGroup>
      )}
      {pokemonList.map((pokemon, index) => (
        <ListGroup key={index} style={{ marginTop: 10 }}>
          <ListGroup.Item>name: {pokemon.name}</ListGroup.Item>
          <ListGroup.Item>type: {pokemon.type}</ListGroup.Item>
          <ListGroup.Item>weight: {pokemon.weight}</ListGroup.Item>
        </ListGroup>
      ))}
      {console.log("VERIFICADOR --->",verificator)}
    </Container>
  );
};

export default PokemonTypeSelect;
