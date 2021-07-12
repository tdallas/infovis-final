const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');

export const registerSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
