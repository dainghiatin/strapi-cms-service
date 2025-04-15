'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    try {
      const { user } = ctx.state;
      if (!user) {
        return ctx.unauthorized('You must be logged in to view products');
      }

      const { action, confirmed } = ctx.query;
      
      const filters = {
        create_user: user.id,
        ...(action && { actions: action }),
        ...(confirmed !== undefined && { confirmed: confirmed === 'true' })
      };

      const products = await strapi.entityService.findMany('api::product.product', {
        filters,
        populate: ['images']
      });

      return products;
    } catch (error) {
      return ctx.badRequest('Error fetching products', { error: error.message });
    }
  }
}));
