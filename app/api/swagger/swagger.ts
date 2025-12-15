import { createSwaggerSpec } from "next-swagger-doc";

export const swaggerDocument = createSwaggerSpec({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Next.js API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Coffee: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            size: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apiFolder: "app/api",
});
