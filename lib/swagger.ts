import { createSwaggerSpec } from "next-swagger-doc";

export const swaggerDocument = createSwaggerSpec({
  apiFolder: "app/api", // auto-scan
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Brewlog Coffee API",
      version: "1.0.0",
      description: "API documentation for Coffee management",
    },
    components: {
      schemas: {
        Coffee: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            roastery: { type: "string" },
            country: { type: "string" },
            name: { type: "string" },
            roast_level: { type: "string", enum: ["LIGHT", "MEDIUM", "DARK"] },
            roast_date: { type: "string", format: "date-time", nullable: true },
            weight: { type: "number" },
            price: { type: "number" },
            flavor_profile: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
  },
});
