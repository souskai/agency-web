import * as migration_20260816_124108_kit_first_baseline from './20260816_124108_kit_first_baseline';
import * as migration_20261002_140417_add_services_hero from './20261002_140417_add_services_hero';
import * as migration_20261003_123608_add_services_layout from './20261003_123608_add_services_layout';
import * as migration_20261006_111848_add_design_system_block from './20261006_111848_add_design_system_block';
import * as migration_20261006_123740_deconflict_kit_block_tables from './20261006_123740_deconflict_kit_block_tables';

export const migrations = [
  {
    up: migration_20260816_124108_kit_first_baseline.up,
    down: migration_20260816_124108_kit_first_baseline.down,
    name: '20260816_124108_kit_first_baseline',
  },
  {
    up: migration_20261002_140417_add_services_hero.up,
    down: migration_20261002_140417_add_services_hero.down,
    name: '20261002_140417_add_services_hero',
  },
  {
    up: migration_20261003_123608_add_services_layout.up,
    down: migration_20261003_123608_add_services_layout.down,
    name: '20261003_123608_add_services_layout',
  },
  {
    up: migration_20261006_111848_add_design_system_block.up,
    down: migration_20261006_111848_add_design_system_block.down,
    name: '20261006_111848_add_design_system_block',
  },
  {
    up: migration_20261006_123740_deconflict_kit_block_tables.up,
    down: migration_20261006_123740_deconflict_kit_block_tables.down,
    name: '20261006_123740_deconflict_kit_block_tables'
  },
];
