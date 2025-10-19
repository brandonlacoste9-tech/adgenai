import type { Handler } from '@netlify/functions';
import fs from 'fs';
import path from 'path';

export const handler: Handler = async () => {
  try {
    const filePath = path.join(process.cwd(), 'codex_spark_index.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const apps = JSON.parse(raw);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ ok: true, count: apps.length, apps }, null, 2),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
