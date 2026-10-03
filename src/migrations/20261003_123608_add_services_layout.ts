import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pc_cal_to_act_cen" DROP CONSTRAINT "pc_cal_to_act_cen_parent_id_fk";
  ALTER TABLE "pc_com_gri" DROP CONSTRAINT "pc_com_gri_parent_id_fk";
  ALTER TABLE "pc_con_col" DROP CONSTRAINT "pc_con_col_parent_id_fk";
  ALTER TABLE "pc_emb_bas" DROP CONSTRAINT "pc_emb_bas_parent_id_fk";
  ALTER TABLE "pc_faq_acc" DROP CONSTRAINT "pc_faq_acc_parent_id_fk";
  ALTER TABLE "pc_fea_ben" DROP CONSTRAINT "pc_fea_ben_parent_id_fk";
  ALTER TABLE "pc_fea_gri_bas" DROP CONSTRAINT "pc_fea_gri_bas_parent_id_fk";
  ALTER TABLE "pc_fea_ste" DROP CONSTRAINT "pc_fea_ste_parent_id_fk";
  ALTER TABLE "pc_her_bas" DROP CONSTRAINT "pc_her_bas_parent_id_fk";
  ALTER TABLE "pc_pri_car" DROP CONSTRAINT "pc_pri_car_parent_id_fk";
  ALTER TABLE "pc_sta_gri" DROP CONSTRAINT "pc_sta_gri_parent_id_fk";
  ALTER TABLE "pc_tea_gri" DROP CONSTRAINT "pc_tea_gri_parent_id_fk";
  ALTER TABLE "_pc_cal_to_act_cen_v" DROP CONSTRAINT "_pc_cal_to_act_cen_v_parent_id_fk";
  ALTER TABLE "_pc_com_gri_v" DROP CONSTRAINT "_pc_com_gri_v_parent_id_fk";
  ALTER TABLE "_pc_con_col_v" DROP CONSTRAINT "_pc_con_col_v_parent_id_fk";
  ALTER TABLE "_pc_emb_bas_v" DROP CONSTRAINT "_pc_emb_bas_v_parent_id_fk";
  ALTER TABLE "_pc_faq_acc_v" DROP CONSTRAINT "_pc_faq_acc_v_parent_id_fk";
  ALTER TABLE "_pc_fea_ben_v" DROP CONSTRAINT "_pc_fea_ben_v_parent_id_fk";
  ALTER TABLE "_pc_fea_gri_bas_v" DROP CONSTRAINT "_pc_fea_gri_bas_v_parent_id_fk";
  ALTER TABLE "_pc_fea_ste_v" DROP CONSTRAINT "_pc_fea_ste_v_parent_id_fk";
  ALTER TABLE "_pc_her_bas_v" DROP CONSTRAINT "_pc_her_bas_v_parent_id_fk";
  ALTER TABLE "_pc_pri_car_v" DROP CONSTRAINT "_pc_pri_car_v_parent_id_fk";
  ALTER TABLE "_pc_sta_gri_v" DROP CONSTRAINT "_pc_sta_gri_v_parent_id_fk";
  ALTER TABLE "_pc_tea_gri_v" DROP CONSTRAINT "_pc_tea_gri_v_parent_id_fk";
   CREATE TYPE "public"."enum_services_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_services_blocks_archive_relation_to" AS ENUM('posts', 'services', 'case-studies', 'portfolio');
  CREATE TYPE "public"."enum_services_blocks_logo_banner_display_type" AS ENUM('customers', 'technologies');
  CREATE TYPE "public"."enum_services_blocks_testimonial_layout" AS ENUM('single', 'carousel');
  CREATE TYPE "public"."enum__services_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__services_v_blocks_archive_relation_to" AS ENUM('posts', 'services', 'case-studies', 'portfolio');
  CREATE TYPE "public"."enum__services_v_blocks_logo_banner_display_type" AS ENUM('customers', 'technologies');
  CREATE TYPE "public"."enum__services_v_blocks_testimonial_layout" AS ENUM('single', 'carousel');
  CREATE TABLE "services_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_services_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_services_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_awards_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_logo_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"display_type" "enum_services_blocks_logo_banner_display_type" DEFAULT 'customers',
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_services_blocks_testimonial_layout" DEFAULT 'single',
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__services_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__services_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_awards_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_logo_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"display_type" "enum__services_v_blocks_logo_banner_display_type" DEFAULT 'customers',
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__services_v_blocks_testimonial_layout" DEFAULT 'single',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "services_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "services_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "_services_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "services_blocks_archive" ADD CONSTRAINT "services_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_awards_list" ADD CONSTRAINT "services_blocks_awards_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_form_block" ADD CONSTRAINT "services_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_form_block" ADD CONSTRAINT "services_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_logo_banner" ADD CONSTRAINT "services_blocks_logo_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block" ADD CONSTRAINT "services_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_media_block" ADD CONSTRAINT "services_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonial" ADD CONSTRAINT "services_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_archive" ADD CONSTRAINT "_services_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_awards_list" ADD CONSTRAINT "_services_v_blocks_awards_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form_block" ADD CONSTRAINT "_services_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_form_block" ADD CONSTRAINT "_services_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_logo_banner" ADD CONSTRAINT "_services_v_blocks_logo_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block" ADD CONSTRAINT "_services_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_media_block" ADD CONSTRAINT "_services_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonial" ADD CONSTRAINT "_services_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_blocks_archive_order_idx" ON "services_blocks_archive" USING btree ("_order");
  CREATE INDEX "services_blocks_archive_parent_id_idx" ON "services_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_archive_path_idx" ON "services_blocks_archive" USING btree ("_path");
  CREATE INDEX "services_blocks_archive_locale_idx" ON "services_blocks_archive" USING btree ("_locale");
  CREATE INDEX "services_blocks_awards_list_order_idx" ON "services_blocks_awards_list" USING btree ("_order");
  CREATE INDEX "services_blocks_awards_list_parent_id_idx" ON "services_blocks_awards_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_awards_list_path_idx" ON "services_blocks_awards_list" USING btree ("_path");
  CREATE INDEX "services_blocks_awards_list_locale_idx" ON "services_blocks_awards_list" USING btree ("_locale");
  CREATE INDEX "services_blocks_form_block_order_idx" ON "services_blocks_form_block" USING btree ("_order");
  CREATE INDEX "services_blocks_form_block_parent_id_idx" ON "services_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_form_block_path_idx" ON "services_blocks_form_block" USING btree ("_path");
  CREATE INDEX "services_blocks_form_block_locale_idx" ON "services_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "services_blocks_form_block_form_idx" ON "services_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "services_blocks_logo_banner_order_idx" ON "services_blocks_logo_banner" USING btree ("_order");
  CREATE INDEX "services_blocks_logo_banner_parent_id_idx" ON "services_blocks_logo_banner" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_logo_banner_path_idx" ON "services_blocks_logo_banner" USING btree ("_path");
  CREATE INDEX "services_blocks_logo_banner_locale_idx" ON "services_blocks_logo_banner" USING btree ("_locale");
  CREATE INDEX "services_blocks_media_block_order_idx" ON "services_blocks_media_block" USING btree ("_order");
  CREATE INDEX "services_blocks_media_block_parent_id_idx" ON "services_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_media_block_path_idx" ON "services_blocks_media_block" USING btree ("_path");
  CREATE INDEX "services_blocks_media_block_locale_idx" ON "services_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "services_blocks_media_block_media_idx" ON "services_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "services_blocks_testimonial_order_idx" ON "services_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonial_parent_id_idx" ON "services_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonial_path_idx" ON "services_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "services_blocks_testimonial_locale_idx" ON "services_blocks_testimonial" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_archive_order_idx" ON "_services_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_archive_parent_id_idx" ON "_services_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_archive_path_idx" ON "_services_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_archive_locale_idx" ON "_services_v_blocks_archive" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_awards_list_order_idx" ON "_services_v_blocks_awards_list" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_awards_list_parent_id_idx" ON "_services_v_blocks_awards_list" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_awards_list_path_idx" ON "_services_v_blocks_awards_list" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_awards_list_locale_idx" ON "_services_v_blocks_awards_list" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_form_block_order_idx" ON "_services_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_form_block_parent_id_idx" ON "_services_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_form_block_path_idx" ON "_services_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_form_block_locale_idx" ON "_services_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_form_block_form_idx" ON "_services_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_services_v_blocks_logo_banner_order_idx" ON "_services_v_blocks_logo_banner" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_logo_banner_parent_id_idx" ON "_services_v_blocks_logo_banner" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_logo_banner_path_idx" ON "_services_v_blocks_logo_banner" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_logo_banner_locale_idx" ON "_services_v_blocks_logo_banner" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_media_block_order_idx" ON "_services_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_media_block_parent_id_idx" ON "_services_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_media_block_path_idx" ON "_services_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_media_block_locale_idx" ON "_services_v_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_media_block_media_idx" ON "_services_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_testimonial_order_idx" ON "_services_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonial_parent_id_idx" ON "_services_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonial_path_idx" ON "_services_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_testimonial_locale_idx" ON "_services_v_blocks_testimonial" USING btree ("_locale");
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_rels_categories_id_idx" ON "services_rels" USING btree ("categories_id","locale");
  CREATE INDEX "services_rels_portfolio_id_idx" ON "services_rels" USING btree ("portfolio_id","locale");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "_services_v_rels_categories_id_idx" ON "_services_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX "_services_v_rels_portfolio_id_idx" ON "_services_v_rels" USING btree ("portfolio_id","locale");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_awards_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_logo_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_awards_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_logo_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_blocks_archive" CASCADE;
  DROP TABLE "services_blocks_awards_list" CASCADE;
  DROP TABLE "services_blocks_form_block" CASCADE;
  DROP TABLE "services_blocks_logo_banner" CASCADE;
  DROP TABLE "services_blocks_media_block" CASCADE;
  DROP TABLE "services_blocks_testimonial" CASCADE;
  DROP TABLE "_services_v_blocks_archive" CASCADE;
  DROP TABLE "_services_v_blocks_awards_list" CASCADE;
  DROP TABLE "_services_v_blocks_form_block" CASCADE;
  DROP TABLE "_services_v_blocks_logo_banner" CASCADE;
  DROP TABLE "_services_v_blocks_media_block" CASCADE;
  DROP TABLE "_services_v_blocks_testimonial" CASCADE;
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_categories_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_portfolio_fk";
  
  ALTER TABLE "services_rels" DROP CONSTRAINT "services_rels_testimonials_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_categories_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_portfolio_fk";
  
  ALTER TABLE "_services_v_rels" DROP CONSTRAINT "_services_v_rels_testimonials_fk";
  
  DROP INDEX "services_rels_categories_id_idx";
  DROP INDEX "services_rels_portfolio_id_idx";
  DROP INDEX "services_rels_testimonials_id_idx";
  DROP INDEX "_services_v_rels_categories_id_idx";
  DROP INDEX "_services_v_rels_portfolio_id_idx";
  DROP INDEX "_services_v_rels_testimonials_id_idx";
  ALTER TABLE "services_rels" DROP COLUMN "categories_id";
  ALTER TABLE "services_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "services_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "categories_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "_services_v_rels" DROP COLUMN "testimonials_id";
  DROP TYPE "public"."enum_services_blocks_archive_populate_by";
  DROP TYPE "public"."enum_services_blocks_archive_relation_to";
  DROP TYPE "public"."enum_services_blocks_logo_banner_display_type";
  DROP TYPE "public"."enum_services_blocks_testimonial_layout";
  DROP TYPE "public"."enum__services_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__services_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__services_v_blocks_logo_banner_display_type";
   ALTER TABLE "pc_cal_to_act_cen" ADD CONSTRAINT "pc_cal_to_act_cen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_com_gri" ADD CONSTRAINT "pc_com_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_con_col" ADD CONSTRAINT "pc_con_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_emb_bas" ADD CONSTRAINT "pc_emb_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_faq_acc" ADD CONSTRAINT "pc_faq_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_fea_ben" ADD CONSTRAINT "pc_fea_ben_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_fea_gri_bas" ADD CONSTRAINT "pc_fea_gri_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_fea_ste" ADD CONSTRAINT "pc_fea_ste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_her_bas" ADD CONSTRAINT "pc_her_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_pri_car" ADD CONSTRAINT "pc_pri_car_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_sta_gri" ADD CONSTRAINT "pc_sta_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "pc_tea_gri" ADD CONSTRAINT "pc_tea_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
   ALTER TABLE "_pc_cal_to_act_cen_v" ADD CONSTRAINT "_pc_cal_to_act_cen_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_com_gri_v" ADD CONSTRAINT "_pc_com_gri_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_con_col_v" ADD CONSTRAINT "_pc_con_col_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_emb_bas_v" ADD CONSTRAINT "_pc_emb_bas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_faq_acc_v" ADD CONSTRAINT "_pc_faq_acc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_fea_ben_v" ADD CONSTRAINT "_pc_fea_ben_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_fea_gri_bas_v" ADD CONSTRAINT "_pc_fea_gri_bas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_fea_ste_v" ADD CONSTRAINT "_pc_fea_ste_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_her_bas_v" ADD CONSTRAINT "_pc_her_bas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_pri_car_v" ADD CONSTRAINT "_pc_pri_car_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_sta_gri_v" ADD CONSTRAINT "_pc_sta_gri_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
   ALTER TABLE "_pc_tea_gri_v" ADD CONSTRAINT "_pc_tea_gri_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
  DROP TYPE "public"."enum__services_v_blocks_testimonial_layout";`)
}
