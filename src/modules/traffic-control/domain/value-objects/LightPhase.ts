import { ValueObject, DomainError } from '@shared/domain';

export type TrafficPhaseColor = 'RED' | 'GREEN' | 'YELLOW';

interface LightPhaseProps {
  color: TrafficPhaseColor;
  durationSeconds: number;
}

/**
 * VALUE OBJECT (DDD): LightPhase
 * Encapsula las reglas de negocio sobre los colores del semáforo, sus duraciones
 * permitidas y la máquina de estados pura de transición (RED -> GREEN -> YELLOW -> RED).
 */
export class LightPhase extends ValueObject<LightPhaseProps> {
  private constructor(props: LightPhaseProps) {
    super(props);
  }

  public static create(color: TrafficPhaseColor, durationSeconds?: number): LightPhase {
    const defaultDurations: Record<TrafficPhaseColor, number> = {
      RED: 45,
      GREEN: 35,
      YELLOW: 5,
    };
    return new LightPhase({
      color,
      durationSeconds: durationSeconds ?? defaultDurations[color],
    });
  }

  protected validate(props: LightPhaseProps): void {
    if (props.durationSeconds < 3 || props.durationSeconds > 180) {
      throw new DomainError(
        `La duración de una fase semafórica debe estar entre 3s y 180s. Recibido: ${props.durationSeconds}s`,
        'INVALID_PHASE_DURATION'
      );
    }

    if (props.color === 'YELLOW' && props.durationSeconds > 10) {
      throw new DomainError(
        'Por seguridad vial, la luz amarilla no puede superar los 10 segundos.',
        'UNSAFE_YELLOW_DURATION'
      );
    }
  }

  public get color(): TrafficPhaseColor {
    return this.props.color;
  }

  public get durationSeconds(): number {
    return this.props.durationSeconds;
  }

  /**
   * Regla de Dominio: Determina la siguiente fase válida del ciclo semafórico.
   */
  public nextPhase(customGreenDuration?: number): LightPhase {
    switch (this.props.color) {
      case 'RED':
        return LightPhase.create('GREEN', customGreenDuration ?? 35);
      case 'GREEN':
        return LightPhase.create('YELLOW', 5);
      case 'YELLOW':
        return LightPhase.create('RED', 45);
    }
  }
}
