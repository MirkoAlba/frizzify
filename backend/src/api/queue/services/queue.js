'use strict';

/**
 * queue service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::queue.queue');
