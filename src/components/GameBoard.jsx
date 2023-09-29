import Card from "./Card";
import "../styles/GameBoard.css";
export default function GameBoard({ pokemonList, isFlipped, onClick }) {
  return (
    <div className="game-board">
      {pokemonList.map((pokemon) => (
        <Card
          data={pokemon}
          handleCardClick={onClick}
          isFlipped={isFlipped}
          key={pokemon.id}
        ></Card>
      ))}
    </div>
  );
}
