"use strict";

// const _ = require("lodash");

// function checkBadRequest(contextBody) {
//   if (_.get(contextBody, "statusCode", 200) !== 200) {
//     const message = _.get(contextBody, "error", "Bad Request");
//     const exception = new Error(message);
//     exception.code = _.get(contextBody, "statusCode", 400);
//     exception.data = contextBody;
//     throw exception;
//   }
// }

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
  bootstrap(/*{ strapi }*/) {},
};
