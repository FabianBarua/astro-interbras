import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const Category = sqliteTable("category", {
  id: text().primaryKey(),
  name: text(),
  description: text(),
  shortDescription: text(),
});

export const Product = sqliteTable("product", 
  {
  id: text().primaryKey(),
  category_id: text().references(() => Category.id, {onDelete: 'cascade', onUpdate:'cascade'}),
  name: text(),
  review: text(),
  included: text(),
  specs: text(),
});

export const Color = sqliteTable("color", {
  id: int().primaryKey({ autoIncrement: true }),
  color: text(),
});

export const Volt = sqliteTable("volt", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
});

export const Variant = sqliteTable("variant", {
  id: int().primaryKey({ autoIncrement: true }),
  product_id: text().references(() => Product.id, {onDelete: 'cascade', onUpdate:'cascade'}),
  color_id: int().references(() => Color.id, {onDelete: 'set null', onUpdate:'cascade'}),
  volt_id: int().references(() => Volt.id , {onDelete: 'set null', onUpdate:'cascade'}),
  catalog_id: int().references(() => Catalog.id, {onDelete: 'set null', onUpdate:'cascade'}).unique(),
});

export const Catalog = sqliteTable("catalog", {
  id: int().primaryKey(),
  name: text(),
  price: real(),
  status_id : int().references(() => Status.id, {onDelete: 'set null', onUpdate:'cascade'})
} );

export const Status = sqliteTable("status", {
  id: int().primaryKey({ autoIncrement: true}),
  name: text(),
})

export const Photo = sqliteTable("photo", {
  id: int().primaryKey({ autoIncrement: true }),
  variant_id: int().references(() => Variant.id, {onDelete: 'cascade', onUpdate:'cascade'}),
  url: text(),
  order: int(),
});
