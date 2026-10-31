import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');

  CREATE TABLE "public"."footer_legal_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "public"."_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "link_type" "public"."enum_footer_legal_links_link_type" DEFAULT 'reference'::"public"."enum_footer_legal_links_link_type",
    "link_new_tab" boolean,
    "link_url" varchar,
    "link_label" varchar NOT NULL
  );

  CREATE INDEX "footer_legal_links_order_idx" ON "public"."footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "public"."footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_locale_idx" ON "public"."footer_legal_links" USING btree ("_locale");

  ALTER TABLE "public"."footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "public"."footer_legal_links";

  DROP TYPE "public"."enum_footer_legal_links_link_type";`)
}