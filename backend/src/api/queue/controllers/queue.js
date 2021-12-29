'use strict';

/**
 *  queue controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::queue.queue');
