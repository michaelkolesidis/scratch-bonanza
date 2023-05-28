import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type State = {
  coins: number;
  increment: (value: number) => void;
};

const store = create<State>()(
  subscribeWithSelector((set) => ({
    coins: 0,
    increment: (value: number) => {
      set((state) => ({ coins: state.coins + value }));
    },
  }))
);

export default store;
