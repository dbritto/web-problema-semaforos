import { Entity, DomainError } from '@shared/domain';
import { LightPhase } from '../value-objects/LightPhase';
import { CongestionLevel } from '../value-objects/CongestionLevel';
import {
  TrafficRegulationCondition,
  RegulatorActorType,
} from '../value-objects/TrafficRegulationCondition';
import {
  AutonomousSolarZoneSpec,
  CaliZoneId,
} from '../value-objects/AutonomousSolarZoneSpec';

export interface TrafficIntersectionProps {
  code: string;
  name: string;
  avenue: string;
  zoneId: CaliZoneId;
  reportedStatus: string;
  currentPhase: LightPhase;
  congestion: CongestionLevel;
  regulationCondition: TrafficRegulationCondition;
  solarZoneSpec: AutonomousSolarZoneSpec;
  baseWaitSeconds: number;
  emergencyPriorityActive: boolean;
}

/**
 * AGGREGATE ROOT / ENTITY (DDD): TrafficIntersection
 * Representa cada una de las intersecciones reales del Norte y Oriente de Cali (Tabla 2 del estudio),
 * incluyendo su estado de daño reportado, quién regula el cruce, el impacto de la lluvia y la
 * simulación de transición a la solución con Arduino + Luces LED + Paneles Solares por Zona Autónoma.
 */
export class TrafficIntersection extends Entity<TrafficIntersectionProps, string> {
  private constructor(props: TrafficIntersectionProps, id: string) {
    super(props, id);
  }

  public static create(props: TrafficIntersectionProps, id: string): TrafficIntersection {
    if (!props.name.trim()) {
      throw new DomainError('El nombre de la intersección es obligatorio.', 'EMPTY_INTERSECTION_NAME');
    }
    return new TrafficIntersection(props, id);
  }

  public get code(): string {
    return this.props.code;
  }

  public get name(): string {
    return this.props.name;
  }

  public get avenue(): string {
    return this.props.avenue;
  }

  public get zoneId(): CaliZoneId {
    return this.props.zoneId;
  }

  public get reportedStatus(): string {
    return this.props.reportedStatus;
  }

  public get currentPhase(): LightPhase {
    return this.props.currentPhase;
  }

  public get congestion(): CongestionLevel {
    return this.props.congestion;
  }

  public get regulationCondition(): TrafficRegulationCondition {
    return this.props.regulationCondition;
  }

  public get solarZoneSpec(): AutonomousSolarZoneSpec {
    return this.props.solarZoneSpec;
  }

  public get baseWaitSeconds(): number {
    return this.props.baseWaitSeconds;
  }

  public get emergencyPriorityActive(): boolean {
    return this.props.emergencyPriorityActive;
  }

  /**
   * Regla de Dominio: Calcula el tiempo de espera vehicular en segundos según quién regula
   * la intersección dañada y si está lloviendo (Variables Dependiente, Independiente y de Control).
   */
  public calculateCurrentWaitSeconds(): number {
    return this.props.regulationCondition.calculateEstimatedWaitSeconds(this.props.baseWaitSeconds);
  }

  /**
   * Comportamiento de Dominio: Cambia quién regula el cruce (Nadie, Comunidad, Agente o Nodo Arduino Solar)
   * o el estado de lluvia para contrastar la hipótesis de la investigación.
   */
  public applyRegulationScenario(
    regulator: RegulatorActorType,
    isRaining: boolean
  ): TrafficIntersection {
    const newCondition = TrafficRegulationCondition.create({
      regulator,
      isRaining,
      isPeakHour: this.props.regulationCondition.isPeakHour,
    });

    // Ajusta la cola vehicular según la eficiencia del regulador y la lluvia
    const multiplierMap: Record<RegulatorActorType, number> = {
      NONE: 1.5,
      COMMUNITY_VOLUNTEER: 1.15,
      TRAFFIC_AGENT: 0.85,
      ARDUINO_SOLAR_NODE: 0.55,
    };
    const rainPenalty = isRaining ? 1.25 : 1.0;
    const baseVehicles = 24;
    const recalculatedQueue = Math.round(
      baseVehicles * multiplierMap[regulator] * rainPenalty
    );

    const newCongestion = CongestionLevel.create(recalculatedQueue);
    const nextPhase =
      regulator === 'ARDUINO_SOLAR_NODE'
        ? LightPhase.create('GREEN', newCongestion.calculateOptimalGreenDurationSeconds())
        : this.props.currentPhase;

    return new TrafficIntersection(
      {
        ...this.props,
        regulationCondition: newCondition,
        congestion: newCongestion,
        currentPhase: nextPhase,
        reportedStatus:
          regulator === 'ARDUINO_SOLAR_NODE'
            ? 'Operando en Red Zonal Autónoma (Arduino + LED + Solar)'
            : 'Fuera de servicio en red eléctrica tradicional',
      },
      this.id
    );
  }

  /**
   * Comportamiento de Dominio: Avanza a la siguiente fase semafórica del controlador Arduino.
   */
  public advanceToNextPhase(): TrafficIntersection {
    const optimalGreen = this.props.congestion.calculateOptimalGreenDurationSeconds();
    const nextPhase = this.props.currentPhase.nextPhase(optimalGreen);

    const updatedVehicles =
      nextPhase.color === 'GREEN'
        ? Math.max(4, Math.floor(this.props.congestion.vehiclesWaiting * 0.65))
        : this.props.congestion.vehiclesWaiting;

    return new TrafficIntersection(
      {
        ...this.props,
        currentPhase: nextPhase,
        congestion: CongestionLevel.create(updatedVehicles),
      },
      this.id
    );
  }

  /**
   * Comportamiento de Dominio: Registra nueva cola de vehículos cada 5 minutos.
   */
  public registerVehicleQueue(vehiclesWaiting: number): TrafficIntersection {
    const newCongestion = CongestionLevel.create(vehiclesWaiting);
    const optimalGreen = newCongestion.calculateOptimalGreenDurationSeconds();

    const updatedPhase =
      this.props.currentPhase.color === 'GREEN'
        ? LightPhase.create('GREEN', optimalGreen)
        : this.props.currentPhase;

    return new TrafficIntersection(
      {
        ...this.props,
        congestion: newCongestion,
        currentPhase: updatedPhase,
      },
      this.id
    );
  }

  /**
   * Comportamiento de Dominio: Activa o desactiva prioridad zonal.
   */
  public toggleEmergencyCorridor(): TrafficIntersection {
    const nextEmergencyState = !this.props.emergencyPriorityActive;
    return new TrafficIntersection(
      {
        ...this.props,
        emergencyPriorityActive: nextEmergencyState,
        currentPhase: nextEmergencyState
          ? LightPhase.create('GREEN', 90)
          : this.props.currentPhase,
      },
      this.id
    );
  }
}
