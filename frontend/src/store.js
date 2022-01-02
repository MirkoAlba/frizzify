import { createStore, action, thunk, persist, debug } from "easy-peasy";

export const store = createStore(
  persist({
    user: {
      id: "",
      username: "",
      email: "",

      options: {},

      //{currentSong}, [songs]
      queue: {},
    },

    // on login set current user data in store
    setUserId: action((state, payload) => {
      state.user.id = payload.id;
      state.user.username = payload.username;
      state.user.email = payload.email;
    }),

    // set nav menu width
    setMenuWidth: action((state, payload) => {
      state.user.options.menuWidth = payload ? payload : 200;
    }),

    // set array of songs in queue
    setSongsInQueue: action((state, payload) => {
      state.user.queue.songs = payload ? payload : [];
    }),

    // set current song in queue
    setCurrentSongInfo: action((state, payload) => {
      state.user.queue.currentSong = payload ? payload : {};
    }),
  })
);
