import { createStore, action, thunk } from "easy-peasy";

export const store = createStore({
  user: {},
  setUserId: action((state, payload) => {
    console.log("payload: ", payload);
    state.user.id = payload.id;
    state.user.username = payload.username;
    state.user.email = payload.email;
  }),
});
