import "./style.css";
import React, { useEffect, useState } from "react";
import ScratchCard from "react-scratchcard-v2";

const scratchingSound = new Audio("./sounds/scratching.mp3");
scratchingSound.loop = true;

interface IScratchAreaProps {
  value: 0 | 10 | 100 | 1000;
}

const ScratchArea = ({ value }: IScratchAreaProps) => {
  const [amount] = useState(value);
  const [amountSrc] = useState(`./assets/${amount}.svg`);
  const [iconSrc] = useState(
    amount === 0 ? "./assets/banana.svg" : "./assets/coin.svg"
  );
  const [isTouched, setIsTouched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  /*
   * Mouse functionality
   */
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0) {
      setIsTouched(true);
      setIsScratching(true);
    }
  };

  const handleMouseUp = () => {
    setIsTouched(false);
    setIsScratching(false);
  };

  const handleMouseEnter = () => {
    if (isTouched) {
      setIsScratching(true);
    }
  };

  const handleMouseLeave = () => {
    if (isTouched) {
      setIsScratching(false);
    }
  };

  // Used to pause the sound when the pointer
  // temporarily leaves the area while scratching
  useEffect(() => {
    const handleWindowMouseUp = () => {
      if (isTouched) {
        setIsTouched(false);
        setIsScratching(false);
      }
    };

    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isTouched]);

  /*
   * Touch functionality
   */
  const handleTouchStart = () => {
    setIsTouched(true);
    setIsScratching(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
    setIsScratching(false);
  };

  useEffect(() => {
    const handleWindowTouchEnd = () => {
      if (isTouched) {
        setIsTouched(false);
        setIsScratching(false);
      }
    };

    window.addEventListener("touchend", handleWindowTouchEnd);

    return () => {
      window.removeEventListener("touchend", handleWindowTouchEnd);
    };
  }, [isTouched]);

  useEffect(() => {
    if (isScratching) {
      scratchingSound.currentTime = 0;
      scratchingSound.volume = 0.3;
      scratchingSound.play();
    } else {
      scratchingSound.pause();
    }
  }, [isScratching]);

  const supportsTouchEvents = "ontouchstart" in window;
  const eventHandlers = supportsTouchEvents
    ? {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
      }
    : {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
      };

  return (
    <div className="scratcharea-container" {...eventHandlers}>
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
