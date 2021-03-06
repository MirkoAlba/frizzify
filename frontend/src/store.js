import { createStore, action, thunk, persist, debug } from "easy-peasy";

import { queryClient, mutateClient } from "../apollo/utils";
import { CREATE_QUEUE, UPDATE_QUEUE } from "../graphql/mutations";
import { USER_QUEUES } from "../graphql/queries";

export const store = createStore(
  persist(
    {
      user: {
        id: "",
        username: "",
        email: "",

        options: {},

        queue: {
          currentSongInfo: {
            progress: null,
            currentTime: null, // "0:00"
            duration: null, // "0:00"
            isPlaying: null,
          },
          songs: [],
        },
      },

      // on login set current user data
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

      // set current queue object
      setCurrentQueue: action((state, payload) => {
        Object.assign(state.user.queue, payload);
      }),

      setCurrentSongInfo: action((state, payload) => {
        Object.assign(state.user.queue.currentSongInfo, payload);
      }),

      // save queue in api
      // payload : { songs: [...], currentSong: {...} }

      // save queue in frontend
      // await saveQueue({
      //   songs: songs.map((s) => {
      //     return s.id;
      //   }),
      //   currentSongData: {
      //     currentSongIndex: songIndex,
      //     draggerPosition,
      //     time,
      //   },
      // });
      saveQueue: thunk(async (actions, payload, { getState }) => {
        const state = getState();

        const userQueues = await queryClient({
          query: USER_QUEUES,
          variables: {
            users_permissions_user: { id: { contains: state.user.id } },
          },
        });

        const queueIds = userQueues.data?.queues?.data;

        // queueIds.forEach((id) => {});

        // if (queues) {
        //   await mutateClient({
        //     mutation: UPDATE_QUEUE,
        //     variables: {
        //       id: queueId,
        //       data: {
        //         users_permissions_user: state.user.id,
        //         songs: payload.songs,
        //         currentSongData: payload.currentSong,
        //       },
        //     },
        //   });
        // } else {
        //   await mutateClient({
        //     mutation: CREATE_QUEUE,
        //     variables: {
        //       data: {
        //         users_permissions_user: state.user.id,
        //         songs: payload.songs,
        //         currentSongData: payload.currentSong,
        //       },
        //     },
        //   });
        // }
      }),
    },
    {
      storage: "localStorage",
    }
  )
);
