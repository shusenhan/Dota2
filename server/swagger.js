import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Hello World API',
          version: '1.0.0',
          description: 'A simple API',
        },
    },
    apis: ['./routes/*.js']
};

const swaggerConfig = swaggerJSDoc(options);

export default swaggerConfig;