import "./style.css";
import React, { useEffect, useState } from "react";
import useGame from "../../../../stores/useGame";
import ScratchCard from "react-scratchcard-v2";

const scratchingSound = new Audio("./sounds/scratching.mp3");
scratchingSound.loop = true;

// const successSound = new Audio("./sounds/success.mp3");
// successSound.volume = 0.3;

interface IScratchAreaProps {
  value: 0 | 1 | 10 | 100 | 1000;
}

const ScratchArea = React.forwardRef<ScratchCard, IScratchAreaProps>(
  ({ value }: IScratchAreaProps, ref) => {
    const { reveal } = useGame();
    const [amount] = useState(value);
    const [amountSrc] = useState(`./assets/${amount}.svg`);
    const [iconSrc] = useState(
      amount === 0 ? "./assets/banana.svg" : "./assets/coin.svg"
    );
    const [isTouched, setIsTouched] = useState(false);
    const [isScratching, setIsScratching] = useState(false);

    // Event handlers
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

    // Attach event handlers according to device support for touch events
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

    // Handle completion of scratching
    const handleComplete = () => {
      reveal();
      // if (value > 0) {
      // successSound.play();
      // }
    };

    return (
      <div className="scratcharea-container" {...eventHandlers}>
        <ScratchCard
          ref={ref}
          width={170}
          height={170}
          image="./assets/scratch_card.png"
          finishPercent={60}
          onComplete={handleComplete}
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
      </div>
    );
  }
);

export default ScratchArea;
