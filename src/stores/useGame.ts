import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type State = {
  isLocal: boolean;
  modal: boolean;
  setModal: (isOpen: boolean) => void;
  coins: number;
  addCoins: (value: number) => void;
  revealed: number;
  reveal: () => void;
  resetRevealed: () => void;
};

const store = create<State>()(
  subscribeWithSelector((set) => ({
    /**
     *  Is the game running locally?
     */
    isLocal: /(localhost)/.test(window.location.href),
    /**
     *  Modal
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
     *  Coins
     */
    coins: 0,
    addCoins: (value: number) => {
      set((state) => ({ coins: state.coins + value }));
    },
    /**
     *  Revealed Areas
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
     *  Total Areas Scratched
     */
    /**
     *  Credits
     */
  }))
);

export default store;
