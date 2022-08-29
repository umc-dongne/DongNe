const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "Dong-Ne API",
    version: "1.0.0",
    description: "test"
  },
  host: "localhost:3000",
  basePath: "/",
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "x-access-token",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};

const options = {
  swaggerDefinition: swaggerDefinition,

  apis: [
    "./src/admin/Testinit/*.js",
    "./src/admin/Attendance/*.js",
    "./src/admin/Schedule/*.js",
    "./src/admin/Group/*.js",
    "./src/admin/Member/*.js",
    "./src/admin/Auth/*.js",
    "./src/user/Auth/*.js",
    "./src/admin/FinAccount/*.js",
    "./src/user/FinAccount/*.js",
    "./src/user/Schedule/*.js",
    "./src/user/Attendance/*.js",
    "./src/user/Group/*.js",
    "./src/user/Member/*.js"
  ]
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
