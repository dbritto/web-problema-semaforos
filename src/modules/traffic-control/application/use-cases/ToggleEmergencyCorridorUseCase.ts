import { UseCase } from '@shared/application';
import { DomainError } from '@shared/domain';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';

export interface ToggleEmergencyInput {
  readonly intersectionId: string;
}

/**
 * CASO DE USO (Application Layer): Activar/Desactivar corredor de emergencia en una intersección.
 */
export class ToggleEmergencyCorridorUseCase
  implements UseCase<ToggleEmergencyInput, TrafficIntersection>
{
  constructor(private readonly repository: TrafficIntersectionRepositoryPort) {}

  public async execute(input: ToggleEmergencyInput): Promise<TrafficIntersection> {
    const intersection = await this.repository.findById(input.intersectionId);
    if (!intersection) {
      throw new DomainError(
        `No se encontró la intersección con ID ${input.intersectionId}`,
        'INTERSECTION_NOT_FOUND'
      );
    }

    const updated = intersection.toggleEmergencyCorridor();
    await this.repository.save(updated);
    return updated;
  }
}
