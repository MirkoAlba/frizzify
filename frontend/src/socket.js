// import io from "socket.io-client";
// import { uri } from "../apollo/api";
// import { browserName } from "react-device-detect";

// let socket;

// export const initiateSocket = (token) => {
//   socket = io(uri + "/");
//   if (socket && token) socket.emit("join", { token, device: browserName });
//   console.log("joined");
// };

// export const disconnectSocket = () => {
//   if (socket) socket.disconnect();
// };

// export const subscribeToChat = (cb) => {
//   if (!socket) return true;
//   socket.on("chat", (msg) => {
//     console.log("Websocket event received!");
//     return cb(null, msg);
//   });
// };

// export const sendMessage = (room, message) => {
//   if (socket) socket.emit("chat", { message, room });
// };
