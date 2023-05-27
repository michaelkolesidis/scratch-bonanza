import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type State = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const store = create<State>()(
  subscribeWithSelector((set) => ({
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
      set((state) => ({ count: state.count - 1 }));
    },
  }))
);

export default store;
