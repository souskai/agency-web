import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_case_studies_phase" AS ENUM('previous', 'current', 'future');
  CREATE TYPE "public"."enum__case_studies_v_version_phase" AS ENUM('previous', 'current', 'future');
  ALTER TABLE "case_studies" ADD COLUMN "phase" "enum_case_studies_phase" DEFAULT 'current';
  ALTER TABLE "case_studies" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "case_studies" ADD COLUMN "sort_order" numeric;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_phase" "enum__case_studies_v_version_phase" DEFAULT 'current';
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_sort_order" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" DROP COLUMN "phase";
  ALTER TABLE "case_studies" DROP COLUMN "featured";
  ALTER TABLE "case_studies" DROP COLUMN "sort_order";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_phase";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_featured";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_sort_order";
  DROP TYPE "public"."enum_case_studies_phase";
  DROP TYPE "public"."enum__case_studies_v_version_phase";`)
}
