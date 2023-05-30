import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getLocalStorage, setLocalStorage } from "./utils";

type State = {
  // Endpoint
  valuesUrl: string;

  // Modal
  modal: boolean;
  setModal: (isOpen: boolean) => void;

  // Cards - total scratchcards used
  cards: number;
  addCard: () => void;
  resetCards: () => void;

  // Coints - total winnings
  coins: number;
  addCoins: (value: number) => void;
  resetCoins: () => void;

  // Scratchable Areas
  revealed: number;
  reveal: () => void;
  resetRevealed: () => void;

  // Phase
  phase: string;
  setPhase: (gamePhase: string) => void;
  start: () => void;
  end: () => void;
};

const store = create<State>()(
  subscribeWithSelector((set) => ({
    /**
     *  Endpoint
     *  (different endpoints for running locally and for deployment)
     */
    valuesUrl: /(localhost)/.test(window.location.href)
      ? "http://localhost:4000/values"
      : "https://scratch-bonanza.onrender.com/values",

    /**
     *  Modal
     *  (is the help modal open)
     */
    modal: false,
    setModal: (isOpen: boolean) => {
      set(() => {
        return {
          modal: isOpen,
        };
      });
    },

    /**
     *  Total Cards
     *  (how many cards has the player used)
     */
    cards: Number(getLocalStorage("cards")) || 0,
    addCard: () => {
      setLocalStorage("cards", Number(getLocalStorage("cards")) + 1);
      set((state) => ({ cards: state.cards + 1 }));
    },
    resetCards: () => {
      set((state) => {
        if (state.phase === "ready" || state.phase === "ended") {
          return { cards: 0 };
        } else if (state.phase === "playing") {
          return { cards: 1 };
        }
        return {};
      });
    },

    /**
     *  Coins
     *  (total amount of winnings for the player)
     */
    coins: Number(getLocalStorage("coins")) || 0,
    addCoins: (value: number) => {
      setLocalStorage("coins", Number(getLocalStorage("coins")) + value);
      set((state) => ({ coins: state.coins + value }));
    },
    resetCoins: () => {
      set(() => {
        return {
          coins: 0,
        };
      });
    },

    /**
     *  Scratchable Areas
     *  (how many scratchable areas of one card are revealed at any point)
     */
    revealed: 0,
    reveal: () => set((state) => ({ revealed: Number(state.revealed) + 1 })),
    resetRevealed: () => {
      set(() => {
        return {
          revealed: 0,
        };
      });
    },

    /**
     * Phases
     * (the phase of the game)
     */
    phase: "ready", // "playing", "ended"

    setPhase: (gamePhase: string) => {
      set(() => {
        return {
          phase: gamePhase,
        };
      });
    },

    start: () => {
      set((state) => {
        if (state.phase === "ready" || state.phase === "ended") {
          return {
            phase: "playing",
          };
        }
        return {};
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing") {
          return {
            phase: "ended",
          };
        }
        return {};
      });
    },

    /**
     *  Credits
     *  (how many credits does the player have in the game)
     */
  }))
);

export default store;
