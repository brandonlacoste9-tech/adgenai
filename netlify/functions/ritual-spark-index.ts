/**
 * Ritual: Spark Index
 * 
 * A Netlify Function that serves the Codex Spark Registry.
 * This ritual reads codex_spark_index.json and returns the living
 * lineage of Spark-born applications inscribed through Cursor.
 * 
 * Invocation: GET /.netlify/functions/ritual-spark-index
 * Returns: JSON manifest of all registered apps and rituals
 */

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { readFile } from "fs/promises";
import { join } from "path";

interface SparkApp {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  tech_stack: string[];
  deployed_url?: string;
  features: string[];
  rituals: string[];
  created_at: string;
  last_updated: string;
}

interface CodexSparkIndex {
  version: string;
  codex: string;
  timestamp: string;
  description: string;
  apps: SparkApp[];
  metadata: {
    total_apps: number;
    active_rituals: number;
    governance: string;
    executor: string;
    deployment_ground: string;
  };
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {
    // Support CORS for cross-origin requests
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
    };

    // Handle CORS preflight
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 204,
        headers,
        body: "",
      };
    }

    // Only allow GET requests
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          error: "Method not allowed",
          message: "This ritual only accepts GET invocations",
        }),
      };
    }

    // Read the codex from the project root
    const codexPath = join(process.cwd(), "codex_spark_index.json");
    const codexData = await readFile(codexPath, "utf-8");
    const codex: CodexSparkIndex = JSON.parse(codexData);

    // Optional query parameters for filtering
    const { app_id, status, type } = event.queryStringParameters || {};

    let filteredApps = codex.apps;

    if (app_id) {
      filteredApps = filteredApps.filter((app) => app.id === app_id);
    }

    if (status) {
      filteredApps = filteredApps.filter((app) => app.status === status);
    }

    if (type) {
      filteredApps = filteredApps.filter((app) => app.type === type);
    }

    // Construct response
    const response = {
      ...codex,
      apps: filteredApps,
      metadata: {
        ...codex.metadata,
        total_apps: filteredApps.length,
        query_applied: { app_id, status, type },
        invoked_at: new Date().toISOString(),
      },
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response, null, 2),
    };
  } catch (error) {
    console.error("Ritual invocation failed:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Ritual invocation failed",
        message: error instanceof Error ? error.message : "Unknown error",
        codex: "spark-registry",
        status: "error",
      }),
    };
  }
};

export { handler };
