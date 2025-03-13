const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for project 1, managing contacts',
      contact: {
        name: 'Nefi Muniz',
        email: 'nefims@email.com', // not a real email tho
      },
    },
    servers: [
      {
        url: 'http://localhost:10000',
        description: 'Local server',
      },
      {
        url: 'https://cse341-node-fpek.onrender.com',
        description: 'Render server',
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'First name of the contact.',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the contact.',
            },
            email: {
              type: 'string',
              description: 'Email of the contact.',
            },
            favoriteColor: {
              type: 'string',
              description: 'Favorite color of the contact.',
            },
            birthday: {
              type: 'string',
              format: 'date',
              description: 'Birthday of the contact.',
            },
          },
          required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec