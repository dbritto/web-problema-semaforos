import { TrafficIntersection } from '../entities/TrafficIntersection';

/**
 * CONTRATO / PUERTO SECUNDARIO (Hexagonal Architecture Driven Port):
 * Define qué operaciones de persistencia necesita el Dominio/Aplicación,
 * sin importar si vienen de una API REST, WebSockets o Memoria.
 */
export interface TrafficIntersectionRepositoryPort {
  findAll(): Promise<TrafficIntersection[]>;
  findById(id: string): Promise<TrafficIntersection | null>;
  save(intersection: TrafficIntersection): Promise<void>;
}
