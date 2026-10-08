import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_page_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_services_page_blocks_archive_relation_to" AS ENUM('posts', 'services', 'case-studies', 'portfolio');
  CREATE TYPE "public"."enum_sp_cal_to_act_cen_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_cal_to_act_cen_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_com_gri_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_com_gri_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_con_col_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_con_col_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_emb_bas_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_sp_faq_acc_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_faq_acc_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_fea_ben_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_fea_ben_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_fea_gri_bas_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_fea_gri_bas_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_fea_ste_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_fea_ste_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sp_her_bas_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_her_bas_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_services_page_blocks_logo_banner_display_type" AS ENUM('customers', 'technologies');
  CREATE TYPE "public"."enum_sp_pri_car_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sp_pri_car_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_services_page_blocks_testimonial_layout" AS ENUM('single', 'carousel');
  CREATE TABLE "services_page_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_services_page_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_services_page_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_awards_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_cal_to_act_cen_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_cal_to_act_cen_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_cal_to_act_cen_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_cal_to_act_cen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_com_gri_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_com_gri_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_com_gri_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_com_gri_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar,
  	"period" varchar,
  	"badge" varchar,
  	"highlighted" boolean
  );
  
  CREATE TABLE "sp_com_gri_features_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"included" boolean,
  	"label" varchar
  );
  
  CREATE TABLE "sp_com_gri_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "sp_com_gri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_con_col_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "sp_con_col_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_con_col_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_con_col_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_con_col" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_design_system" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_emb_bas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"aspect_ratio" "enum_sp_emb_bas_aspect_ratio" DEFAULT '16:9' NOT NULL,
  	"caption" varchar,
  	"allow_fullscreen" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_faq_acc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "sp_faq_acc_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_faq_acc_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_faq_acc_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_faq_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_fea_ben_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "sp_fea_ben_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_fea_ben_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_fea_ben_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_fea_ben" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_fea_gri_bas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "sp_fea_gri_bas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_fea_gri_bas_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_fea_gri_bas_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_fea_gri_bas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_fea_ste_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "sp_fea_ste_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_fea_ste_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_fea_ste_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_fea_ste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_her_bas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_her_bas_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_her_bas_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_her_bas_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "sp_her_bas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_logo_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"display_type" "enum_services_page_blocks_logo_banner_display_type" DEFAULT 'customers' NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_pri_car_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "sp_pri_car_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sp_pri_car_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_sp_pri_car_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sp_pri_car_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "sp_pri_car" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_services_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_sta_gri_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "sp_sta_gri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sp_tea_gri_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "sp_tea_gri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_page_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_services_page_blocks_testimonial_layout" DEFAULT 'single',
  	"block_name" varchar
  );
  
  ALTER TABLE "services_page_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "services_page_rels" ADD COLUMN "portfolio_id" integer;
  ALTER TABLE "services_page_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "services_page_blocks_archive" ADD CONSTRAINT "services_page_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_awards_list" ADD CONSTRAINT "services_page_blocks_awards_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_cal_to_act_cen_links" ADD CONSTRAINT "sp_cal_to_act_cen_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_cal_to_act_cen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_cal_to_act_cen" ADD CONSTRAINT "sp_cal_to_act_cen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_com_gri_plans_links" ADD CONSTRAINT "sp_com_gri_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_com_gri_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_com_gri_plans" ADD CONSTRAINT "sp_com_gri_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_com_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_com_gri_features_values" ADD CONSTRAINT "sp_com_gri_features_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_com_gri_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_com_gri_features" ADD CONSTRAINT "sp_com_gri_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_com_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_com_gri" ADD CONSTRAINT "sp_com_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_con_col_paragraphs" ADD CONSTRAINT "sp_con_col_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_con_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_con_col_links" ADD CONSTRAINT "sp_con_col_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_con_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_con_col" ADD CONSTRAINT "sp_con_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_design_system" ADD CONSTRAINT "services_page_blocks_design_system_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_emb_bas" ADD CONSTRAINT "sp_emb_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_faq_acc_items" ADD CONSTRAINT "sp_faq_acc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_faq_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_faq_acc_links" ADD CONSTRAINT "sp_faq_acc_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_faq_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_faq_acc" ADD CONSTRAINT "sp_faq_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_ben_items" ADD CONSTRAINT "sp_fea_ben_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_fea_ben"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_ben_links" ADD CONSTRAINT "sp_fea_ben_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_fea_ben"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_ben" ADD CONSTRAINT "sp_fea_ben_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_gri_bas_items" ADD CONSTRAINT "sp_fea_gri_bas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_fea_gri_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_gri_bas_links" ADD CONSTRAINT "sp_fea_gri_bas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_fea_gri_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_gri_bas" ADD CONSTRAINT "sp_fea_gri_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_ste_items" ADD CONSTRAINT "sp_fea_ste_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_fea_ste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_ste_links" ADD CONSTRAINT "sp_fea_ste_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_fea_ste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_fea_ste" ADD CONSTRAINT "sp_fea_ste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_form_block" ADD CONSTRAINT "services_page_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_blocks_form_block" ADD CONSTRAINT "services_page_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_her_bas_links" ADD CONSTRAINT "sp_her_bas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_her_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_her_bas_proof_items" ADD CONSTRAINT "sp_her_bas_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_her_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_her_bas" ADD CONSTRAINT "sp_her_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_logo_banner" ADD CONSTRAINT "services_page_blocks_logo_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_media_block" ADD CONSTRAINT "services_page_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page_blocks_media_block" ADD CONSTRAINT "services_page_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_pri_car_plans_features" ADD CONSTRAINT "sp_pri_car_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_pri_car_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_pri_car_plans_links" ADD CONSTRAINT "sp_pri_car_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_pri_car_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_pri_car_plans" ADD CONSTRAINT "sp_pri_car_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_pri_car"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_pri_car" ADD CONSTRAINT "sp_pri_car_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_services_index" ADD CONSTRAINT "services_page_blocks_services_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_sta_gri_metrics" ADD CONSTRAINT "sp_sta_gri_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_sta_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_sta_gri" ADD CONSTRAINT "sp_sta_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_tea_gri_members" ADD CONSTRAINT "sp_tea_gri_members_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sp_tea_gri_members" ADD CONSTRAINT "sp_tea_gri_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sp_tea_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sp_tea_gri" ADD CONSTRAINT "sp_tea_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_blocks_testimonial" ADD CONSTRAINT "services_page_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_page_blocks_archive_order_idx" ON "services_page_blocks_archive" USING btree ("_order");
  CREATE INDEX "services_page_blocks_archive_parent_id_idx" ON "services_page_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_archive_path_idx" ON "services_page_blocks_archive" USING btree ("_path");
  CREATE INDEX "services_page_blocks_archive_locale_idx" ON "services_page_blocks_archive" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_awards_list_order_idx" ON "services_page_blocks_awards_list" USING btree ("_order");
  CREATE INDEX "services_page_blocks_awards_list_parent_id_idx" ON "services_page_blocks_awards_list" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_awards_list_path_idx" ON "services_page_blocks_awards_list" USING btree ("_path");
  CREATE INDEX "services_page_blocks_awards_list_locale_idx" ON "services_page_blocks_awards_list" USING btree ("_locale");
  CREATE INDEX "sp_cal_to_act_cen_links_order_idx" ON "sp_cal_to_act_cen_links" USING btree ("_order");
  CREATE INDEX "sp_cal_to_act_cen_links_parent_id_idx" ON "sp_cal_to_act_cen_links" USING btree ("_parent_id");
  CREATE INDEX "sp_cal_to_act_cen_links_locale_idx" ON "sp_cal_to_act_cen_links" USING btree ("_locale");
  CREATE INDEX "sp_cal_to_act_cen_order_idx" ON "sp_cal_to_act_cen" USING btree ("_order");
  CREATE INDEX "sp_cal_to_act_cen_parent_id_idx" ON "sp_cal_to_act_cen" USING btree ("_parent_id");
  CREATE INDEX "sp_cal_to_act_cen_path_idx" ON "sp_cal_to_act_cen" USING btree ("_path");
  CREATE INDEX "sp_cal_to_act_cen_locale_idx" ON "sp_cal_to_act_cen" USING btree ("_locale");
  CREATE INDEX "sp_com_gri_plans_links_order_idx" ON "sp_com_gri_plans_links" USING btree ("_order");
  CREATE INDEX "sp_com_gri_plans_links_parent_id_idx" ON "sp_com_gri_plans_links" USING btree ("_parent_id");
  CREATE INDEX "sp_com_gri_plans_links_locale_idx" ON "sp_com_gri_plans_links" USING btree ("_locale");
  CREATE INDEX "sp_com_gri_plans_order_idx" ON "sp_com_gri_plans" USING btree ("_order");
  CREATE INDEX "sp_com_gri_plans_parent_id_idx" ON "sp_com_gri_plans" USING btree ("_parent_id");
  CREATE INDEX "sp_com_gri_plans_locale_idx" ON "sp_com_gri_plans" USING btree ("_locale");
  CREATE INDEX "sp_com_gri_features_values_order_idx" ON "sp_com_gri_features_values" USING btree ("_order");
  CREATE INDEX "sp_com_gri_features_values_parent_id_idx" ON "sp_com_gri_features_values" USING btree ("_parent_id");
  CREATE INDEX "sp_com_gri_features_values_locale_idx" ON "sp_com_gri_features_values" USING btree ("_locale");
  CREATE INDEX "sp_com_gri_features_order_idx" ON "sp_com_gri_features" USING btree ("_order");
  CREATE INDEX "sp_com_gri_features_parent_id_idx" ON "sp_com_gri_features" USING btree ("_parent_id");
  CREATE INDEX "sp_com_gri_features_locale_idx" ON "sp_com_gri_features" USING btree ("_locale");
  CREATE INDEX "sp_com_gri_order_idx" ON "sp_com_gri" USING btree ("_order");
  CREATE INDEX "sp_com_gri_parent_id_idx" ON "sp_com_gri" USING btree ("_parent_id");
  CREATE INDEX "sp_com_gri_path_idx" ON "sp_com_gri" USING btree ("_path");
  CREATE INDEX "sp_com_gri_locale_idx" ON "sp_com_gri" USING btree ("_locale");
  CREATE INDEX "sp_con_col_paragraphs_order_idx" ON "sp_con_col_paragraphs" USING btree ("_order");
  CREATE INDEX "sp_con_col_paragraphs_parent_id_idx" ON "sp_con_col_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "sp_con_col_paragraphs_locale_idx" ON "sp_con_col_paragraphs" USING btree ("_locale");
  CREATE INDEX "sp_con_col_links_order_idx" ON "sp_con_col_links" USING btree ("_order");
  CREATE INDEX "sp_con_col_links_parent_id_idx" ON "sp_con_col_links" USING btree ("_parent_id");
  CREATE INDEX "sp_con_col_links_locale_idx" ON "sp_con_col_links" USING btree ("_locale");
  CREATE INDEX "sp_con_col_order_idx" ON "sp_con_col" USING btree ("_order");
  CREATE INDEX "sp_con_col_parent_id_idx" ON "sp_con_col" USING btree ("_parent_id");
  CREATE INDEX "sp_con_col_path_idx" ON "sp_con_col" USING btree ("_path");
  CREATE INDEX "sp_con_col_locale_idx" ON "sp_con_col" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_design_system_order_idx" ON "services_page_blocks_design_system" USING btree ("_order");
  CREATE INDEX "services_page_blocks_design_system_parent_id_idx" ON "services_page_blocks_design_system" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_design_system_path_idx" ON "services_page_blocks_design_system" USING btree ("_path");
  CREATE INDEX "services_page_blocks_design_system_locale_idx" ON "services_page_blocks_design_system" USING btree ("_locale");
  CREATE INDEX "sp_emb_bas_order_idx" ON "sp_emb_bas" USING btree ("_order");
  CREATE INDEX "sp_emb_bas_parent_id_idx" ON "sp_emb_bas" USING btree ("_parent_id");
  CREATE INDEX "sp_emb_bas_path_idx" ON "sp_emb_bas" USING btree ("_path");
  CREATE INDEX "sp_emb_bas_locale_idx" ON "sp_emb_bas" USING btree ("_locale");
  CREATE INDEX "sp_faq_acc_items_order_idx" ON "sp_faq_acc_items" USING btree ("_order");
  CREATE INDEX "sp_faq_acc_items_parent_id_idx" ON "sp_faq_acc_items" USING btree ("_parent_id");
  CREATE INDEX "sp_faq_acc_items_locale_idx" ON "sp_faq_acc_items" USING btree ("_locale");
  CREATE INDEX "sp_faq_acc_links_order_idx" ON "sp_faq_acc_links" USING btree ("_order");
  CREATE INDEX "sp_faq_acc_links_parent_id_idx" ON "sp_faq_acc_links" USING btree ("_parent_id");
  CREATE INDEX "sp_faq_acc_links_locale_idx" ON "sp_faq_acc_links" USING btree ("_locale");
  CREATE INDEX "sp_faq_acc_order_idx" ON "sp_faq_acc" USING btree ("_order");
  CREATE INDEX "sp_faq_acc_parent_id_idx" ON "sp_faq_acc" USING btree ("_parent_id");
  CREATE INDEX "sp_faq_acc_path_idx" ON "sp_faq_acc" USING btree ("_path");
  CREATE INDEX "sp_faq_acc_locale_idx" ON "sp_faq_acc" USING btree ("_locale");
  CREATE INDEX "sp_fea_ben_items_order_idx" ON "sp_fea_ben_items" USING btree ("_order");
  CREATE INDEX "sp_fea_ben_items_parent_id_idx" ON "sp_fea_ben_items" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_ben_items_locale_idx" ON "sp_fea_ben_items" USING btree ("_locale");
  CREATE INDEX "sp_fea_ben_links_order_idx" ON "sp_fea_ben_links" USING btree ("_order");
  CREATE INDEX "sp_fea_ben_links_parent_id_idx" ON "sp_fea_ben_links" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_ben_links_locale_idx" ON "sp_fea_ben_links" USING btree ("_locale");
  CREATE INDEX "sp_fea_ben_order_idx" ON "sp_fea_ben" USING btree ("_order");
  CREATE INDEX "sp_fea_ben_parent_id_idx" ON "sp_fea_ben" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_ben_path_idx" ON "sp_fea_ben" USING btree ("_path");
  CREATE INDEX "sp_fea_ben_locale_idx" ON "sp_fea_ben" USING btree ("_locale");
  CREATE INDEX "sp_fea_gri_bas_items_order_idx" ON "sp_fea_gri_bas_items" USING btree ("_order");
  CREATE INDEX "sp_fea_gri_bas_items_parent_id_idx" ON "sp_fea_gri_bas_items" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_gri_bas_items_locale_idx" ON "sp_fea_gri_bas_items" USING btree ("_locale");
  CREATE INDEX "sp_fea_gri_bas_links_order_idx" ON "sp_fea_gri_bas_links" USING btree ("_order");
  CREATE INDEX "sp_fea_gri_bas_links_parent_id_idx" ON "sp_fea_gri_bas_links" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_gri_bas_links_locale_idx" ON "sp_fea_gri_bas_links" USING btree ("_locale");
  CREATE INDEX "sp_fea_gri_bas_order_idx" ON "sp_fea_gri_bas" USING btree ("_order");
  CREATE INDEX "sp_fea_gri_bas_parent_id_idx" ON "sp_fea_gri_bas" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_gri_bas_path_idx" ON "sp_fea_gri_bas" USING btree ("_path");
  CREATE INDEX "sp_fea_gri_bas_locale_idx" ON "sp_fea_gri_bas" USING btree ("_locale");
  CREATE INDEX "sp_fea_ste_items_order_idx" ON "sp_fea_ste_items" USING btree ("_order");
  CREATE INDEX "sp_fea_ste_items_parent_id_idx" ON "sp_fea_ste_items" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_ste_items_locale_idx" ON "sp_fea_ste_items" USING btree ("_locale");
  CREATE INDEX "sp_fea_ste_links_order_idx" ON "sp_fea_ste_links" USING btree ("_order");
  CREATE INDEX "sp_fea_ste_links_parent_id_idx" ON "sp_fea_ste_links" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_ste_links_locale_idx" ON "sp_fea_ste_links" USING btree ("_locale");
  CREATE INDEX "sp_fea_ste_order_idx" ON "sp_fea_ste" USING btree ("_order");
  CREATE INDEX "sp_fea_ste_parent_id_idx" ON "sp_fea_ste" USING btree ("_parent_id");
  CREATE INDEX "sp_fea_ste_path_idx" ON "sp_fea_ste" USING btree ("_path");
  CREATE INDEX "sp_fea_ste_locale_idx" ON "sp_fea_ste" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_form_block_order_idx" ON "services_page_blocks_form_block" USING btree ("_order");
  CREATE INDEX "services_page_blocks_form_block_parent_id_idx" ON "services_page_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_form_block_path_idx" ON "services_page_blocks_form_block" USING btree ("_path");
  CREATE INDEX "services_page_blocks_form_block_locale_idx" ON "services_page_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_form_block_form_idx" ON "services_page_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "sp_her_bas_links_order_idx" ON "sp_her_bas_links" USING btree ("_order");
  CREATE INDEX "sp_her_bas_links_parent_id_idx" ON "sp_her_bas_links" USING btree ("_parent_id");
  CREATE INDEX "sp_her_bas_links_locale_idx" ON "sp_her_bas_links" USING btree ("_locale");
  CREATE INDEX "sp_her_bas_proof_items_order_idx" ON "sp_her_bas_proof_items" USING btree ("_order");
  CREATE INDEX "sp_her_bas_proof_items_parent_id_idx" ON "sp_her_bas_proof_items" USING btree ("_parent_id");
  CREATE INDEX "sp_her_bas_proof_items_locale_idx" ON "sp_her_bas_proof_items" USING btree ("_locale");
  CREATE INDEX "sp_her_bas_order_idx" ON "sp_her_bas" USING btree ("_order");
  CREATE INDEX "sp_her_bas_parent_id_idx" ON "sp_her_bas" USING btree ("_parent_id");
  CREATE INDEX "sp_her_bas_path_idx" ON "sp_her_bas" USING btree ("_path");
  CREATE INDEX "sp_her_bas_locale_idx" ON "sp_her_bas" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_logo_banner_order_idx" ON "services_page_blocks_logo_banner" USING btree ("_order");
  CREATE INDEX "services_page_blocks_logo_banner_parent_id_idx" ON "services_page_blocks_logo_banner" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_logo_banner_path_idx" ON "services_page_blocks_logo_banner" USING btree ("_path");
  CREATE INDEX "services_page_blocks_logo_banner_locale_idx" ON "services_page_blocks_logo_banner" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_media_block_order_idx" ON "services_page_blocks_media_block" USING btree ("_order");
  CREATE INDEX "services_page_blocks_media_block_parent_id_idx" ON "services_page_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_media_block_path_idx" ON "services_page_blocks_media_block" USING btree ("_path");
  CREATE INDEX "services_page_blocks_media_block_locale_idx" ON "services_page_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_media_block_media_idx" ON "services_page_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "sp_pri_car_plans_features_order_idx" ON "sp_pri_car_plans_features" USING btree ("_order");
  CREATE INDEX "sp_pri_car_plans_features_parent_id_idx" ON "sp_pri_car_plans_features" USING btree ("_parent_id");
  CREATE INDEX "sp_pri_car_plans_features_locale_idx" ON "sp_pri_car_plans_features" USING btree ("_locale");
  CREATE INDEX "sp_pri_car_plans_links_order_idx" ON "sp_pri_car_plans_links" USING btree ("_order");
  CREATE INDEX "sp_pri_car_plans_links_parent_id_idx" ON "sp_pri_car_plans_links" USING btree ("_parent_id");
  CREATE INDEX "sp_pri_car_plans_links_locale_idx" ON "sp_pri_car_plans_links" USING btree ("_locale");
  CREATE INDEX "sp_pri_car_plans_order_idx" ON "sp_pri_car_plans" USING btree ("_order");
  CREATE INDEX "sp_pri_car_plans_parent_id_idx" ON "sp_pri_car_plans" USING btree ("_parent_id");
  CREATE INDEX "sp_pri_car_plans_locale_idx" ON "sp_pri_car_plans" USING btree ("_locale");
  CREATE INDEX "sp_pri_car_order_idx" ON "sp_pri_car" USING btree ("_order");
  CREATE INDEX "sp_pri_car_parent_id_idx" ON "sp_pri_car" USING btree ("_parent_id");
  CREATE INDEX "sp_pri_car_path_idx" ON "sp_pri_car" USING btree ("_path");
  CREATE INDEX "sp_pri_car_locale_idx" ON "sp_pri_car" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_services_index_order_idx" ON "services_page_blocks_services_index" USING btree ("_order");
  CREATE INDEX "services_page_blocks_services_index_parent_id_idx" ON "services_page_blocks_services_index" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_services_index_path_idx" ON "services_page_blocks_services_index" USING btree ("_path");
  CREATE INDEX "services_page_blocks_services_index_locale_idx" ON "services_page_blocks_services_index" USING btree ("_locale");
  CREATE INDEX "sp_sta_gri_metrics_order_idx" ON "sp_sta_gri_metrics" USING btree ("_order");
  CREATE INDEX "sp_sta_gri_metrics_parent_id_idx" ON "sp_sta_gri_metrics" USING btree ("_parent_id");
  CREATE INDEX "sp_sta_gri_metrics_locale_idx" ON "sp_sta_gri_metrics" USING btree ("_locale");
  CREATE INDEX "sp_sta_gri_order_idx" ON "sp_sta_gri" USING btree ("_order");
  CREATE INDEX "sp_sta_gri_parent_id_idx" ON "sp_sta_gri" USING btree ("_parent_id");
  CREATE INDEX "sp_sta_gri_path_idx" ON "sp_sta_gri" USING btree ("_path");
  CREATE INDEX "sp_sta_gri_locale_idx" ON "sp_sta_gri" USING btree ("_locale");
  CREATE INDEX "sp_tea_gri_members_order_idx" ON "sp_tea_gri_members" USING btree ("_order");
  CREATE INDEX "sp_tea_gri_members_parent_id_idx" ON "sp_tea_gri_members" USING btree ("_parent_id");
  CREATE INDEX "sp_tea_gri_members_locale_idx" ON "sp_tea_gri_members" USING btree ("_locale");
  CREATE INDEX "sp_tea_gri_members_avatar_idx" ON "sp_tea_gri_members" USING btree ("avatar_id");
  CREATE INDEX "sp_tea_gri_order_idx" ON "sp_tea_gri" USING btree ("_order");
  CREATE INDEX "sp_tea_gri_parent_id_idx" ON "sp_tea_gri" USING btree ("_parent_id");
  CREATE INDEX "sp_tea_gri_path_idx" ON "sp_tea_gri" USING btree ("_path");
  CREATE INDEX "sp_tea_gri_locale_idx" ON "sp_tea_gri" USING btree ("_locale");
  CREATE INDEX "services_page_blocks_testimonial_order_idx" ON "services_page_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "services_page_blocks_testimonial_parent_id_idx" ON "services_page_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "services_page_blocks_testimonial_path_idx" ON "services_page_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "services_page_blocks_testimonial_locale_idx" ON "services_page_blocks_testimonial" USING btree ("_locale");
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_portfolio_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_page_rels_categories_id_idx" ON "services_page_rels" USING btree ("categories_id","locale");
  CREATE INDEX "services_page_rels_portfolio_id_idx" ON "services_page_rels" USING btree ("portfolio_id","locale");
  CREATE INDEX "services_page_rels_testimonials_id_idx" ON "services_page_rels" USING btree ("testimonials_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_page_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_awards_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_cal_to_act_cen_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_cal_to_act_cen" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_com_gri_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_com_gri_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_com_gri_features_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_com_gri_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_com_gri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_con_col_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_con_col_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_con_col" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_design_system" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_emb_bas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_faq_acc_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_faq_acc_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_faq_acc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_ben_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_ben_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_ben" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_gri_bas_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_gri_bas_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_gri_bas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_ste_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_ste_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_fea_ste" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_her_bas_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_her_bas_proof_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_her_bas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_logo_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_pri_car_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_pri_car_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_pri_car_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_pri_car" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_services_index" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_sta_gri_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_sta_gri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_tea_gri_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sp_tea_gri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_page_blocks_archive" CASCADE;
  DROP TABLE "services_page_blocks_awards_list" CASCADE;
  DROP TABLE "sp_cal_to_act_cen_links" CASCADE;
  DROP TABLE "sp_cal_to_act_cen" CASCADE;
  DROP TABLE "sp_com_gri_plans_links" CASCADE;
  DROP TABLE "sp_com_gri_plans" CASCADE;
  DROP TABLE "sp_com_gri_features_values" CASCADE;
  DROP TABLE "sp_com_gri_features" CASCADE;
  DROP TABLE "sp_com_gri" CASCADE;
  DROP TABLE "sp_con_col_paragraphs" CASCADE;
  DROP TABLE "sp_con_col_links" CASCADE;
  DROP TABLE "sp_con_col" CASCADE;
  DROP TABLE "services_page_blocks_design_system" CASCADE;
  DROP TABLE "sp_emb_bas" CASCADE;
  DROP TABLE "sp_faq_acc_items" CASCADE;
  DROP TABLE "sp_faq_acc_links" CASCADE;
  DROP TABLE "sp_faq_acc" CASCADE;
  DROP TABLE "sp_fea_ben_items" CASCADE;
  DROP TABLE "sp_fea_ben_links" CASCADE;
  DROP TABLE "sp_fea_ben" CASCADE;
  DROP TABLE "sp_fea_gri_bas_items" CASCADE;
  DROP TABLE "sp_fea_gri_bas_links" CASCADE;
  DROP TABLE "sp_fea_gri_bas" CASCADE;
  DROP TABLE "sp_fea_ste_items" CASCADE;
  DROP TABLE "sp_fea_ste_links" CASCADE;
  DROP TABLE "sp_fea_ste" CASCADE;
  DROP TABLE "services_page_blocks_form_block" CASCADE;
  DROP TABLE "sp_her_bas_links" CASCADE;
  DROP TABLE "sp_her_bas_proof_items" CASCADE;
  DROP TABLE "sp_her_bas" CASCADE;
  DROP TABLE "services_page_blocks_logo_banner" CASCADE;
  DROP TABLE "services_page_blocks_media_block" CASCADE;
  DROP TABLE "sp_pri_car_plans_features" CASCADE;
  DROP TABLE "sp_pri_car_plans_links" CASCADE;
  DROP TABLE "sp_pri_car_plans" CASCADE;
  DROP TABLE "sp_pri_car" CASCADE;
  DROP TABLE "services_page_blocks_services_index" CASCADE;
  DROP TABLE "sp_sta_gri_metrics" CASCADE;
  DROP TABLE "sp_sta_gri" CASCADE;
  DROP TABLE "sp_tea_gri_members" CASCADE;
  DROP TABLE "sp_tea_gri" CASCADE;
  DROP TABLE "services_page_blocks_testimonial" CASCADE;
  ALTER TABLE "services_page_rels" DROP CONSTRAINT "services_page_rels_categories_fk";
  
  ALTER TABLE "services_page_rels" DROP CONSTRAINT "services_page_rels_portfolio_fk";
  
  ALTER TABLE "services_page_rels" DROP CONSTRAINT "services_page_rels_testimonials_fk";
  
  DROP INDEX "services_page_rels_categories_id_idx";
  DROP INDEX "services_page_rels_portfolio_id_idx";
  DROP INDEX "services_page_rels_testimonials_id_idx";
  ALTER TABLE "services_page_rels" DROP COLUMN "categories_id";
  ALTER TABLE "services_page_rels" DROP COLUMN "portfolio_id";
  ALTER TABLE "services_page_rels" DROP COLUMN "testimonials_id";
  DROP TYPE "public"."enum_services_page_blocks_archive_populate_by";
  DROP TYPE "public"."enum_services_page_blocks_archive_relation_to";
  DROP TYPE "public"."enum_sp_cal_to_act_cen_links_link_type";
  DROP TYPE "public"."enum_sp_cal_to_act_cen_links_link_appearance";
  DROP TYPE "public"."enum_sp_com_gri_plans_links_link_type";
  DROP TYPE "public"."enum_sp_com_gri_plans_links_link_appearance";
  DROP TYPE "public"."enum_sp_con_col_links_link_type";
  DROP TYPE "public"."enum_sp_con_col_links_link_appearance";
  DROP TYPE "public"."enum_sp_emb_bas_aspect_ratio";
  DROP TYPE "public"."enum_sp_faq_acc_links_link_type";
  DROP TYPE "public"."enum_sp_faq_acc_links_link_appearance";
  DROP TYPE "public"."enum_sp_fea_ben_links_link_type";
  DROP TYPE "public"."enum_sp_fea_ben_links_link_appearance";
  DROP TYPE "public"."enum_sp_fea_gri_bas_links_link_type";
  DROP TYPE "public"."enum_sp_fea_gri_bas_links_link_appearance";
  DROP TYPE "public"."enum_sp_fea_ste_links_link_type";
  DROP TYPE "public"."enum_sp_fea_ste_links_link_appearance";
  DROP TYPE "public"."enum_sp_her_bas_links_link_type";
  DROP TYPE "public"."enum_sp_her_bas_links_link_appearance";
  DROP TYPE "public"."enum_services_page_blocks_logo_banner_display_type";
  DROP TYPE "public"."enum_sp_pri_car_plans_links_link_type";
  DROP TYPE "public"."enum_sp_pri_car_plans_links_link_appearance";
  DROP TYPE "public"."enum_services_page_blocks_testimonial_layout";`)
}
