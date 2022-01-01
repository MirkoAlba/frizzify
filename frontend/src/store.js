import { createStore, action, thunk, persist } from "easy-peasy";

export const store = createStore(
  persist({
    user: {
      id: "",
      username: "",
      email: "",

      options: {},

      queue: [],
    },

    setUserId: action((state, payload) => {
      state.user.id = payload.id;
      state.user.username = payload.username;
      state.user.email = payload.email;
    }),

    setMenuWidth: action((state, payload) => {
      state.user.options.menuWidth = payload ? payload : 200;
    }),

    setUserQueue: action((state, payload) => {
      state.user.queue = payload ? payload : [];
    }),
  })
);
