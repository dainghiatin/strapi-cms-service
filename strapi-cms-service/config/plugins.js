module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER', 'strapi-uploads'),
        },
        uploadStream: {
          folder: env('CLOUDINARY_FOLDER', 'strapi-uploads'),
        },
        delete: {},
      },
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'API Documentation',
        description: 'API documentation for your Strapi project',
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
});
