import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sc_cal_to_act_cen_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_cal_to_act_cen_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_com_gri_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_com_gri_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_con_col_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_con_col_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_emb_bas_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_sc_faq_acc_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_faq_acc_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_fea_ben_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_fea_ben_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_fea_gri_bas_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_fea_gri_bas_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_fea_ste_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_fea_ste_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_her_bas_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_her_bas_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sc_pri_car_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sc_pri_car_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_cal_to_act_cen_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_cal_to_act_cen_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_com_gri_v_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_com_gri_v_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_con_col_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_con_col_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_emb_bas_v_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__sc_faq_acc_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_faq_acc_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_fea_ben_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_fea_ben_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_fea_gri_bas_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_fea_gri_bas_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_fea_ste_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_fea_ste_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_her_bas_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_her_bas_v_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sc_pri_car_v_plans_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sc_pri_car_v_plans_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "sc_cal_to_act_cen_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_cal_to_act_cen_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_cal_to_act_cen_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_cal_to_act_cen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_com_gri_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_com_gri_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_com_gri_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_com_gri_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"badge" varchar,
  	"highlighted" boolean
  );
  
  CREATE TABLE "sc_com_gri_features_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"included" boolean,
  	"label" varchar
  );
  
  CREATE TABLE "sc_com_gri_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "sc_com_gri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_con_col_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "sc_con_col_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_con_col_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_con_col_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_con_col" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_emb_bas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"aspect_ratio" "enum_sc_emb_bas_aspect_ratio" DEFAULT '16:9',
  	"caption" varchar,
  	"allow_fullscreen" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_faq_acc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "sc_faq_acc_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_faq_acc_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_faq_acc_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_faq_acc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_fea_ben_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "sc_fea_ben_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_fea_ben_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_fea_ben_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_fea_ben" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_fea_gri_bas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "sc_fea_gri_bas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_fea_gri_bas_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_fea_gri_bas_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_fea_gri_bas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_fea_ste_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "sc_fea_ste_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_fea_ste_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_fea_ste_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_fea_ste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_her_bas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_her_bas_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_her_bas_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_her_bas_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "sc_her_bas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_pri_car_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "sc_pri_car_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sc_pri_car_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sc_pri_car_plans_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sc_pri_car_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "sc_pri_car" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_sta_gri_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "sc_sta_gri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sc_tea_gri_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "sc_tea_gri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_cal_to_act_cen_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_cal_to_act_cen_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_cal_to_act_cen_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_cal_to_act_cen_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_com_gri_v_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_com_gri_v_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_com_gri_v_plans_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_com_gri_v_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"badge" varchar,
  	"highlighted" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_com_gri_v_features_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"included" boolean,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_com_gri_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_com_gri_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_con_col_v_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_con_col_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_con_col_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_con_col_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_con_col_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_emb_bas_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"aspect_ratio" "enum__sc_emb_bas_v_aspect_ratio" DEFAULT '16:9',
  	"caption" varchar,
  	"allow_fullscreen" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_faq_acc_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_faq_acc_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_faq_acc_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_faq_acc_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_faq_acc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_fea_ben_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_fea_ben_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_fea_ben_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_fea_ben_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_fea_ben_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_fea_gri_bas_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_fea_gri_bas_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_fea_gri_bas_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_fea_gri_bas_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_fea_gri_bas_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_fea_ste_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_fea_ste_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_fea_ste_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_fea_ste_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_fea_ste_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_her_bas_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_her_bas_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_her_bas_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_her_bas_v_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_her_bas_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_pri_car_v_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_pri_car_v_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sc_pri_car_v_plans_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sc_pri_car_v_plans_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_pri_car_v_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_pri_car_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_sta_gri_v_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_sta_gri_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sc_tea_gri_v_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avatar_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sc_tea_gri_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "sc_cal_to_act_cen_links" ADD CONSTRAINT "sc_cal_to_act_cen_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_cal_to_act_cen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_cal_to_act_cen" ADD CONSTRAINT "sc_cal_to_act_cen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_com_gri_plans_links" ADD CONSTRAINT "sc_com_gri_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_com_gri_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_com_gri_plans" ADD CONSTRAINT "sc_com_gri_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_com_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_com_gri_features_values" ADD CONSTRAINT "sc_com_gri_features_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_com_gri_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_com_gri_features" ADD CONSTRAINT "sc_com_gri_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_com_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_com_gri" ADD CONSTRAINT "sc_com_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_con_col_paragraphs" ADD CONSTRAINT "sc_con_col_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_con_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_con_col_links" ADD CONSTRAINT "sc_con_col_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_con_col"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_con_col" ADD CONSTRAINT "sc_con_col_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_emb_bas" ADD CONSTRAINT "sc_emb_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_faq_acc_items" ADD CONSTRAINT "sc_faq_acc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_faq_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_faq_acc_links" ADD CONSTRAINT "sc_faq_acc_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_faq_acc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_faq_acc" ADD CONSTRAINT "sc_faq_acc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_ben_items" ADD CONSTRAINT "sc_fea_ben_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_fea_ben"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_ben_links" ADD CONSTRAINT "sc_fea_ben_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_fea_ben"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_ben" ADD CONSTRAINT "sc_fea_ben_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_gri_bas_items" ADD CONSTRAINT "sc_fea_gri_bas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_fea_gri_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_gri_bas_links" ADD CONSTRAINT "sc_fea_gri_bas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_fea_gri_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_gri_bas" ADD CONSTRAINT "sc_fea_gri_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_ste_items" ADD CONSTRAINT "sc_fea_ste_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_fea_ste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_ste_links" ADD CONSTRAINT "sc_fea_ste_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_fea_ste"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_fea_ste" ADD CONSTRAINT "sc_fea_ste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_her_bas_links" ADD CONSTRAINT "sc_her_bas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_her_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_her_bas_proof_items" ADD CONSTRAINT "sc_her_bas_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_her_bas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_her_bas" ADD CONSTRAINT "sc_her_bas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_pri_car_plans_features" ADD CONSTRAINT "sc_pri_car_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_pri_car_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_pri_car_plans_links" ADD CONSTRAINT "sc_pri_car_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_pri_car_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_pri_car_plans" ADD CONSTRAINT "sc_pri_car_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_pri_car"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_pri_car" ADD CONSTRAINT "sc_pri_car_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_sta_gri_metrics" ADD CONSTRAINT "sc_sta_gri_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_sta_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_sta_gri" ADD CONSTRAINT "sc_sta_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_tea_gri_members" ADD CONSTRAINT "sc_tea_gri_members_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sc_tea_gri_members" ADD CONSTRAINT "sc_tea_gri_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sc_tea_gri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sc_tea_gri" ADD CONSTRAINT "sc_tea_gri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_cal_to_act_cen_v_links" ADD CONSTRAINT "_sc_cal_to_act_cen_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_cal_to_act_cen_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_cal_to_act_cen_v" ADD CONSTRAINT "_sc_cal_to_act_cen_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_com_gri_v_plans_links" ADD CONSTRAINT "_sc_com_gri_v_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_com_gri_v_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_com_gri_v_plans" ADD CONSTRAINT "_sc_com_gri_v_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_com_gri_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_com_gri_v_features_values" ADD CONSTRAINT "_sc_com_gri_v_features_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_com_gri_v_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_com_gri_v_features" ADD CONSTRAINT "_sc_com_gri_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_com_gri_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_com_gri_v" ADD CONSTRAINT "_sc_com_gri_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_con_col_v_paragraphs" ADD CONSTRAINT "_sc_con_col_v_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_con_col_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_con_col_v_links" ADD CONSTRAINT "_sc_con_col_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_con_col_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_con_col_v" ADD CONSTRAINT "_sc_con_col_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_emb_bas_v" ADD CONSTRAINT "_sc_emb_bas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_faq_acc_v_items" ADD CONSTRAINT "_sc_faq_acc_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_faq_acc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_faq_acc_v_links" ADD CONSTRAINT "_sc_faq_acc_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_faq_acc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_faq_acc_v" ADD CONSTRAINT "_sc_faq_acc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_ben_v_items" ADD CONSTRAINT "_sc_fea_ben_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_fea_ben_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_ben_v_links" ADD CONSTRAINT "_sc_fea_ben_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_fea_ben_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_ben_v" ADD CONSTRAINT "_sc_fea_ben_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_gri_bas_v_items" ADD CONSTRAINT "_sc_fea_gri_bas_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_fea_gri_bas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_gri_bas_v_links" ADD CONSTRAINT "_sc_fea_gri_bas_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_fea_gri_bas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_gri_bas_v" ADD CONSTRAINT "_sc_fea_gri_bas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_ste_v_items" ADD CONSTRAINT "_sc_fea_ste_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_fea_ste_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_ste_v_links" ADD CONSTRAINT "_sc_fea_ste_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_fea_ste_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_fea_ste_v" ADD CONSTRAINT "_sc_fea_ste_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_her_bas_v_links" ADD CONSTRAINT "_sc_her_bas_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_her_bas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_her_bas_v_proof_items" ADD CONSTRAINT "_sc_her_bas_v_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_her_bas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_her_bas_v" ADD CONSTRAINT "_sc_her_bas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_pri_car_v_plans_features" ADD CONSTRAINT "_sc_pri_car_v_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_pri_car_v_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_pri_car_v_plans_links" ADD CONSTRAINT "_sc_pri_car_v_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_pri_car_v_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_pri_car_v_plans" ADD CONSTRAINT "_sc_pri_car_v_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_pri_car_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_pri_car_v" ADD CONSTRAINT "_sc_pri_car_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_sta_gri_v_metrics" ADD CONSTRAINT "_sc_sta_gri_v_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_sta_gri_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_sta_gri_v" ADD CONSTRAINT "_sc_sta_gri_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_tea_gri_v_members" ADD CONSTRAINT "_sc_tea_gri_v_members_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sc_tea_gri_v_members" ADD CONSTRAINT "_sc_tea_gri_v_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sc_tea_gri_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sc_tea_gri_v" ADD CONSTRAINT "_sc_tea_gri_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sc_cal_to_act_cen_links_order_idx" ON "sc_cal_to_act_cen_links" USING btree ("_order");
  CREATE INDEX "sc_cal_to_act_cen_links_parent_id_idx" ON "sc_cal_to_act_cen_links" USING btree ("_parent_id");
  CREATE INDEX "sc_cal_to_act_cen_links_locale_idx" ON "sc_cal_to_act_cen_links" USING btree ("_locale");
  CREATE INDEX "sc_cal_to_act_cen_order_idx" ON "sc_cal_to_act_cen" USING btree ("_order");
  CREATE INDEX "sc_cal_to_act_cen_parent_id_idx" ON "sc_cal_to_act_cen" USING btree ("_parent_id");
  CREATE INDEX "sc_cal_to_act_cen_path_idx" ON "sc_cal_to_act_cen" USING btree ("_path");
  CREATE INDEX "sc_cal_to_act_cen_locale_idx" ON "sc_cal_to_act_cen" USING btree ("_locale");
  CREATE INDEX "sc_com_gri_plans_links_order_idx" ON "sc_com_gri_plans_links" USING btree ("_order");
  CREATE INDEX "sc_com_gri_plans_links_parent_id_idx" ON "sc_com_gri_plans_links" USING btree ("_parent_id");
  CREATE INDEX "sc_com_gri_plans_links_locale_idx" ON "sc_com_gri_plans_links" USING btree ("_locale");
  CREATE INDEX "sc_com_gri_plans_order_idx" ON "sc_com_gri_plans" USING btree ("_order");
  CREATE INDEX "sc_com_gri_plans_parent_id_idx" ON "sc_com_gri_plans" USING btree ("_parent_id");
  CREATE INDEX "sc_com_gri_plans_locale_idx" ON "sc_com_gri_plans" USING btree ("_locale");
  CREATE INDEX "sc_com_gri_features_values_order_idx" ON "sc_com_gri_features_values" USING btree ("_order");
  CREATE INDEX "sc_com_gri_features_values_parent_id_idx" ON "sc_com_gri_features_values" USING btree ("_parent_id");
  CREATE INDEX "sc_com_gri_features_values_locale_idx" ON "sc_com_gri_features_values" USING btree ("_locale");
  CREATE INDEX "sc_com_gri_features_order_idx" ON "sc_com_gri_features" USING btree ("_order");
  CREATE INDEX "sc_com_gri_features_parent_id_idx" ON "sc_com_gri_features" USING btree ("_parent_id");
  CREATE INDEX "sc_com_gri_features_locale_idx" ON "sc_com_gri_features" USING btree ("_locale");
  CREATE INDEX "sc_com_gri_order_idx" ON "sc_com_gri" USING btree ("_order");
  CREATE INDEX "sc_com_gri_parent_id_idx" ON "sc_com_gri" USING btree ("_parent_id");
  CREATE INDEX "sc_com_gri_path_idx" ON "sc_com_gri" USING btree ("_path");
  CREATE INDEX "sc_com_gri_locale_idx" ON "sc_com_gri" USING btree ("_locale");
  CREATE INDEX "sc_con_col_paragraphs_order_idx" ON "sc_con_col_paragraphs" USING btree ("_order");
  CREATE INDEX "sc_con_col_paragraphs_parent_id_idx" ON "sc_con_col_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "sc_con_col_paragraphs_locale_idx" ON "sc_con_col_paragraphs" USING btree ("_locale");
  CREATE INDEX "sc_con_col_links_order_idx" ON "sc_con_col_links" USING btree ("_order");
  CREATE INDEX "sc_con_col_links_parent_id_idx" ON "sc_con_col_links" USING btree ("_parent_id");
  CREATE INDEX "sc_con_col_links_locale_idx" ON "sc_con_col_links" USING btree ("_locale");
  CREATE INDEX "sc_con_col_order_idx" ON "sc_con_col" USING btree ("_order");
  CREATE INDEX "sc_con_col_parent_id_idx" ON "sc_con_col" USING btree ("_parent_id");
  CREATE INDEX "sc_con_col_path_idx" ON "sc_con_col" USING btree ("_path");
  CREATE INDEX "sc_con_col_locale_idx" ON "sc_con_col" USING btree ("_locale");
  CREATE INDEX "sc_emb_bas_order_idx" ON "sc_emb_bas" USING btree ("_order");
  CREATE INDEX "sc_emb_bas_parent_id_idx" ON "sc_emb_bas" USING btree ("_parent_id");
  CREATE INDEX "sc_emb_bas_path_idx" ON "sc_emb_bas" USING btree ("_path");
  CREATE INDEX "sc_emb_bas_locale_idx" ON "sc_emb_bas" USING btree ("_locale");
  CREATE INDEX "sc_faq_acc_items_order_idx" ON "sc_faq_acc_items" USING btree ("_order");
  CREATE INDEX "sc_faq_acc_items_parent_id_idx" ON "sc_faq_acc_items" USING btree ("_parent_id");
  CREATE INDEX "sc_faq_acc_items_locale_idx" ON "sc_faq_acc_items" USING btree ("_locale");
  CREATE INDEX "sc_faq_acc_links_order_idx" ON "sc_faq_acc_links" USING btree ("_order");
  CREATE INDEX "sc_faq_acc_links_parent_id_idx" ON "sc_faq_acc_links" USING btree ("_parent_id");
  CREATE INDEX "sc_faq_acc_links_locale_idx" ON "sc_faq_acc_links" USING btree ("_locale");
  CREATE INDEX "sc_faq_acc_order_idx" ON "sc_faq_acc" USING btree ("_order");
  CREATE INDEX "sc_faq_acc_parent_id_idx" ON "sc_faq_acc" USING btree ("_parent_id");
  CREATE INDEX "sc_faq_acc_path_idx" ON "sc_faq_acc" USING btree ("_path");
  CREATE INDEX "sc_faq_acc_locale_idx" ON "sc_faq_acc" USING btree ("_locale");
  CREATE INDEX "sc_fea_ben_items_order_idx" ON "sc_fea_ben_items" USING btree ("_order");
  CREATE INDEX "sc_fea_ben_items_parent_id_idx" ON "sc_fea_ben_items" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_ben_items_locale_idx" ON "sc_fea_ben_items" USING btree ("_locale");
  CREATE INDEX "sc_fea_ben_links_order_idx" ON "sc_fea_ben_links" USING btree ("_order");
  CREATE INDEX "sc_fea_ben_links_parent_id_idx" ON "sc_fea_ben_links" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_ben_links_locale_idx" ON "sc_fea_ben_links" USING btree ("_locale");
  CREATE INDEX "sc_fea_ben_order_idx" ON "sc_fea_ben" USING btree ("_order");
  CREATE INDEX "sc_fea_ben_parent_id_idx" ON "sc_fea_ben" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_ben_path_idx" ON "sc_fea_ben" USING btree ("_path");
  CREATE INDEX "sc_fea_ben_locale_idx" ON "sc_fea_ben" USING btree ("_locale");
  CREATE INDEX "sc_fea_gri_bas_items_order_idx" ON "sc_fea_gri_bas_items" USING btree ("_order");
  CREATE INDEX "sc_fea_gri_bas_items_parent_id_idx" ON "sc_fea_gri_bas_items" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_gri_bas_items_locale_idx" ON "sc_fea_gri_bas_items" USING btree ("_locale");
  CREATE INDEX "sc_fea_gri_bas_links_order_idx" ON "sc_fea_gri_bas_links" USING btree ("_order");
  CREATE INDEX "sc_fea_gri_bas_links_parent_id_idx" ON "sc_fea_gri_bas_links" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_gri_bas_links_locale_idx" ON "sc_fea_gri_bas_links" USING btree ("_locale");
  CREATE INDEX "sc_fea_gri_bas_order_idx" ON "sc_fea_gri_bas" USING btree ("_order");
  CREATE INDEX "sc_fea_gri_bas_parent_id_idx" ON "sc_fea_gri_bas" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_gri_bas_path_idx" ON "sc_fea_gri_bas" USING btree ("_path");
  CREATE INDEX "sc_fea_gri_bas_locale_idx" ON "sc_fea_gri_bas" USING btree ("_locale");
  CREATE INDEX "sc_fea_ste_items_order_idx" ON "sc_fea_ste_items" USING btree ("_order");
  CREATE INDEX "sc_fea_ste_items_parent_id_idx" ON "sc_fea_ste_items" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_ste_items_locale_idx" ON "sc_fea_ste_items" USING btree ("_locale");
  CREATE INDEX "sc_fea_ste_links_order_idx" ON "sc_fea_ste_links" USING btree ("_order");
  CREATE INDEX "sc_fea_ste_links_parent_id_idx" ON "sc_fea_ste_links" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_ste_links_locale_idx" ON "sc_fea_ste_links" USING btree ("_locale");
  CREATE INDEX "sc_fea_ste_order_idx" ON "sc_fea_ste" USING btree ("_order");
  CREATE INDEX "sc_fea_ste_parent_id_idx" ON "sc_fea_ste" USING btree ("_parent_id");
  CREATE INDEX "sc_fea_ste_path_idx" ON "sc_fea_ste" USING btree ("_path");
  CREATE INDEX "sc_fea_ste_locale_idx" ON "sc_fea_ste" USING btree ("_locale");
  CREATE INDEX "sc_her_bas_links_order_idx" ON "sc_her_bas_links" USING btree ("_order");
  CREATE INDEX "sc_her_bas_links_parent_id_idx" ON "sc_her_bas_links" USING btree ("_parent_id");
  CREATE INDEX "sc_her_bas_links_locale_idx" ON "sc_her_bas_links" USING btree ("_locale");
  CREATE INDEX "sc_her_bas_proof_items_order_idx" ON "sc_her_bas_proof_items" USING btree ("_order");
  CREATE INDEX "sc_her_bas_proof_items_parent_id_idx" ON "sc_her_bas_proof_items" USING btree ("_parent_id");
  CREATE INDEX "sc_her_bas_proof_items_locale_idx" ON "sc_her_bas_proof_items" USING btree ("_locale");
  CREATE INDEX "sc_her_bas_order_idx" ON "sc_her_bas" USING btree ("_order");
  CREATE INDEX "sc_her_bas_parent_id_idx" ON "sc_her_bas" USING btree ("_parent_id");
  CREATE INDEX "sc_her_bas_path_idx" ON "sc_her_bas" USING btree ("_path");
  CREATE INDEX "sc_her_bas_locale_idx" ON "sc_her_bas" USING btree ("_locale");
  CREATE INDEX "sc_pri_car_plans_features_order_idx" ON "sc_pri_car_plans_features" USING btree ("_order");
  CREATE INDEX "sc_pri_car_plans_features_parent_id_idx" ON "sc_pri_car_plans_features" USING btree ("_parent_id");
  CREATE INDEX "sc_pri_car_plans_features_locale_idx" ON "sc_pri_car_plans_features" USING btree ("_locale");
  CREATE INDEX "sc_pri_car_plans_links_order_idx" ON "sc_pri_car_plans_links" USING btree ("_order");
  CREATE INDEX "sc_pri_car_plans_links_parent_id_idx" ON "sc_pri_car_plans_links" USING btree ("_parent_id");
  CREATE INDEX "sc_pri_car_plans_links_locale_idx" ON "sc_pri_car_plans_links" USING btree ("_locale");
  CREATE INDEX "sc_pri_car_plans_order_idx" ON "sc_pri_car_plans" USING btree ("_order");
  CREATE INDEX "sc_pri_car_plans_parent_id_idx" ON "sc_pri_car_plans" USING btree ("_parent_id");
  CREATE INDEX "sc_pri_car_plans_locale_idx" ON "sc_pri_car_plans" USING btree ("_locale");
  CREATE INDEX "sc_pri_car_order_idx" ON "sc_pri_car" USING btree ("_order");
  CREATE INDEX "sc_pri_car_parent_id_idx" ON "sc_pri_car" USING btree ("_parent_id");
  CREATE INDEX "sc_pri_car_path_idx" ON "sc_pri_car" USING btree ("_path");
  CREATE INDEX "sc_pri_car_locale_idx" ON "sc_pri_car" USING btree ("_locale");
  CREATE INDEX "sc_sta_gri_metrics_order_idx" ON "sc_sta_gri_metrics" USING btree ("_order");
  CREATE INDEX "sc_sta_gri_metrics_parent_id_idx" ON "sc_sta_gri_metrics" USING btree ("_parent_id");
  CREATE INDEX "sc_sta_gri_metrics_locale_idx" ON "sc_sta_gri_metrics" USING btree ("_locale");
  CREATE INDEX "sc_sta_gri_order_idx" ON "sc_sta_gri" USING btree ("_order");
  CREATE INDEX "sc_sta_gri_parent_id_idx" ON "sc_sta_gri" USING btree ("_parent_id");
  CREATE INDEX "sc_sta_gri_path_idx" ON "sc_sta_gri" USING btree ("_path");
  CREATE INDEX "sc_sta_gri_locale_idx" ON "sc_sta_gri" USING btree ("_locale");
  CREATE INDEX "sc_tea_gri_members_order_idx" ON "sc_tea_gri_members" USING btree ("_order");
  CREATE INDEX "sc_tea_gri_members_parent_id_idx" ON "sc_tea_gri_members" USING btree ("_parent_id");
  CREATE INDEX "sc_tea_gri_members_locale_idx" ON "sc_tea_gri_members" USING btree ("_locale");
  CREATE INDEX "sc_tea_gri_members_avatar_idx" ON "sc_tea_gri_members" USING btree ("avatar_id");
  CREATE INDEX "sc_tea_gri_order_idx" ON "sc_tea_gri" USING btree ("_order");
  CREATE INDEX "sc_tea_gri_parent_id_idx" ON "sc_tea_gri" USING btree ("_parent_id");
  CREATE INDEX "sc_tea_gri_path_idx" ON "sc_tea_gri" USING btree ("_path");
  CREATE INDEX "sc_tea_gri_locale_idx" ON "sc_tea_gri" USING btree ("_locale");
  CREATE INDEX "_sc_cal_to_act_cen_v_links_order_idx" ON "_sc_cal_to_act_cen_v_links" USING btree ("_order");
  CREATE INDEX "_sc_cal_to_act_cen_v_links_parent_id_idx" ON "_sc_cal_to_act_cen_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_cal_to_act_cen_v_links_locale_idx" ON "_sc_cal_to_act_cen_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_cal_to_act_cen_v_order_idx" ON "_sc_cal_to_act_cen_v" USING btree ("_order");
  CREATE INDEX "_sc_cal_to_act_cen_v_parent_id_idx" ON "_sc_cal_to_act_cen_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_cal_to_act_cen_v_path_idx" ON "_sc_cal_to_act_cen_v" USING btree ("_path");
  CREATE INDEX "_sc_cal_to_act_cen_v_locale_idx" ON "_sc_cal_to_act_cen_v" USING btree ("_locale");
  CREATE INDEX "_sc_com_gri_v_plans_links_order_idx" ON "_sc_com_gri_v_plans_links" USING btree ("_order");
  CREATE INDEX "_sc_com_gri_v_plans_links_parent_id_idx" ON "_sc_com_gri_v_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_com_gri_v_plans_links_locale_idx" ON "_sc_com_gri_v_plans_links" USING btree ("_locale");
  CREATE INDEX "_sc_com_gri_v_plans_order_idx" ON "_sc_com_gri_v_plans" USING btree ("_order");
  CREATE INDEX "_sc_com_gri_v_plans_parent_id_idx" ON "_sc_com_gri_v_plans" USING btree ("_parent_id");
  CREATE INDEX "_sc_com_gri_v_plans_locale_idx" ON "_sc_com_gri_v_plans" USING btree ("_locale");
  CREATE INDEX "_sc_com_gri_v_features_values_order_idx" ON "_sc_com_gri_v_features_values" USING btree ("_order");
  CREATE INDEX "_sc_com_gri_v_features_values_parent_id_idx" ON "_sc_com_gri_v_features_values" USING btree ("_parent_id");
  CREATE INDEX "_sc_com_gri_v_features_values_locale_idx" ON "_sc_com_gri_v_features_values" USING btree ("_locale");
  CREATE INDEX "_sc_com_gri_v_features_order_idx" ON "_sc_com_gri_v_features" USING btree ("_order");
  CREATE INDEX "_sc_com_gri_v_features_parent_id_idx" ON "_sc_com_gri_v_features" USING btree ("_parent_id");
  CREATE INDEX "_sc_com_gri_v_features_locale_idx" ON "_sc_com_gri_v_features" USING btree ("_locale");
  CREATE INDEX "_sc_com_gri_v_order_idx" ON "_sc_com_gri_v" USING btree ("_order");
  CREATE INDEX "_sc_com_gri_v_parent_id_idx" ON "_sc_com_gri_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_com_gri_v_path_idx" ON "_sc_com_gri_v" USING btree ("_path");
  CREATE INDEX "_sc_com_gri_v_locale_idx" ON "_sc_com_gri_v" USING btree ("_locale");
  CREATE INDEX "_sc_con_col_v_paragraphs_order_idx" ON "_sc_con_col_v_paragraphs" USING btree ("_order");
  CREATE INDEX "_sc_con_col_v_paragraphs_parent_id_idx" ON "_sc_con_col_v_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_sc_con_col_v_paragraphs_locale_idx" ON "_sc_con_col_v_paragraphs" USING btree ("_locale");
  CREATE INDEX "_sc_con_col_v_links_order_idx" ON "_sc_con_col_v_links" USING btree ("_order");
  CREATE INDEX "_sc_con_col_v_links_parent_id_idx" ON "_sc_con_col_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_con_col_v_links_locale_idx" ON "_sc_con_col_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_con_col_v_order_idx" ON "_sc_con_col_v" USING btree ("_order");
  CREATE INDEX "_sc_con_col_v_parent_id_idx" ON "_sc_con_col_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_con_col_v_path_idx" ON "_sc_con_col_v" USING btree ("_path");
  CREATE INDEX "_sc_con_col_v_locale_idx" ON "_sc_con_col_v" USING btree ("_locale");
  CREATE INDEX "_sc_emb_bas_v_order_idx" ON "_sc_emb_bas_v" USING btree ("_order");
  CREATE INDEX "_sc_emb_bas_v_parent_id_idx" ON "_sc_emb_bas_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_emb_bas_v_path_idx" ON "_sc_emb_bas_v" USING btree ("_path");
  CREATE INDEX "_sc_emb_bas_v_locale_idx" ON "_sc_emb_bas_v" USING btree ("_locale");
  CREATE INDEX "_sc_faq_acc_v_items_order_idx" ON "_sc_faq_acc_v_items" USING btree ("_order");
  CREATE INDEX "_sc_faq_acc_v_items_parent_id_idx" ON "_sc_faq_acc_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sc_faq_acc_v_items_locale_idx" ON "_sc_faq_acc_v_items" USING btree ("_locale");
  CREATE INDEX "_sc_faq_acc_v_links_order_idx" ON "_sc_faq_acc_v_links" USING btree ("_order");
  CREATE INDEX "_sc_faq_acc_v_links_parent_id_idx" ON "_sc_faq_acc_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_faq_acc_v_links_locale_idx" ON "_sc_faq_acc_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_faq_acc_v_order_idx" ON "_sc_faq_acc_v" USING btree ("_order");
  CREATE INDEX "_sc_faq_acc_v_parent_id_idx" ON "_sc_faq_acc_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_faq_acc_v_path_idx" ON "_sc_faq_acc_v" USING btree ("_path");
  CREATE INDEX "_sc_faq_acc_v_locale_idx" ON "_sc_faq_acc_v" USING btree ("_locale");
  CREATE INDEX "_sc_fea_ben_v_items_order_idx" ON "_sc_fea_ben_v_items" USING btree ("_order");
  CREATE INDEX "_sc_fea_ben_v_items_parent_id_idx" ON "_sc_fea_ben_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_ben_v_items_locale_idx" ON "_sc_fea_ben_v_items" USING btree ("_locale");
  CREATE INDEX "_sc_fea_ben_v_links_order_idx" ON "_sc_fea_ben_v_links" USING btree ("_order");
  CREATE INDEX "_sc_fea_ben_v_links_parent_id_idx" ON "_sc_fea_ben_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_ben_v_links_locale_idx" ON "_sc_fea_ben_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_fea_ben_v_order_idx" ON "_sc_fea_ben_v" USING btree ("_order");
  CREATE INDEX "_sc_fea_ben_v_parent_id_idx" ON "_sc_fea_ben_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_ben_v_path_idx" ON "_sc_fea_ben_v" USING btree ("_path");
  CREATE INDEX "_sc_fea_ben_v_locale_idx" ON "_sc_fea_ben_v" USING btree ("_locale");
  CREATE INDEX "_sc_fea_gri_bas_v_items_order_idx" ON "_sc_fea_gri_bas_v_items" USING btree ("_order");
  CREATE INDEX "_sc_fea_gri_bas_v_items_parent_id_idx" ON "_sc_fea_gri_bas_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_gri_bas_v_items_locale_idx" ON "_sc_fea_gri_bas_v_items" USING btree ("_locale");
  CREATE INDEX "_sc_fea_gri_bas_v_links_order_idx" ON "_sc_fea_gri_bas_v_links" USING btree ("_order");
  CREATE INDEX "_sc_fea_gri_bas_v_links_parent_id_idx" ON "_sc_fea_gri_bas_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_gri_bas_v_links_locale_idx" ON "_sc_fea_gri_bas_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_fea_gri_bas_v_order_idx" ON "_sc_fea_gri_bas_v" USING btree ("_order");
  CREATE INDEX "_sc_fea_gri_bas_v_parent_id_idx" ON "_sc_fea_gri_bas_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_gri_bas_v_path_idx" ON "_sc_fea_gri_bas_v" USING btree ("_path");
  CREATE INDEX "_sc_fea_gri_bas_v_locale_idx" ON "_sc_fea_gri_bas_v" USING btree ("_locale");
  CREATE INDEX "_sc_fea_ste_v_items_order_idx" ON "_sc_fea_ste_v_items" USING btree ("_order");
  CREATE INDEX "_sc_fea_ste_v_items_parent_id_idx" ON "_sc_fea_ste_v_items" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_ste_v_items_locale_idx" ON "_sc_fea_ste_v_items" USING btree ("_locale");
  CREATE INDEX "_sc_fea_ste_v_links_order_idx" ON "_sc_fea_ste_v_links" USING btree ("_order");
  CREATE INDEX "_sc_fea_ste_v_links_parent_id_idx" ON "_sc_fea_ste_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_ste_v_links_locale_idx" ON "_sc_fea_ste_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_fea_ste_v_order_idx" ON "_sc_fea_ste_v" USING btree ("_order");
  CREATE INDEX "_sc_fea_ste_v_parent_id_idx" ON "_sc_fea_ste_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_fea_ste_v_path_idx" ON "_sc_fea_ste_v" USING btree ("_path");
  CREATE INDEX "_sc_fea_ste_v_locale_idx" ON "_sc_fea_ste_v" USING btree ("_locale");
  CREATE INDEX "_sc_her_bas_v_links_order_idx" ON "_sc_her_bas_v_links" USING btree ("_order");
  CREATE INDEX "_sc_her_bas_v_links_parent_id_idx" ON "_sc_her_bas_v_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_her_bas_v_links_locale_idx" ON "_sc_her_bas_v_links" USING btree ("_locale");
  CREATE INDEX "_sc_her_bas_v_proof_items_order_idx" ON "_sc_her_bas_v_proof_items" USING btree ("_order");
  CREATE INDEX "_sc_her_bas_v_proof_items_parent_id_idx" ON "_sc_her_bas_v_proof_items" USING btree ("_parent_id");
  CREATE INDEX "_sc_her_bas_v_proof_items_locale_idx" ON "_sc_her_bas_v_proof_items" USING btree ("_locale");
  CREATE INDEX "_sc_her_bas_v_order_idx" ON "_sc_her_bas_v" USING btree ("_order");
  CREATE INDEX "_sc_her_bas_v_parent_id_idx" ON "_sc_her_bas_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_her_bas_v_path_idx" ON "_sc_her_bas_v" USING btree ("_path");
  CREATE INDEX "_sc_her_bas_v_locale_idx" ON "_sc_her_bas_v" USING btree ("_locale");
  CREATE INDEX "_sc_pri_car_v_plans_features_order_idx" ON "_sc_pri_car_v_plans_features" USING btree ("_order");
  CREATE INDEX "_sc_pri_car_v_plans_features_parent_id_idx" ON "_sc_pri_car_v_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_sc_pri_car_v_plans_features_locale_idx" ON "_sc_pri_car_v_plans_features" USING btree ("_locale");
  CREATE INDEX "_sc_pri_car_v_plans_links_order_idx" ON "_sc_pri_car_v_plans_links" USING btree ("_order");
  CREATE INDEX "_sc_pri_car_v_plans_links_parent_id_idx" ON "_sc_pri_car_v_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_sc_pri_car_v_plans_links_locale_idx" ON "_sc_pri_car_v_plans_links" USING btree ("_locale");
  CREATE INDEX "_sc_pri_car_v_plans_order_idx" ON "_sc_pri_car_v_plans" USING btree ("_order");
  CREATE INDEX "_sc_pri_car_v_plans_parent_id_idx" ON "_sc_pri_car_v_plans" USING btree ("_parent_id");
  CREATE INDEX "_sc_pri_car_v_plans_locale_idx" ON "_sc_pri_car_v_plans" USING btree ("_locale");
  CREATE INDEX "_sc_pri_car_v_order_idx" ON "_sc_pri_car_v" USING btree ("_order");
  CREATE INDEX "_sc_pri_car_v_parent_id_idx" ON "_sc_pri_car_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_pri_car_v_path_idx" ON "_sc_pri_car_v" USING btree ("_path");
  CREATE INDEX "_sc_pri_car_v_locale_idx" ON "_sc_pri_car_v" USING btree ("_locale");
  CREATE INDEX "_sc_sta_gri_v_metrics_order_idx" ON "_sc_sta_gri_v_metrics" USING btree ("_order");
  CREATE INDEX "_sc_sta_gri_v_metrics_parent_id_idx" ON "_sc_sta_gri_v_metrics" USING btree ("_parent_id");
  CREATE INDEX "_sc_sta_gri_v_metrics_locale_idx" ON "_sc_sta_gri_v_metrics" USING btree ("_locale");
  CREATE INDEX "_sc_sta_gri_v_order_idx" ON "_sc_sta_gri_v" USING btree ("_order");
  CREATE INDEX "_sc_sta_gri_v_parent_id_idx" ON "_sc_sta_gri_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_sta_gri_v_path_idx" ON "_sc_sta_gri_v" USING btree ("_path");
  CREATE INDEX "_sc_sta_gri_v_locale_idx" ON "_sc_sta_gri_v" USING btree ("_locale");
  CREATE INDEX "_sc_tea_gri_v_members_order_idx" ON "_sc_tea_gri_v_members" USING btree ("_order");
  CREATE INDEX "_sc_tea_gri_v_members_parent_id_idx" ON "_sc_tea_gri_v_members" USING btree ("_parent_id");
  CREATE INDEX "_sc_tea_gri_v_members_locale_idx" ON "_sc_tea_gri_v_members" USING btree ("_locale");
  CREATE INDEX "_sc_tea_gri_v_members_avatar_idx" ON "_sc_tea_gri_v_members" USING btree ("avatar_id");
  CREATE INDEX "_sc_tea_gri_v_order_idx" ON "_sc_tea_gri_v" USING btree ("_order");
  CREATE INDEX "_sc_tea_gri_v_parent_id_idx" ON "_sc_tea_gri_v" USING btree ("_parent_id");
  CREATE INDEX "_sc_tea_gri_v_path_idx" ON "_sc_tea_gri_v" USING btree ("_path");
  CREATE INDEX "_sc_tea_gri_v_locale_idx" ON "_sc_tea_gri_v" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "sc_cal_to_act_cen_links" CASCADE;
  DROP TABLE "sc_cal_to_act_cen" CASCADE;
  DROP TABLE "sc_com_gri_plans_links" CASCADE;
  DROP TABLE "sc_com_gri_plans" CASCADE;
  DROP TABLE "sc_com_gri_features_values" CASCADE;
  DROP TABLE "sc_com_gri_features" CASCADE;
  DROP TABLE "sc_com_gri" CASCADE;
  DROP TABLE "sc_con_col_paragraphs" CASCADE;
  DROP TABLE "sc_con_col_links" CASCADE;
  DROP TABLE "sc_con_col" CASCADE;
  DROP TABLE "sc_emb_bas" CASCADE;
  DROP TABLE "sc_faq_acc_items" CASCADE;
  DROP TABLE "sc_faq_acc_links" CASCADE;
  DROP TABLE "sc_faq_acc" CASCADE;
  DROP TABLE "sc_fea_ben_items" CASCADE;
  DROP TABLE "sc_fea_ben_links" CASCADE;
  DROP TABLE "sc_fea_ben" CASCADE;
  DROP TABLE "sc_fea_gri_bas_items" CASCADE;
  DROP TABLE "sc_fea_gri_bas_links" CASCADE;
  DROP TABLE "sc_fea_gri_bas" CASCADE;
  DROP TABLE "sc_fea_ste_items" CASCADE;
  DROP TABLE "sc_fea_ste_links" CASCADE;
  DROP TABLE "sc_fea_ste" CASCADE;
  DROP TABLE "sc_her_bas_links" CASCADE;
  DROP TABLE "sc_her_bas_proof_items" CASCADE;
  DROP TABLE "sc_her_bas" CASCADE;
  DROP TABLE "sc_pri_car_plans_features" CASCADE;
  DROP TABLE "sc_pri_car_plans_links" CASCADE;
  DROP TABLE "sc_pri_car_plans" CASCADE;
  DROP TABLE "sc_pri_car" CASCADE;
  DROP TABLE "sc_sta_gri_metrics" CASCADE;
  DROP TABLE "sc_sta_gri" CASCADE;
  DROP TABLE "sc_tea_gri_members" CASCADE;
  DROP TABLE "sc_tea_gri" CASCADE;
  DROP TABLE "_sc_cal_to_act_cen_v_links" CASCADE;
  DROP TABLE "_sc_cal_to_act_cen_v" CASCADE;
  DROP TABLE "_sc_com_gri_v_plans_links" CASCADE;
  DROP TABLE "_sc_com_gri_v_plans" CASCADE;
  DROP TABLE "_sc_com_gri_v_features_values" CASCADE;
  DROP TABLE "_sc_com_gri_v_features" CASCADE;
  DROP TABLE "_sc_com_gri_v" CASCADE;
  DROP TABLE "_sc_con_col_v_paragraphs" CASCADE;
  DROP TABLE "_sc_con_col_v_links" CASCADE;
  DROP TABLE "_sc_con_col_v" CASCADE;
  DROP TABLE "_sc_emb_bas_v" CASCADE;
  DROP TABLE "_sc_faq_acc_v_items" CASCADE;
  DROP TABLE "_sc_faq_acc_v_links" CASCADE;
  DROP TABLE "_sc_faq_acc_v" CASCADE;
  DROP TABLE "_sc_fea_ben_v_items" CASCADE;
  DROP TABLE "_sc_fea_ben_v_links" CASCADE;
  DROP TABLE "_sc_fea_ben_v" CASCADE;
  DROP TABLE "_sc_fea_gri_bas_v_items" CASCADE;
  DROP TABLE "_sc_fea_gri_bas_v_links" CASCADE;
  DROP TABLE "_sc_fea_gri_bas_v" CASCADE;
  DROP TABLE "_sc_fea_ste_v_items" CASCADE;
  DROP TABLE "_sc_fea_ste_v_links" CASCADE;
  DROP TABLE "_sc_fea_ste_v" CASCADE;
  DROP TABLE "_sc_her_bas_v_links" CASCADE;
  DROP TABLE "_sc_her_bas_v_proof_items" CASCADE;
  DROP TABLE "_sc_her_bas_v" CASCADE;
  DROP TABLE "_sc_pri_car_v_plans_features" CASCADE;
  DROP TABLE "_sc_pri_car_v_plans_links" CASCADE;
  DROP TABLE "_sc_pri_car_v_plans" CASCADE;
  DROP TABLE "_sc_pri_car_v" CASCADE;
  DROP TABLE "_sc_sta_gri_v_metrics" CASCADE;
  DROP TABLE "_sc_sta_gri_v" CASCADE;
  DROP TABLE "_sc_tea_gri_v_members" CASCADE;
  DROP TABLE "_sc_tea_gri_v" CASCADE;
  DROP TYPE "public"."enum_sc_cal_to_act_cen_links_link_type";
  DROP TYPE "public"."enum_sc_cal_to_act_cen_links_link_appearance";
  DROP TYPE "public"."enum_sc_com_gri_plans_links_link_type";
  DROP TYPE "public"."enum_sc_com_gri_plans_links_link_appearance";
  DROP TYPE "public"."enum_sc_con_col_links_link_type";
  DROP TYPE "public"."enum_sc_con_col_links_link_appearance";
  DROP TYPE "public"."enum_sc_emb_bas_aspect_ratio";
  DROP TYPE "public"."enum_sc_faq_acc_links_link_type";
  DROP TYPE "public"."enum_sc_faq_acc_links_link_appearance";
  DROP TYPE "public"."enum_sc_fea_ben_links_link_type";
  DROP TYPE "public"."enum_sc_fea_ben_links_link_appearance";
  DROP TYPE "public"."enum_sc_fea_gri_bas_links_link_type";
  DROP TYPE "public"."enum_sc_fea_gri_bas_links_link_appearance";
  DROP TYPE "public"."enum_sc_fea_ste_links_link_type";
  DROP TYPE "public"."enum_sc_fea_ste_links_link_appearance";
  DROP TYPE "public"."enum_sc_her_bas_links_link_type";
  DROP TYPE "public"."enum_sc_her_bas_links_link_appearance";
  DROP TYPE "public"."enum_sc_pri_car_plans_links_link_type";
  DROP TYPE "public"."enum_sc_pri_car_plans_links_link_appearance";
  DROP TYPE "public"."enum__sc_cal_to_act_cen_v_links_link_type";
  DROP TYPE "public"."enum__sc_cal_to_act_cen_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_com_gri_v_plans_links_link_type";
  DROP TYPE "public"."enum__sc_com_gri_v_plans_links_link_appearance";
  DROP TYPE "public"."enum__sc_con_col_v_links_link_type";
  DROP TYPE "public"."enum__sc_con_col_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_emb_bas_v_aspect_ratio";
  DROP TYPE "public"."enum__sc_faq_acc_v_links_link_type";
  DROP TYPE "public"."enum__sc_faq_acc_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_fea_ben_v_links_link_type";
  DROP TYPE "public"."enum__sc_fea_ben_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_fea_gri_bas_v_links_link_type";
  DROP TYPE "public"."enum__sc_fea_gri_bas_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_fea_ste_v_links_link_type";
  DROP TYPE "public"."enum__sc_fea_ste_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_her_bas_v_links_link_type";
  DROP TYPE "public"."enum__sc_her_bas_v_links_link_appearance";
  DROP TYPE "public"."enum__sc_pri_car_v_plans_links_link_type";
  DROP TYPE "public"."enum__sc_pri_car_v_plans_links_link_appearance";`)
}
