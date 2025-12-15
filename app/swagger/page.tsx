"use client";

// @ts-expect-error: swagger-ui-react has no types
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerPage() {
  return (
    <div className="p-4">
      <SwaggerUI url="/api/swagger" />
    </div>
  );
}
