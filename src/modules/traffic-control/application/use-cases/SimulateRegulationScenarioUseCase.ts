import { UseCase } from '@shared/application';
import { DomainError } from '@shared/domain';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';
import { RegulatorActorType } from '../../domain/value-objects/TrafficRegulationCondition';

export interface SimulateRegulationScenarioInput {
  readonly intersectionId: string;
  readonly regulator: RegulatorActorType;
  readonly isRaining: boolean;
}

/**
 * CASO DE USO (Application Layer):
 * Permite simular en una intersección de Cali qué ocurre con el tiempo de espera y la cola
 * cuando regula Nadie, un Voluntario de la Comunidad, un Agente de Tránsito o el Nodo Arduino + Solar,
 * además de activar/desactivar la variable de control Lluvia.
 */
export class SimulateRegulationScenarioUseCase
  implements UseCase<SimulateRegulationScenarioInput, TrafficIntersection>
{
  constructor(private readonly repository: TrafficIntersectionRepositoryPort) {}

  public async execute(input: SimulateRegulationScenarioInput): Promise<TrafficIntersection> {
    const intersection = await this.repository.findById(input.intersectionId);
    if (!intersection) {
      throw new DomainError(
        `No se encontró la intersección con ID ${input.intersectionId}`,
        'INTERSECTION_NOT_FOUND'
      );
    }

    const updated = intersection.applyRegulationScenario(input.regulator, input.isRaining);
    await this.repository.save(updated);
    return updated;
  }
}
