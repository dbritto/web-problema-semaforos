import { UseCase } from '@shared/application';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';
import { CaliZoneId } from '../../domain/value-objects/AutonomousSolarZoneSpec';

export interface MigrateZoneToSolarInput {
  readonly zoneId: CaliZoneId;
}

/**
 * CASO DE USO (Application Layer):
 * Migra todas las intersecciones de una Zona de Cali (Zona Norte o Zona Oriente)
 * a la propuesta de Administración Centralizada por Zonas con Arduino + Luces LED + Paneles Solares.
 */
export class ActivateAutonomousSolarZoneUseCase
  implements UseCase<MigrateZoneToSolarInput, TrafficIntersection[]>
{
  constructor(private readonly repository: TrafficIntersectionRepositoryPort) {}

  public async execute(input: MigrateZoneToSolarInput): Promise<TrafficIntersection[]> {
    const all = await this.repository.findAll();
    const updatedList: TrafficIntersection[] = [];

    for (const intersection of all) {
      if (intersection.zoneId === input.zoneId) {
        const migrated = intersection.applyRegulationScenario(
          'ARDUINO_SOLAR_NODE',
          intersection.regulationCondition.isRaining
        );
        await this.repository.save(migrated);
        updatedList.push(migrated);
      } else {
        updatedList.push(intersection);
      }
    }

    return updatedList;
  }
}
