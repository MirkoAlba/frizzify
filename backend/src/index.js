"use strict";

const _ = require("lodash");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  // register({ strapi }) {
  //   const extensionService = strapi.plugin("graphql").service("extension");

  //   extensionService.use({
  //     resolversConfig: {
  //       "Mutation.register": {
  //         // middlewares: [
  //         //   /**
  //         //    * Basic middleware example #1
  //         //    * Log resolving time in console
  //         //    */
  //         //   async (next, parent, args, context, info) => {
  //         //     console.log("res: ", context.koaContext);

  //         //     return next(parent, args, context, info);
  //         //   },
  //         // ],
  //         // auth: false,
  //         policies: [
  //           (context, { strapi }) => {
  //             console.log(context.args);
  //           },
  //         ],
  //       },
  //     },
  //   });
  // },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const { Server } = require("socket.io");
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    var registeredUsers = [];

    // prendo tutte le mail degli utenti registrati
    try {
      registeredUsers = await strapi
        .service("plugin::users-permissions.user")
        .fetchAll();
    } catch (e) {
      console.log(e);
    }

    io.on("connection", function (socket) {
      // console.log("connesso");

      // dal client che entra nella room mi faccio dare il token e il device da cui ha fatto l'accesso
      socket.on("join", function ({ token, device }) {
        // nel token c'è l'id dell'account
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;
        // prendo la mail dell'account
        const userEmail = registeredUsers.filter((u) => {
          return userId === u.id;
        })[0].email;

        socket.join(userEmail); // We are using room of socket io

        console.log(
          `User from account: ${userEmail} joined from device: ${device}`
        );

        // setInterval(() => {
        io.to(userEmail).emit("prova", "CIAO BELLO");
        // }, 3000);

        // count clients in specific room
        console.log(
          `room ${userEmail} size: `,
          io.sockets.adapter.rooms.get(userEmail).size
        );
      });
    });
  },
};
