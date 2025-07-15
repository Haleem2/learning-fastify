const fastify = require('fastify')({ logger: true });
const Port = 5000;
// fastify.register(require('@fastify/swagger'), {
//     exposeRoute: true,
//     routePrefix: '/docs',
//     swagger: {
//         info: { title: 'Fastify-API' },
//         // host: `localhost:${Port}`,
//     }
// });
// fastify.register(require('@fastify/swagger-ui'));

// Register Swagger (OpenAPI spec generator)
fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'Fastify API',
      version: '1.0.0'
    }
  }
});

// Register Swagger UI (the visual interface)
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true
  }
});

fastify.register(require('./routes/items')); // Registering the items routes


const start = async () => {
    try {
        await fastify.listen({ port: Port });
        fastify.log.info(`Server is running on http://localhost:${Port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();