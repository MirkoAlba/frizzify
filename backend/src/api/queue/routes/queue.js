'use strict';

/**
 * queue router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::queue.queue');
