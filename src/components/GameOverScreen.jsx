import "../styles/GameOver.css";
export default function GameOverScreen({ score, replay }) {
  return (
    <div className="game-over-screen">
      <p>{score < 10 ? `Final Score ${score}/10` : "You Win!"}</p>
      <button className="replay-game-button" onClick={replay}>
        Start Over?
      </button>
    </div>
  );
}
