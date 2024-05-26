export const swaggerOpts = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Documentacion con Swagger OPEN API Standard - Desafio3 Modulo3 API",
        description: "API de Desafio3 Modulo3, Como usar los endpoints y sus parametros",
        version: "1.0.0",
      },
    },
    apis: [`./src/docs/**/*.yml`],
  };