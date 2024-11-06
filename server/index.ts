// import * as schema from "@/server/schema";
// import { sql } from "@vercel/postgres";

// import { drizzle } from "drizzle-orm/vercel-postgres";

// export const db = drizzle(sql, { schema, logger: true });

import * as schema from "@/server/schema";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
config({ path: ".env.local" });
console.log(process.env.DATABASE_URL);
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema, logger: true });