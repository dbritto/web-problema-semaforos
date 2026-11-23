import { UseCase } from '@shared/application';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';

/**
 * CASO DE USO (Application Layer): Obtener todas las intersecciones semafóricas.
 */
export class GetIntersectionsUseCase implements UseCase<void, TrafficIntersection[]> {
  constructor(private readonly repository: TrafficIntersectionRepositoryPort) {}

  public async execute(): Promise<TrafficIntersection[]> {
    return this.repository.findAll();
  }
}
