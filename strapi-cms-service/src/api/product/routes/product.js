'use strict';

/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product', {
  config: {
    find: {
      auth: {
        strategy: 'jwt',
        scope: ['api::product.product.find']
      },
      policies: [],
    }
  }
});
