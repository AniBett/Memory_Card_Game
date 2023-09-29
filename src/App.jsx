import { useState } from "react";
import { useEffect } from "react";
import "./styles/App.css";
import pokemonAPIFunctions from "./getPokemon";
import GameOverScreen from "./components/GameOverScreen";
import GameBoard from "./components/GameBoard";
import uniqid from "uniqid";
function App() {
  const { getRandomPokemon } = pokemonAPIFunctions();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [newGame, setNewGame] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const newData = await getRandomPokemon();
      setPokemonList(newData);
      setIsLoading(false);
      setScore(0);
    }

    fetchData();
  }, [newGame]);
  const [isFlipped, setIsFlipped] = useState(false);
  function handleClick() {
    setIsFlipped(!isFlipped);
  }
  useEffect(() => {
    let timer1;
    if (!gameOver) {
      timer1 = setTimeout(() => setIsFlipped(false), 1200);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [isFlipped]);
  function clearAndRefetch(pokemon) {
    handleClick();
    if (pokemon.isClicked) {
      setGameOver(true);
      return;
    } else {
      pokemon.isClicked = true;
      setScore(score + 1);
      if (score === 10) {
        setGameOver(true);
      }
    }
    // Set the new shuffled array
    let array = shuffleArray();
    setTimeout(() => setPokemonList(array), 900);
    return;
  }
  function replayGame() {
    setIsFlipped(false);
    setGameOver(false);
    setNewGame(newGame + 1);
    return;
  }
  function shuffleArray() {
    // Create a copy of the original array to avoid modifying it directly
    const shuffledArray = structuredClone(pokemonList);

    // Perform Fisher-Yates shuffle
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    for (let i = 0; i < shuffledArray.length; i++) {
      shuffledArray[i].id = uniqid(); // You need to implement generateUniqueId function
    }
    return shuffledArray;
  }
  return (
    <>
      <div className={`picDiv ${gameOver ? "blur" : ""}`}>
        <header className="header">
          <h1 className="title">Pokemon Memory Card Game</h1>
        </header>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <GameBoard
            pokemonList={pokemonList}
            isFlipped={isFlipped}
            onClick={clearAndRefetch}
          ></GameBoard>
        )}
        <h2 className="score-board">
          Score: {score < 10 ? score : "You Win!"}
        </h2>
      </div>
      {gameOver && (
        <GameOverScreen replay={replayGame} score={score}></GameOverScreen>
      )}
      <footer className="footer"></footer>
    </>
  );
}

export default App;
