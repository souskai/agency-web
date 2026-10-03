import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_services_hero_type" AS ENUM('none', 'highImpact', 'heroGrid', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__services_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__services_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__services_v_version_hero_type" AS ENUM('none', 'highImpact', 'heroGrid', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_page_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_page_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_services_page_hero_type" AS ENUM('none', 'highImpact', 'heroGrid', 'mediumImpact', 'lowImpact');
  ALTER TYPE "public"."enum_users_roles" ADD VALUE 'publisher' BEFORE 'viewer';
  CREATE TABLE "services_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "_services_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "services_page_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_page_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_services_page_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page_locales" (
  	"hero_type" "enum_services_page_hero_type" DEFAULT 'lowImpact' NOT NULL,
  	"hero_rich_text" jsonb,
  	"hero_eyebrow" varchar,
  	"hero_description" varchar,
  	"hero_media_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"legal_pages_id" integer
  );
  
  DROP INDEX "services_rels_services_id_idx";
  DROP INDEX "_services_v_rels_services_id_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'Souskai';
  ALTER TABLE "services_locales" ADD COLUMN "hero_type" "enum_services_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "services_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "services_locales" ADD COLUMN "hero_eyebrow" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "hero_description" varchar;
  ALTER TABLE "services_locales" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "services_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_hero_type" "enum__services_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_hero_eyebrow" varchar;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_hero_description" varchar;
  ALTER TABLE "_services_v_locales" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_services_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "case_studies_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "twitter_handle" varchar;
  ALTER TABLE "services_hero_links" ADD CONSTRAINT "services_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_hero_links" ADD CONSTRAINT "_services_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_hero_links" ADD CONSTRAINT "services_page_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_locales" ADD CONSTRAINT "services_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_hero_links_order_idx" ON "services_hero_links" USING btree ("_order");
  CREATE INDEX "services_hero_links_parent_id_idx" ON "services_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_hero_links_locale_idx" ON "services_hero_links" USING btree ("_locale");
  CREATE INDEX "_services_v_version_hero_links_order_idx" ON "_services_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_services_v_version_hero_links_parent_id_idx" ON "_services_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_hero_links_locale_idx" ON "_services_v_version_hero_links" USING btree ("_locale");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_locale_idx" ON "header_nav_items_children" USING btree ("_locale");
  CREATE INDEX "services_page_hero_links_order_idx" ON "services_page_hero_links" USING btree ("_order");
  CREATE INDEX "services_page_hero_links_parent_id_idx" ON "services_page_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_page_hero_links_locale_idx" ON "services_page_hero_links" USING btree ("_locale");
  CREATE INDEX "services_page_hero_hero_media_idx" ON "services_page_locales" USING btree ("hero_media_id");
  CREATE UNIQUE INDEX "services_page_locales_locale_parent_id_unique" ON "services_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_page_rels_order_idx" ON "services_page_rels" USING btree ("order");
  CREATE INDEX "services_page_rels_parent_idx" ON "services_page_rels" USING btree ("parent_id");
  CREATE INDEX "services_page_rels_path_idx" ON "services_page_rels" USING btree ("path");
  CREATE INDEX "services_page_rels_locale_idx" ON "services_page_rels" USING btree ("locale");
  CREATE INDEX "services_page_rels_pages_id_idx" ON "services_page_rels" USING btree ("pages_id","locale");
  CREATE INDEX "services_page_rels_posts_id_idx" ON "services_page_rels" USING btree ("posts_id","locale");
  CREATE INDEX "services_page_rels_services_id_idx" ON "services_page_rels" USING btree ("services_id","locale");
  CREATE INDEX "services_page_rels_case_studies_id_idx" ON "services_page_rels" USING btree ("case_studies_id","locale");
  CREATE INDEX "services_page_rels_legal_pages_id_idx" ON "services_page_rels" USING btree ("legal_pages_id","locale");
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_hero_hero_media_idx" ON "services_locales" USING btree ("hero_media_id");
  CREATE INDEX "services_rels_locale_idx" ON "services_rels" USING btree ("locale");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id","locale");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id","locale");
  CREATE INDEX "services_rels_case_studies_id_idx" ON "services_rels" USING btree ("case_studies_id","locale");
  CREATE INDEX "services_rels_legal_pages_id_idx" ON "services_rels" USING btree ("legal_pages_id","locale");
  CREATE INDEX "_services_v_version_hero_version_hero_media_idx" ON "_services_v_locales" USING btree ("version_hero_media_id");
  CREATE INDEX "_services_v_rels_locale_idx" ON "_services_v_rels" USING btree ("locale");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_services_v_rels_case_studies_id_idx" ON "_services_v_rels" USING btree ("case_studies_id","locale");
  CREATE INDEX "_services_v_rels_legal_pages_id_idx" ON "_services_v_rels" USING btree ("legal_pages_id","locale");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id","locale");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_hero_links" CASCADE;
  DROP TABLE "_services_v_version_hero_links" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "services_page_hero_links" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "services_page_locales" CASCADE;
  DROP TABLE "services_page_rels" CASCADE;
  ALTER TABLE "services_locales" DROP CONSTRAINT "services_locales_hero_media_id_media_id_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_pages_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_posts_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_case_studies_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_legal_pages_fk";
  
  ALTER TABLE "_services_v_locales" DROP CONSTRAINT "_services_v_locales_version_hero_media_id_media_id_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_pages_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_posts_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_case_studies_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_legal_pages_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_og_image_id_media_id_fk";
  
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_roles";
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'viewer');
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  DROP INDEX "services_hero_hero_media_idx";
  DROP INDEX "services_rels_locale_idx";
  DROP INDEX "services_rels_pages_id_idx";
  DROP INDEX "services_rels_posts_id_idx";
  DROP INDEX "services_rels_case_studies_id_idx";
  DROP INDEX "services_rels_legal_pages_id_idx";
  DROP INDEX "_services_v_version_hero_version_hero_media_idx";
  DROP INDEX "_services_v_rels_locale_idx";
  DROP INDEX "_services_v_rels_pages_id_idx";
  DROP INDEX "_services_v_rels_posts_id_idx";
  DROP INDEX "_services_v_rels_case_studies_id_idx";
  DROP INDEX "_services_v_rels_legal_pages_id_idx";
  DROP INDEX "site_settings_og_image_idx";
  DROP INDEX "services_rels_services_id_idx";
  DROP INDEX "_services_v_rels_services_id_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'Agency Name';
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  ALTER TABLE "services_locales" DROP COLUMN "hero_type";
  ALTER TABLE "services_locales" DROP COLUMN "hero_rich_text";
  ALTER TABLE "services_locales" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "services_locales" DROP COLUMN "hero_description";
  ALTER TABLE "services_locales" DROP COLUMN "hero_media_id";
  ALTER TABLE "services_rels" DROP COLUMN "locale";
  ALTER TABLE "services_rels" DROP COLUMN "pages_id";
  ALTER TABLE "services_rels" DROP COLUMN "posts_id";
  ALTER TABLE "services_rels" DROP COLUMN "case_studies_id";
  ALTER TABLE "services_rels" DROP COLUMN "legal_pages_id";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_hero_type";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_hero_eyebrow";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_hero_description";
  ALTER TABLE "_services_v_locales" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "locale";
  ALTER TABLE "_services_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "case_studies_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "legal_pages_id";
  ALTER TABLE "site_settings" DROP COLUMN "og_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "twitter_handle";
  DROP TYPE "public"."enum_services_hero_links_link_type";
  DROP TYPE "public"."enum_services_hero_links_link_appearance";
  DROP TYPE "public"."enum_services_hero_type";
  DROP TYPE "public"."enum__services_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__services_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__services_v_version_hero_type";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_services_page_hero_links_link_type";
  DROP TYPE "public"."enum_services_page_hero_links_link_appearance";
  DROP TYPE "public"."enum_services_page_hero_type";`)
}
