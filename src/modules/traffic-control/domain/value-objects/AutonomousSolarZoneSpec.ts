import { ValueObject, DomainError } from '@shared/domain';

export type CaliZoneId = 'ZONA_NORTE' | 'ZONA_ORIENTE';

interface AutonomousSolarNodeProps {
  zoneId: CaliZoneId;
  zoneName: string;
  microcontrollerModel: string;
  solarPanelWatts: number;
  batteryAutonomyHours: number;
  ledConsumptionWatts: number;
  disconnectedFromPublicGrid: boolean;
  meshCommunicationProtocol: string;
}

/**
 * VALUE OBJECT (DDD): AutonomousSolarZoneSpec
 * Modela la propuesta de ingeniería: Semáforos con Arduino, luces LED de ultra bajo consumo,
 * paneles solares con banco de batería LiFePO4 y administración centralizada por ZONAS independientes
 * de la red eléctrica convencional.
 */
export class AutonomousSolarZoneSpec extends ValueObject<AutonomousSolarNodeProps> {
  private constructor(props: AutonomousSolarNodeProps) {
    super(props);
  }

  public static createDefaultForZone(zoneId: CaliZoneId): AutonomousSolarZoneSpec {
    const zoneNames: Record<CaliZoneId, string> = {
      ZONA_NORTE: 'Central de Zona Norte (Avenidas 3N y 6N)',
      ZONA_ORIENTE: 'Central de Zona Oriente (Distrito Aguablanca / Cra 28D - Cra 29)',
    };

    return new AutonomousSolarZoneSpec({
      zoneId,
      zoneName: zoneNames[zoneId],
      microcontrollerModel: 'Arduino Mega 2560 + Módulo LoRa / ESP32 Failover',
      solarPanelWatts: 180,
      batteryAutonomyHours: 72,
      ledConsumptionWatts: 18,
      disconnectedFromPublicGrid: true,
      meshCommunicationProtocol: 'Red Mesh LoRaWAN Zonal (100% Independiente de Red Eléctrica)',
    });
  }

  protected validate(props: AutonomousSolarNodeProps): void {
    if (props.solarPanelWatts <= props.ledConsumptionWatts) {
      throw new DomainError(
        'La generación del panel solar debe superar el consumo de las luminarias LED.',
        'INSUFFICIENT_SOLAR_GENERATION'
      );
    }
    if (props.batteryAutonomyHours < 24) {
      throw new DomainError(
        'La autonomía por zona debe cubrir mínimo 24 horas continuas para soportar días de lluvia en Cali.',
        'INSUFFICIENT_BATTERY_AUTONOMY'
      );
    }
  }

  public get zoneId(): CaliZoneId {
    return this.props.zoneId;
  }

  public get zoneName(): string {
    return this.props.zoneName;
  }

  public get microcontrollerModel(): string {
    return this.props.microcontrollerModel;
  }

  public get solarPanelWatts(): number {
    return this.props.solarPanelWatts;
  }

  public get batteryAutonomyHours(): number {
    return this.props.batteryAutonomyHours;
  }

  public get ledConsumptionWatts(): number {
    return this.props.ledConsumptionWatts;
  }

  public get disconnectedFromPublicGrid(): boolean {
    return this.props.disconnectedFromPublicGrid;
  }

  public get meshCommunicationProtocol(): string {
    return this.props.meshCommunicationProtocol;
  }

  /**
   * Regla de Dominio: Calcula el ahorro energético frente a bombillería halógena tradicional (150W)
   */
  public calculateEnergySavingsPercentage(): number {
    const traditionalHalogenWatts = 150;
    return Math.round(
      ((traditionalHalogenWatts - this.props.ledConsumptionWatts) / traditionalHalogenWatts) * 100
    );
  }
}
