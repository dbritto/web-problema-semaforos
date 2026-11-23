import { UseCase } from '@shared/application';
import { DomainError } from '@shared/domain';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';

export interface UpdateCongestionInput {
  readonly intersectionId: string;
  readonly vehiclesWaiting: number;
}

/**
 * CASO DE USO (Application Layer): Actualizar cola vehicular y recalcular ola verde óptima.
 */
export class OptimizeIntersectionCongestionUseCase
  implements UseCase<UpdateCongestionInput, TrafficIntersection>
{
  constructor(private readonly repository: TrafficIntersectionRepositoryPort) {}

  public async execute(input: UpdateCongestionInput): Promise<TrafficIntersection> {
    const intersection = await this.repository.findById(input.intersectionId);
    if (!intersection) {
      throw new DomainError(
        `No se encontró la intersección con ID ${input.intersectionId}`,
        'INTERSECTION_NOT_FOUND'
      );
    }

    const updated = intersection.registerVehicleQueue(input.vehiclesWaiting);
    await this.repository.save(updated);
    return updated;
  }
}
