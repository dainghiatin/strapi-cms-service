'use strict';

/**
 * system-info router
 */


module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/system-info/metrics',
        handler: 'system-info.getMetrics',
        config: {
          auth: false,
          policies: [],
        },
      },
      {
        method: 'POST',
        path: '/system-info/metrics',
        handler: 'system-info.updateMetrics',
        config: {
          auth: false,
          policies: [],
        },
      }
      // {
      //   method: 'GET',
      //   path: '/system-info/metrics',
      //   handler: 'system-info.getMetrics',
      //   config: {
      //     auth: false
      //   }
      // },
      // {
      //   method: 'POST',
      //   path: '/system-info/metrics',
      //   handler: 'system-info.updateMetrics',
      //   config: {
      //     auth: true
      //   }
      // }
    ]
  }
