import { createStore, action, thunk, persist } from "easy-peasy";

export const store = createStore(
  persist({
    user: {
      id: "",
      username: "",
      email: "",
    },
    setUserId: action((state, payload) => {
      state.user.id = payload.id;
      state.user.username = payload.username;
      state.user.email = payload.email;
    }),
  })
);
