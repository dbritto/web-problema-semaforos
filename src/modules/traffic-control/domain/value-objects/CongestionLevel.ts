import { ValueObject, DomainError } from '@shared/domain';

export type CongestionCategory = 'LOW' | 'MODERATE' | 'CRITICAL';

interface CongestionLevelProps {
  vehiclesWaiting: number;
}

/**
 * VALUE OBJECT (DDD): CongestionLevel
 * Contiene la regla de negocio para clasificar la congestión vehicular y calcular
 * el tiempo óptimo de luz verde sin depender de ninguna librería externa.
 */
export class CongestionLevel extends ValueObject<CongestionLevelProps> {
  private constructor(props: CongestionLevelProps) {
    super(props);
  }

  public static create(vehiclesWaiting: number): CongestionLevel {
    return new CongestionLevel({ vehiclesWaiting });
  }

  protected validate(props: CongestionLevelProps): void {
    if (!Number.isInteger(props.vehiclesWaiting) || props.vehiclesWaiting < 0) {
      throw new DomainError(
        'La cantidad de vehículos en espera debe ser un número entero no negativo.',
        'INVALID_VEHICLE_COUNT'
      );
    }
  }

  public get vehiclesWaiting(): number {
    return this.props.vehiclesWaiting;
  }

  public get category(): CongestionCategory {
    if (this.props.vehiclesWaiting >= 35) return 'CRITICAL';
    if (this.props.vehiclesWaiting >= 15) return 'MODERATE';
    return 'LOW';
  }

  /**
   * Regla de negocio: Calcula la duración óptima en segundos de la fase verde
   * según la cola de vehículos esperando en la intersección.
   */
  public calculateOptimalGreenDurationSeconds(): number {
    const baseSeconds = 20;
    const extraPerVehicle = Math.min(this.props.vehiclesWaiting * 1.5, 70);
    return Math.round(baseSeconds + extraPerVehicle);
  }
}
