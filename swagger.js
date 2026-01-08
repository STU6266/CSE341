// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  swagger: '2.0',
  info: {
    title: 'Users API',
    description: 'CSE 341 Contacts / Users API',
  },

  schemes: ['http', 'https'],
  basePath: '/',
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
