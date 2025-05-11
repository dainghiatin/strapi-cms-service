'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

/**
 * wallet router
 */

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
    {
      method: 'GET',
      path: '/wallets/my-wallet',
      handler: 'wallet.getWalletByJwt',
      config: {
        auth: {
          strategy: 'jwt'
        },
        policies: [],
      },
    }
  ],
};
