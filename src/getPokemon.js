export default function pokemonAPIFunctions() {
  const getPokemon = async (id) => {
    const isClicked = false;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, sprites } = await res.json();
    return { name, sprite: sprites["front_default"], id, isClicked };
  };
  async function getRandomPokemon() {
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < 10) {
      //Generate random numbers between 1 and 1017 (1017 possible pokemon)
      const randomNumber = Math.floor(Math.random() * 1017) + 1;
      uniqueNumbers.add(randomNumber);
    }
    // Convert the Set to an array
    const uniqueNumbersArray = Array.from(uniqueNumbers);
    return await Promise.all(uniqueNumbersArray.map(getPokemon));
  }
  return { getPokemon, getRandomPokemon };
}
