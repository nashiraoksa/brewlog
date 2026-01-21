import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    openapi: "3.1.0",
    info: {
      title: "Brewlog API",
      version: "1.0.0",
    },

    paths: {
      "/api/register": {
        post: {
          summary: "Register user",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "User created" },
          },
        },
      },

      "/api/protected": {
        get: {
          summary: "Protected endpoint (Bearer)",
          tags: ["Protected"],
          security: [{ bearerAuth: [] }],
          responses: {
            "200": { description: "Authorized" },
            "401": { description: "Unauthorized" },
          },
        },
      },

      "/api/filter/user": {
        get: {
          summary: "Get filters for current user",
          tags: ["Filters"],
          description: "Returns filters belonging to the authenticated user",
          security: [{ nextAuthSession: [] }],
          responses: {
            "200": {
              description: "User filters",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Filter" },
                  },
                },
              },
            },
            "401": { description: "Unauthorized" },
            "500": { description: "Server error" },
          },
        },
      },

      "/api/filter": {
        get: {
          summary: "Get all filters",
          tags: ["Filters"],
          description: "Returns all filters (public)",
          responses: {
            "200": {
              description: "List of filters",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Filter" },
                  },
                },
              },
            },
            "500": { description: "Server error" },
          },
        },

        post: {
          summary: "Create a filter",
          tags: ["Filters"],
          description: "Creates a filter for the authenticated user",
          security: [{ nextAuthSession: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "material", "type"],
                  properties: {
                    name: { type: "string" },
                    material: { type: "string" },
                    type: { type: "string" },
                    purchase_date: {
                      type: "string",
                      format: "date-time",
                      nullable: true,
                    },
                    details: {
                      type: "string",
                      nullable: true,
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Filter created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Filter" },
                },
              },
            },
            "401": { description: "Unauthorized" },
            "500": { description: "Server error" },
          },
        },
      },
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Paste the JWT access token returned by NextAuth",
        },
        nextAuthSession: {
          type: "apiKey",
          in: "cookie",
          name: "next-auth.session-token",
          description: "NextAuth session cookie (HttpOnly, browser-only)",
        },
      },
      schemas: {
        Filter: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            name: { type: "string" },
            material: { type: "string" },
            type: { type: "string" },
            purchase_date: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            details: {
              type: "string",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },
  });
}
