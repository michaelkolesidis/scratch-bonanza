import "./style.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGame from "../../stores/useGame";
import Card from "./components/scratchCard/ScratchCard";
import { Modal } from "../../components/modal/Modal";

type CardRefType = {
  resetScratchCards: () => void;
};

export const Play = () => {
  const navigate = useNavigate();
  const { valuesUrl, modal, setModal, revealed, resetRevealed } = useGame();
  const [scratchCard, setScratchCard] = useState<
    (0 | 1 | 10 | 100 | 1000)[] | undefined
  >();
  const [key, setKey] = useState(0);
  const cardRef = useRef<CardRefType>(null);

  useEffect(() => {
    resetRevealed();
    fetchScratchCard();
  }, []);

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

  const handleNew = async () => {
    resetRevealed();
    resetAllScratchCards();
    fetchScratchCard();
    setKey((prevKey) => prevKey + 1); // Update the key to trigger component refresh
  };

  return (
    <div className="play-page">
      {!scratchCard ? (
        <div className="loading">LOADING...</div>
      ) : (
        <>
          <Card key={key} ref={cardRef} card={scratchCard} />
          <div
            onClick={handleNew}
            className={`button-main ${revealed !== 4 && "disabled-button"}`}
          >
            NEW
          </div>
          <div onClick={() => navigate("/")} className="button-main">
            BACK
          </div>

          <div onClick={() => setModal(true)} className="help-button" />
          {modal && <Modal />}
        </>
      )}
    </div>
  );
};
