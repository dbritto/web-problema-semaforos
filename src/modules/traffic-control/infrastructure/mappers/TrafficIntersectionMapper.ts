import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import { LightPhase, TrafficPhaseColor } from '../../domain/value-objects/LightPhase';
import { CongestionLevel } from '../../domain/value-objects/CongestionLevel';
import {
  TrafficRegulationCondition,
  RegulatorActorType,
} from '../../domain/value-objects/TrafficRegulationCondition';
import {
  AutonomousSolarZoneSpec,
  CaliZoneId,
} from '../../domain/value-objects/AutonomousSolarZoneSpec';

export interface IntersectionPersistenceDTO {
  id: string;
  code: string;
  name: string;
  avenue: string;
  zoneId: CaliZoneId;
  reportedStatus: string;
  phaseColor: TrafficPhaseColor;
  phaseDurationSeconds: number;
  vehiclesWaiting: number;
  regulator: RegulatorActorType;
  isRaining: boolean;
  isPeakHour: boolean;
  baseWaitSeconds: number;
  emergencyPriorityActive: boolean;
}

/**
 * MAPPER DE INFRAESTRUCTURA:
 * Traduce entre el DTO de persistencia y el Modelo de Dominio DDD de Cali.
 */
export class TrafficIntersectionMapper {
  public static toDomain(dto: IntersectionPersistenceDTO): TrafficIntersection {
    return TrafficIntersection.create(
      {
        code: dto.code,
        name: dto.name,
        avenue: dto.avenue,
        zoneId: dto.zoneId,
        reportedStatus: dto.reportedStatus,
        currentPhase: LightPhase.create(dto.phaseColor, dto.phaseDurationSeconds),
        congestion: CongestionLevel.create(dto.vehiclesWaiting),
        regulationCondition: TrafficRegulationCondition.create({
          regulator: dto.regulator,
          isRaining: dto.isRaining,
          isPeakHour: dto.isPeakHour,
        }),
        solarZoneSpec: AutonomousSolarZoneSpec.createDefaultForZone(dto.zoneId),
        baseWaitSeconds: dto.baseWaitSeconds,
        emergencyPriorityActive: dto.emergencyPriorityActive,
      },
      dto.id
    );
  }

  public static toPersistence(entity: TrafficIntersection): IntersectionPersistenceDTO {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      avenue: entity.avenue,
      zoneId: entity.zoneId,
      reportedStatus: entity.reportedStatus,
      phaseColor: entity.currentPhase.color,
      phaseDurationSeconds: entity.currentPhase.durationSeconds,
      vehiclesWaiting: entity.congestion.vehiclesWaiting,
      regulator: entity.regulationCondition.regulator,
      isRaining: entity.regulationCondition.isRaining,
      isPeakHour: entity.regulationCondition.isPeakHour,
      baseWaitSeconds: entity.baseWaitSeconds,
      emergencyPriorityActive: entity.emergencyPriorityActive,
    };
  }
}
