import Tilt from "react-parallax-tilt";
import { useEffect, useState } from "react";
import "../styles/Card.css";
import card_bg from "../assets/card-back.png";
export default function Card({ data, handleCardClick, isFlipped }) {
  const [interactable, setInteractable] = useState(true);
  useEffect(() => {
    let timer1 = setTimeout(() => setInteractable(true), 2000);
    return () => {
      clearTimeout(timer1);
    };
  }, [interactable]);
  return (
    <Tilt
      tiltReverse
      reset
      className={`card-container ${!isFlipped ? "front" : "back"} ${
        !isFlipped && interactable ? undefined : "pointer-events-none"
      }`}
    >
      <div
        className={!isFlipped ? "flip-card" : "flip-card clicked"}
        onClick={() => {
          if (!isFlipped) {
            handleCardClick(data);
          } else {
            null;
          }
          setInteractable(false);
        }}
        style={{ pointerEvents: interactable ? "auto" : "none" }}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="pokemon-info">
              <img
                className="pokemon-sprite"
                src={data.sprite}
                alt={data.name}
              />
              <p className="pokemon-name">{data.name}</p>
            </div>
          </div>
          <div className="flip-card-back">
            <img src={card_bg} className="card-background"></img>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
