import { TrafficIntersection } from '../entities/TrafficIntersection';
import { CaliZoneId } from '../value-objects/AutonomousSolarZoneSpec';

export interface ZoneSummaryMetrics {
  readonly zoneId: CaliZoneId;
  readonly zoneName: string;
  readonly intersectionsCount: number;
  readonly averageWaitSeconds: number;
  readonly totalVehiclesInQueue: number;
  readonly autonomousNodesCount: number;
  readonly energySavingsPercentage: number;
  readonly batteryAutonomyHours: number;
}

export interface NetworkHealthSummary {
  readonly totalIntersections: number;
  readonly damagedWithoutSolarCount: number;
  readonly criticalCount: number;
  readonly totalVehiclesWaiting: number;
  readonly averageWaitSeconds: number;
  readonly activeArduinoSolarNodes: number;
  readonly zoneSummaries: readonly ZoneSummaryMetrics[];
}

/**
 * SERVICIO DE DOMINIO (DDD): TrafficNetworkDomainService
 * Calcula las métricas globales de la problemática en Cali y consolida el estado
 * de las Centrales Zonales Autónomas (Zona Norte y Zona Oriente).
 */
export class TrafficNetworkDomainService {
  public static calculateNetworkSummary(
    intersections: readonly TrafficIntersection[]
  ): NetworkHealthSummary {
    if (intersections.length === 0) {
      return {
        totalIntersections: 0,
        damagedWithoutSolarCount: 0,
        criticalCount: 0,
        totalVehiclesWaiting: 0,
        averageWaitSeconds: 0,
        activeArduinoSolarNodes: 0,
        zoneSummaries: [],
      };
    }

    let damagedWithoutSolarCount = 0;
    let criticalCount = 0;
    let totalVehiclesWaiting = 0;
    let totalWaitSeconds = 0;
    let activeArduinoSolarNodes = 0;

    const byZone = new Map<CaliZoneId, TrafficIntersection[]>();

    for (const item of intersections) {
      const isArduino = item.regulationCondition.regulator === 'ARDUINO_SOLAR_NODE';
      if (isArduino) {
        activeArduinoSolarNodes += 1;
      } else {
        damagedWithoutSolarCount += 1;
      }

      if (item.congestion.category === 'CRITICAL') {
        criticalCount += 1;
      }

      totalVehiclesWaiting += item.congestion.vehiclesWaiting;
      totalWaitSeconds += item.calculateCurrentWaitSeconds();

      const list = byZone.get(item.zoneId) ?? [];
      list.push(item);
      byZone.set(item.zoneId, list);
    }

    const zoneSummaries: ZoneSummaryMetrics[] = Array.from(byZone.entries()).map(
      ([zoneId, list]) => {
        const firstSpec = list[0].solarZoneSpec;
        const zoneWait = list.reduce((sum, i) => sum + i.calculateCurrentWaitSeconds(), 0);
        const zoneVehicles = list.reduce((sum, i) => sum + i.congestion.vehiclesWaiting, 0);
        const autonomousCount = list.filter(
          (i) => i.regulationCondition.regulator === 'ARDUINO_SOLAR_NODE'
        ).length;

        return {
          zoneId,
          zoneName: firstSpec.zoneName,
          intersectionsCount: list.length,
          averageWaitSeconds: Math.round(zoneWait / list.length),
          totalVehiclesInQueue: zoneVehicles,
          autonomousNodesCount: autonomousCount,
          energySavingsPercentage: firstSpec.calculateEnergySavingsPercentage(),
          batteryAutonomyHours: firstSpec.batteryAutonomyHours,
        };
      }
    );

    return {
      totalIntersections: intersections.length,
      damagedWithoutSolarCount,
      criticalCount,
      totalVehiclesWaiting,
      averageWaitSeconds: Math.round(totalWaitSeconds / intersections.length),
      activeArduinoSolarNodes,
      zoneSummaries,
    };
  }
}
