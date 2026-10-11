import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" ADD COLUMN "project_link_label" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "project_link_url" varchar;
  ALTER TABLE "case_studies" ADD COLUMN "project_link_new_tab" boolean DEFAULT true;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_project_link_label" varchar;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_project_link_url" varchar;
  ALTER TABLE "_case_studies_v" ADD COLUMN "version_project_link_new_tab" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "case_studies" DROP COLUMN "project_link_label";
  ALTER TABLE "case_studies" DROP COLUMN "project_link_url";
  ALTER TABLE "case_studies" DROP COLUMN "project_link_new_tab";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_project_link_label";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_project_link_url";
  ALTER TABLE "_case_studies_v" DROP COLUMN "version_project_link_new_tab";`)
}
