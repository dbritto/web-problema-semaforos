import { UseCase } from '@shared/application';
import { DomainError } from '@shared/domain';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';

export interface AdvancePhaseInput {
  readonly intersectionId: string;
}

/**
 * CASO DE USO (Application Layer): Avanzar de fase un semáforo aplicando reglas de dominio.
 */
export class AdvanceIntersectionPhaseUseCase
  implements UseCase<AdvancePhaseInput, TrafficIntersection>
{
  constructor(private readonly repository: TrafficIntersectionRepositoryPort) {}

  public async execute(input: AdvancePhaseInput): Promise<TrafficIntersection> {
    const intersection = await this.repository.findById(input.intersectionId);
    if (!intersection) {
      throw new DomainError(
        `No se encontró la intersección con ID ${input.intersectionId}`,
        'INTERSECTION_NOT_FOUND'
      );
    }

    const updated = intersection.advanceToNextPhase();
    await this.repository.save(updated);
    return updated;
  }
}
