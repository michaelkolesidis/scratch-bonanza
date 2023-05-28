import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type State = {
  modal: boolean;
  setModal: (isOpen: boolean) => void;
  coins: number;
  increment: (value: number) => void;
};

const store = create<State>()(
  subscribeWithSelector((set) => ({
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
    increment: (value: number) => {
      set((state) => ({ coins: state.coins + value }));
    },
  }))
);

export default store;
