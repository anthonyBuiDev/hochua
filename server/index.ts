import * as schema from "@/server/schema";
import { sql } from '@vercel/postgres';
import {
  pgTable,

  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/vercel-postgres';
;

export const db = drizzle(sql, { schema, logger: true })

export const ExampleTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export const getExampleTable = async () => {
  const selectResult = await db.select().from(ExampleTable);
  console.log('Results', selectResult);
};