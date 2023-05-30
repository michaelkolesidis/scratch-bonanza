import "./style.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGame from "../../stores/useGame";
import { getLocalStorage, setLocalStorage } from "../../stores/utils";
import Card from "./components/scratchCard/ScratchCard";
import Modal from "../../components/modal/Modal";
import MainButton from "../../components/mainButton/MainButton";
import HelpButton from "../../components/helpButton/HelpButton";

/**
 * Sound
 */
const magicSound = new Audio("./sounds/magic.mp3");
magicSound.volume = 0.2;

type CardRefType = {
  resetScratchCards: () => void;
};

export const Play = () => {
  const navigate = useNavigate();
  const {
    valuesUrl,
    modal,
    revealed,
    resetRevealed,
    start,
    end,
    coins,
    cards,
    addCard,
  } = useGame();
  const [scratchCard, setScratchCard] = useState<
    (0 | 1 | 10 | 100 | 1000)[] | undefined
  >();
  const [key, setKey] = useState(0);
  const cardRef = useRef<CardRefType>(null);

  useEffect(() => {
    start();
    resetRevealed();
    fetchScratchCard();
  }, []);

  useEffect(() => {
    revealed === 4 && end();
  }, [revealed]);

  const fetchScratchCard = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(valuesUrl, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setScratchCard(data);
      } else {
        console.error("Failed to fetch scratch card: ", response.status);
      }
    } catch (error) {
      console.error("Error while fetching scratch card: ", error);
    }
  };

  const resetAllScratchCards = () => {
    if (cardRef.current) {
      cardRef.current.resetScratchCards();
    }
  };

  /**
   * Storage and state initiation
   */
  useEffect(() => {
    // Coins
    const storedCoins = getLocalStorage("coins");
    if (storedCoins === null) {
      setLocalStorage("coins", "0");
    }

    // Cards
    const storedCards = getLocalStorage("cards");
    if (storedCards === null) {
      setLocalStorage("cards", "0");
    }
    addCard();
  }, []);

  /**
   * Button event handling
   */
  const handleNew = async () => {
    magicSound.currentTime = 0;
    magicSound.play();
    start();
    addCard();
    resetRevealed();
    resetAllScratchCards();
    fetchScratchCard();
    setKey((prevKey) => prevKey + 1); // Update the key to trigger component refresh
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="play-page">
      {!scratchCard ? (
        <div className="loading">LOADING...</div>
      ) : (
        <>
          <img src="./assets/logo.png" className="logo-small" />
          <Card key={key} ref={cardRef} card={scratchCard} />

          <MainButton
            handleClick={handleNew}
            text="NEW"
            disabled={revealed !== 4}
          />
          <MainButton handleClick={handleBack} text="BACK" />

          <HelpButton />
          {modal && <Modal />}

          <div className="stats">
            <div>CARDS : {cards}</div>
            <div>
              {coins} <img className="stats-coin" src="./assets/coin.svg" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
