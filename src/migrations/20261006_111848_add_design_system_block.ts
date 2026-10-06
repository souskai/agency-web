import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "services_blocks_design_system" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_design_system" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "services_blocks_design_system" ADD CONSTRAINT "services_blocks_design_system_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_design_system" ADD CONSTRAINT "_services_v_blocks_design_system_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_blocks_design_system_order_idx" ON "services_blocks_design_system" USING btree ("_order");
  CREATE INDEX "services_blocks_design_system_parent_id_idx" ON "services_blocks_design_system" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_design_system_path_idx" ON "services_blocks_design_system" USING btree ("_path");
  CREATE INDEX "services_blocks_design_system_locale_idx" ON "services_blocks_design_system" USING btree ("_locale");
  CREATE INDEX "_services_v_blocks_design_system_order_idx" ON "_services_v_blocks_design_system" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_design_system_parent_id_idx" ON "_services_v_blocks_design_system" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_design_system_path_idx" ON "_services_v_blocks_design_system" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_design_system_locale_idx" ON "_services_v_blocks_design_system" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "services_blocks_design_system" CASCADE;
  DROP TABLE "_services_v_blocks_design_system" CASCADE;`)
}
