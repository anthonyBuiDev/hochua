import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"

import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core"

import type { AdapterAccount } from "next-auth/adapters"



export const RoleEnum = pgEnum("roles", ["user", "admin"])

export const users = pgTable("user", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false),
  roles: RoleEnum("roles").default("user"),
  customerID: text("customerID"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
export const emailTokens = pgTable(
  "email_tokens",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
)

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
)

export const twoFactorTokens = pgTable(
  "two_factor_tokens",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
    userID: text("userID").references(() => users.id, { onDelete: "cascade" }),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
)



export const workspaces = pgTable("workspaces", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
}
)

export const WorkspaceRoleEnum = pgEnum("workspaceRoles", ["user", "editor", "admin"])

export const members = pgTable("members", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, { onDelete: "cascade" }),
  workspaceRoles: WorkspaceRoleEnum("workspaceRoles").default("user"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})


export const parameters = pgTable("parameters", {
  id: serial("id").primaryKey(),
  title: text("title"),
  unit: text("unit"),
  value: text("value"),
  tt: text("tt"),
  workspaceId: text("workspaceId").references(() => workspaces.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const waterLevels = pgTable("waterLevels", {
  id: serial("id").primaryKey(),
  date: text("date"),
  limitLevel: text("limitLevel"),
  emergencyLevel: text("emergencyLevel"),
  workspaceId: text("workspaceId").references(() => workspaces.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const lakeCharacteristics = pgTable("lakeCharacteristics", {
  id: serial("id").primaryKey(),
  elevation: text("elevation"),
  surfaceArea: text("surfaceArea"),
  volume: text("volume"),
  workspaceId: text("workspaceId").references(() => workspaces.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const waterLevelDischarges = pgTable(
  "waterLevelDischarge",
  {
    id: serial("id").primaryKey(),
    waterLevel: text("waterLevel"),
    gateOpening: text("gateOpening"),
    dischargeRate: text("dischargeRate"),
    type: text("type"),
    workspaceId: text("workspaceId").references(() => workspaces.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
);


export const workspaceRelations = relations(workspaces, ({ many, one }) => ({
  members: many(members, { relationName: "members" }),
  parameter: one(parameters),
  lakeCharacteristics: one(lakeCharacteristics),
  waterLevelDischarge: one(waterLevelDischarges),
  waterLevel: one(waterLevels),
}))

export const parameterWorkspaceRelations = relations(parameters, ({ one }) => ({
  workspaces: one(workspaces, {
    fields: [parameters.workspaceId],
    references: [workspaces.id],
    relationName: "parameterWorkspace",
  }),
}))

export const lakeCharacteristicsWorkspaceRelations = relations(lakeCharacteristics, ({ one }) => ({
  workspaces: one(workspaces, {
    fields: [lakeCharacteristics.workspaceId],
    references: [workspaces.id],
    relationName: "lakeCharacteristicsWorkspace",
  }),
}))

export const waterLevelDischargeWorkspaceRelations = relations(waterLevelDischarges, ({ one }) => ({
  workspaces: one(workspaces, {
    fields: [waterLevelDischarges.workspaceId],
    references: [workspaces.id],
    relationName: "waterLevelDischargeWorkspace",
  }),
}))

export const waterLevelWorkspaceRelations = relations(waterLevels, ({ one }) => ({
  workspaces: one(workspaces, {
    fields: [waterLevels.workspaceId],
    references: [workspaces.id],
    relationName: "waterLevelWorkspace",
  }),
}))

export const membersRelations = relations(members, ({ one }) => ({
  workspaces: one(workspaces, {
    fields: [members.workspaceId],
    references: [workspaces.id],
    relationName: "members",
  }),
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
    relationName: "memberUser",
  }),
}))


