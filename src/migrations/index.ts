import * as migration_20260816_124108_kit_first_baseline from './20260816_124108_kit_first_baseline';
import * as migration_20261002_140417_add_services_hero from './20261002_140417_add_services_hero';

export const migrations = [
  {
    up: migration_20260816_124108_kit_first_baseline.up,
    down: migration_20260816_124108_kit_first_baseline.down,
    name: '20260816_124108_kit_first_baseline',
  },
  {
    up: migration_20261002_140417_add_services_hero.up,
    down: migration_20261002_140417_add_services_hero.down,
    name: '20261002_140417_add_services_hero'
  },
];
