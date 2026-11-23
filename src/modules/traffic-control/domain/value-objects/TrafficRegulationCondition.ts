import { ValueObject, DomainError } from '@shared/domain';

export type RegulatorActorType = 'NONE' | 'COMMUNITY_VOLUNTEER' | 'TRAFFIC_AGENT' | 'ARDUINO_SOLAR_NODE';

interface TrafficRegulationProps {
  regulator: RegulatorActorType;
  isRaining: boolean;
  isPeakHour: boolean;
}

/**
 * VALUE OBJECT (DDD): TrafficRegulationCondition
 * Modela las variables independiente (quién regula el cruce) y de control (lluvia y hora pico)
 * de la investigación de campo en el Norte y Oriente de Cali.
 * Contiene las reglas de negocio puras para estimar el impacto en tiempos de espera y colas.
 */
export class TrafficRegulationCondition extends ValueObject<TrafficRegulationProps> {
  private constructor(props: TrafficRegulationProps) {
    super(props);
  }

  public static create(props: TrafficRegulationProps): TrafficRegulationCondition {
    return new TrafficRegulationCondition(props);
  }

  protected validate(props: TrafficRegulationProps): void {
    const validRegulators: RegulatorActorType[] = [
      'NONE',
      'COMMUNITY_VOLUNTEER',
      'TRAFFIC_AGENT',
      'ARDUINO_SOLAR_NODE',
    ];
    if (!validRegulators.includes(props.regulator)) {
      throw new DomainError('Tipo de regulador vial no válido.', 'INVALID_REGULATOR_TYPE');
    }
  }

  public get regulator(): RegulatorActorType {
    return this.props.regulator;
  }

  public get isRaining(): boolean {
    return this.props.isRaining;
  }

  public get isPeakHour(): boolean {
    return this.props.isPeakHour;
  }

  /**
   * Regla de Dominio (Hipótesis Principal y Complementaria):
   * - Si no hay nadie regulando ('NONE'), el tiempo de espera se dispara por falta de señal clara.
   * - Si regula alguien de la comunidad ('COMMUNITY_VOLUNTEER'), mitiga parcialmente pero con riesgo e improvisación.
   * - Si regula un Agente ('TRAFFIC_AGENT'), ordena el flujo pero su presencia en Cali es escasa o nula.
   * - Si opera la solución propuesta ('ARDUINO_SOLAR_NODE'), optimiza el ciclo autónomo sin depender de la red eléctrica.
   * - Si llueve (`isRaining`), el tiempo de espera aumenta un 35% por reducción de velocidad de maniobra.
   */
  public calculateEstimatedWaitSeconds(baseWaitSeconds: number): number {
    const regulatorMultipliers: Record<RegulatorActorType, number> = {
      NONE: 2.1,
      COMMUNITY_VOLUNTEER: 1.45,
      TRAFFIC_AGENT: 1.0,
      ARDUINO_SOLAR_NODE: 0.65,
    };

    const rainMultiplier = this.props.isRaining ? 1.35 : 1.0;
    const peakMultiplier = this.props.isPeakHour ? 1.25 : 0.85;

    return Math.round(
      baseWaitSeconds *
        regulatorMultipliers[this.props.regulator] *
        rainMultiplier *
        peakMultiplier
    );
  }

  /**
   * Regla de Dominio: Etiqueta legible del actor que regula la intersección.
   */
  public getRegulatorLabel(): string {
    switch (this.props.regulator) {
      case 'NONE':
        return 'Nadie (Improvisación de conductores)';
      case 'COMMUNITY_VOLUNTEER':
        return 'Miembro de la Comunidad (Colaboración voluntaria)';
      case 'TRAFFIC_AGENT':
        return 'Agente de Tránsito (Presencia escasa/nula)';
      case 'ARDUINO_SOLAR_NODE':
        return 'Nodo Autónomo Arduino + LED + Panel Solar';
    }
  }
}
