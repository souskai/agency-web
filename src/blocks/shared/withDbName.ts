import type { Block } from 'payload'

/**
 * Returns a shallow clone of a block with an overridden table identifier.
 *
 * Kit blocks ship with a short, stable `dbName` (e.g. `pc_*`) to stay under
 * Postgres's 63-character identifier limit (their auto-generated
 * `<collection>_blocks_<slug>` names are too long). A fixed `dbName` is fine
 * for one collection, but when the same block is registered in two collections
 * it makes them share the same tables — which collides (integer serial ids in
 * the version tables). Clone the block with a distinct `dbName` per collection
 * so each collection gets its own set of tables while keeping the same slug
 * (and therefore the same `blockType` in saved data) and interfaceName.
 */
export const withDbName = (block: Block, dbName: string): Block => ({
  ...block,
  dbName,
})
