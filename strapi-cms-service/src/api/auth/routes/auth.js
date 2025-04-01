'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'auth.register',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
        method: 'POST',
        path: '/auth/login',
        handler: 'auth.login',
        config: {
          auth: false,
          policies: [],
        },
      },
    {
      method: 'POST',
      path: '/auth/change-password',
      handler: 'auth.changePassword',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/me',
      handler: 'auth.getMe',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/auth/update',
      handler: 'auth.updateUser',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
