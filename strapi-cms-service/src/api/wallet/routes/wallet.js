'use strict';

/**
 * wallet router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories; // Not used if defining custom routes only

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/wallets/favorite-wallets', // Use plural form
      handler: 'wallet.getFavoriteWallets',
      config: {
        auth: { // Simplified auth config
          strategy: 'jwt'
        },
        policies: [], // Add policies if needed, e.g., ['global::is-authenticated']
      },
    },
    {
      method: 'POST',
      path: '/wallets/transfer', // Use plural form
      handler: 'wallet.transferBetweenWallets',
      config: {
        auth: { // Simplified auth config
          strategy: 'jwt'
        },
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/wallets/internal-transfer', // Use plural form
      handler: 'wallet.transferToInternalAccount',
      config: {
        auth: { // Simplified auth config
          strategy: 'jwt'
        },
        policies: [],
      },
    },
    // If you need the default core routes (find, findOne, create, update, delete) 
    // you would typically import and spread them, or define them manually.
    // Example of adding core routes:
    // ...createCoreRouter('api::wallet.wallet').routes,
  ],
};
