import "./style.css";
import { useEffect, useState } from "react";
import ScratchCard from "react-scratchcard-v2";

const scratchingSound = new Audio("./sounds/scratching.mp3");
scratchingSound.loop = true;

interface IScratchAreaProps {
  value: 0 | 10 | 100 | 1000;
}

const ScratchArea = ({ value }: IScratchAreaProps) => {
  const [
    amount,
    // setAmount
  ] = useState(value);
  const [
    amountSrc,
    // setAmountSrc
  ] = useState(`./assets/${amount}.svg`);
  const [
    iconSrc,
    // setIconSrc
  ] = useState(amount === 0 ? "./assets/banana.svg" : "./assets/coin.svg");

  const [isClicked, setIsClicked] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0) {
      setIsClicked(true);
      setIsScratching(true);
    }
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    setIsScratching(false);
  };

  const handleMouseEnter = () => {
    if (isClicked) {
      setIsScratching(true);
    }
  };

  const handleMouseLeave = () => {
    if (isClicked) {
      setIsScratching(false);
    }
  };

  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isClicked) {
        setIsClicked(false);
        setIsScratching(false);
      }
    };
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isClicked]);

  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isClicked) {
        setIsClicked(false);
        setIsScratching(false);
      }
    };

    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isClicked]);

  useEffect(() => {
    if (isScratching) {
      scratchingSound.currentTime = 0;
      scratchingSound.volume = 0.3;
      scratchingSound.play();
    } else {
      scratchingSound.pause();
    }
  }, [isScratching]);

  return (
    <div
      className="scratcharea-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ScratchCard
        width={170}
        height={170}
        image="./assets/scratch_card.svg"
        finishPercent={60}
        onComplete={() => console.log("complete")}
        brushSize={15}
        fadeOutOnComplete={false}
      >
        <div className="scratcharea">
          <img className="revealed-icon" alt="revealed icon" src={iconSrc} />
          <img
            className="revealed-amount"
            alt="revealed amount"
            src={amountSrc}
          />
        </div>
      </ScratchCard>
      <div
        onClick={() => console.log("Help modal opened!")}
        className="help-button"
      />
    </div>
  );
};

export default ScratchArea;
