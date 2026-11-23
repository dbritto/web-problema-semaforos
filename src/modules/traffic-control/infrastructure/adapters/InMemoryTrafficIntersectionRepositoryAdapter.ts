import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { TrafficIntersectionRepositoryPort } from '../../domain/ports/TrafficIntersectionRepositoryPort';
import {
  IntersectionPersistenceDTO,
  TrafficIntersectionMapper,
} from '../mappers/TrafficIntersectionMapper';

/**
 * DATOS REALES DE LA INVESTIGACIÓN (Tabla 2: Intersecciones Seleccionadas en el Norte y Oriente de Cali)
 * Facultad de Ingenierías - Institución Universitaria Antonio José Camacho (UNIAJC)
 */
const INITIAL_INTERSECTIONS_SEED: IntersectionPersistenceDTO[] = [
  {
    id: 'cali-norte-01',
    code: 'INT-N01',
    name: 'Calle 47 con Avenida 6 Norte',
    avenue: 'Corredor Vial Zona Norte — Cali',
    zoneId: 'ZONA_NORTE',
    reportedStatus: 'Reportado fuera de servicio (jul. 2026); sin señal clara en hora pico',
    phaseColor: 'RED',
    phaseDurationSeconds: 50,
    vehiclesWaiting: 38,
    regulator: 'NONE',
    isRaining: false,
    isPeakHour: true,
    baseWaitSeconds: 65,
    emergencyPriorityActive: false,
  },
  {
    id: 'cali-norte-02',
    code: 'INT-N02',
    name: 'Calle 52 con Avenida 3 Norte',
    avenue: 'Corredor Vial Zona Norte — Cali',
    zoneId: 'ZONA_NORTE',
    reportedStatus: 'Reportado fuera de servicio (jul. 2026); regulado por habitante del sector',
    phaseColor: 'YELLOW',
    phaseDurationSeconds: 6,
    vehiclesWaiting: 29,
    regulator: 'COMMUNITY_VOLUNTEER',
    isRaining: false,
    isPeakHour: true,
    baseWaitSeconds: 60,
    emergencyPriorityActive: false,
  },
  {
    id: 'cali-norte-03',
    code: 'INT-N03',
    name: 'Calle 55 con Avenida 3 Norte',
    avenue: 'Corredor Vial Zona Norte — Cali',
    zoneId: 'ZONA_NORTE',
    reportedStatus: 'Reportado fuera de servicio (jul. 2026); congestión crítica bajo lluvia',
    phaseColor: 'RED',
    phaseDurationSeconds: 55,
    vehiclesWaiting: 44,
    regulator: 'NONE',
    isRaining: true,
    isPeakHour: true,
    baseWaitSeconds: 70,
    emergencyPriorityActive: false,
  },
  {
    id: 'cali-oriente-01',
    code: 'INT-O01',
    name: 'Calle 72U con Carrera 28D',
    avenue: 'Corredor Vial Zona Oriente — Cali',
    zoneId: 'ZONA_ORIENTE',
    reportedStatus: 'Reportado fuera de servicio (jul. 2026); regulado por voluntario comunitario',
    phaseColor: 'RED',
    phaseDurationSeconds: 45,
    vehiclesWaiting: 35,
    regulator: 'COMMUNITY_VOLUNTEER',
    isRaining: false,
    isPeakHour: true,
    baseWaitSeconds: 68,
    emergencyPriorityActive: false,
  },
  {
    id: 'cali-oriente-02',
    code: 'INT-O02',
    name: 'Calle 44 con Carrera 29',
    avenue: 'Corredor Vial Zona Oriente — Cali',
    zoneId: 'ZONA_ORIENTE',
    reportedStatus: 'Reportado fuera de servicio (jul. 2026); cruce por improvisación vehicular',
    phaseColor: 'RED',
    phaseDurationSeconds: 45,
    vehiclesWaiting: 41,
    regulator: 'NONE',
    isRaining: true,
    isPeakHour: true,
    baseWaitSeconds: 72,
    emergencyPriorityActive: false,
  },
  {
    id: 'cali-oriente-03',
    code: 'INT-O03',
    name: 'Calle 70 con Carrera 7L',
    avenue: 'Corredor Vial Zona Oriente — Cali',
    zoneId: 'ZONA_ORIENTE',
    reportedStatus: 'Piloto Activo: Nodo Autónomo Arduino + LED + Panel Solar Zonal',
    phaseColor: 'GREEN',
    phaseDurationSeconds: 40,
    vehiclesWaiting: 13,
    regulator: 'ARDUINO_SOLAR_NODE',
    isRaining: false,
    isPeakHour: true,
    baseWaitSeconds: 64,
    emergencyPriorityActive: false,
  },
];

/**
 * ADAPTADOR SECUNDARIO (Hexagonal Driven Adapter):
 * Implementa `TrafficIntersectionRepositoryPort` con los datos del estudio de campo en Cali.
 */
export class InMemoryTrafficIntersectionRepositoryAdapter
  implements TrafficIntersectionRepositoryPort
{
  private records: Map<string, IntersectionPersistenceDTO> = new Map(
    INITIAL_INTERSECTIONS_SEED.map((dto) => [dto.id, dto])
  );

  public async findAll(): Promise<TrafficIntersection[]> {
    return Array.from(this.records.values()).map(TrafficIntersectionMapper.toDomain);
  }

  public async findById(id: string): Promise<TrafficIntersection | null> {
    const dto = this.records.get(id);
    return dto ? TrafficIntersectionMapper.toDomain(dto) : null;
  }

  public async save(intersection: TrafficIntersection): Promise<void> {
    const dto = TrafficIntersectionMapper.toPersistence(intersection);
    this.records.set(dto.id, dto);
  }
}
