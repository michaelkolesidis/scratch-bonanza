// Copyright (c) 2023 Michael Kolesidis (michael.kolesidis@gmail.com)
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

import "./style.css";
import { forwardRef, useImperativeHandle, useRef } from "react";
import ScratchArea from "../scratchArea/ScratchArea";
import ScratchCard from "react-scratchcard-v2";

interface IScratchCardProps {
  card: (0 | 1 | 10 | 100 | 1000)[];
}

const Card = forwardRef(({ card }: IScratchCardProps, ref) => {
  const scratchCardRefs = [
    useRef<ScratchCard>(null),
    useRef<ScratchCard>(null),
    useRef<ScratchCard>(null),
    useRef<ScratchCard>(null),
  ];

  useImperativeHandle(ref, () => ({
    resetScratchCards: () => {
      scratchCardRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.reset();
        }
      });
    },
  }));

  return (
    <div className="card">
      <ScratchArea ref={scratchCardRefs[0]} value={card[0]} />
      <ScratchArea ref={scratchCardRefs[1]} value={card[1]} />
      <ScratchArea ref={scratchCardRefs[2]} value={card[2]} />
      <ScratchArea ref={scratchCardRefs[3]} value={card[3]} />
    </div>
  );
});

export default Card;
