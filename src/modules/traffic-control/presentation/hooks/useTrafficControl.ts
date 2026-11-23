import { useState, useEffect, useCallback } from 'react';
import { TrafficIntersection } from '../../domain/entities/TrafficIntersection';
import {
  TrafficNetworkDomainService,
  NetworkHealthSummary,
} from '../../domain/services/TrafficNetworkDomainService';
import { RegulatorActorType } from '../../domain/value-objects/TrafficRegulationCondition';
import { CaliZoneId } from '../../domain/value-objects/AutonomousSolarZoneSpec';
import { GetIntersectionsUseCase } from '../../application/use-cases/GetIntersectionsUseCase';
import { AdvanceIntersectionPhaseUseCase } from '../../application/use-cases/AdvanceIntersectionPhaseUseCase';
import { OptimizeIntersectionCongestionUseCase } from '../../application/use-cases/OptimizeIntersectionCongestionUseCase';
import { ToggleEmergencyCorridorUseCase } from '../../application/use-cases/ToggleEmergencyCorridorUseCase';
import { SimulateRegulationScenarioUseCase } from '../../application/use-cases/SimulateRegulationScenarioUseCase';
import { ActivateAutonomousSolarZoneUseCase } from '../../application/use-cases/ActivateAutonomousSolarZoneUseCase';
import { IntersectionViewModel } from '../components/organisms/IntersectionCardOrganism';

export interface TrafficControlUseCases {
  readonly getIntersections: GetIntersectionsUseCase;
  readonly advancePhase: AdvanceIntersectionPhaseUseCase;
  readonly optimizeCongestion: OptimizeIntersectionCongestionUseCase;
  readonly toggleEmergency: ToggleEmergencyCorridorUseCase;
  readonly simulateScenario: SimulateRegulationScenarioUseCase;
  readonly activateSolarZone: ActivateAutonomousSolarZoneUseCase;
}

function toViewModel(entity: TrafficIntersection): IntersectionViewModel {
  return {
    id: entity.id,
    code: entity.code,
    name: entity.name,
    avenue: entity.avenue,
    zoneId: entity.zoneId,
    zoneName: entity.solarZoneSpec.zoneName,
    reportedStatus: entity.reportedStatus,
    phaseColor: entity.currentPhase.color,
    durationSeconds: entity.currentPhase.durationSeconds,
    vehiclesWaiting: entity.congestion.vehiclesWaiting,
    congestionCategory: entity.congestion.category,
    optimalGreenSeconds: entity.congestion.calculateOptimalGreenDurationSeconds(),
    regulator: entity.regulationCondition.regulator,
    regulatorLabel: entity.regulationCondition.getRegulatorLabel(),
    isRaining: entity.regulationCondition.isRaining,
    estimatedWaitSeconds: entity.calculateCurrentWaitSeconds(),
    solarSpecSummary: `Arduino + LED ${entity.solarZoneSpec.ledConsumptionWatts}W + Panel ${entity.solarZoneSpec.solarPanelWatts}W (${entity.solarZoneSpec.batteryAutonomyHours}h autonomía)`,
    emergencyPriorityActive: entity.emergencyPriorityActive,
  };
}

/**
 * HOOK ADAPTADOR DE PRESENTACIÓN:
 * Conecta los Casos de Uso (Application Layer) y Servicios de Dominio con el Smart Container.
 */
export function useTrafficControl(useCases: TrafficControlUseCases) {
  const [entities, setEntities] = useState<TrafficIntersection[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    try {
      setErrorMessage(null);
      const list = await useCases.getIntersections.execute();
      setEntities(list);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, [useCases]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const handleAdvancePhase = useCallback(
    async (intersectionId: string) => {
      try {
        setErrorMessage(null);
        await useCases.advancePhase.execute({ intersectionId });
        await loadAll();
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Error al cambiar fase');
      }
    },
    [useCases, loadAll]
  );

  const handleSimulateScenario = useCallback(
    async (intersectionId: string, regulator: RegulatorActorType, isRaining: boolean) => {
      try {
        setErrorMessage(null);
        await useCases.simulateScenario.execute({ intersectionId, regulator, isRaining });
        await loadAll();
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Error al simular escenario');
      }
    },
    [useCases, loadAll]
  );

  const handleActivateZoneSolar = useCallback(
    async (zoneId: CaliZoneId) => {
      try {
        setErrorMessage(null);
        await useCases.activateSolarZone.execute({ zoneId });
        await loadAll();
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Error al activar zona solar');
      }
    },
    [useCases, loadAll]
  );

  const handleToggleEmergency = useCallback(
    async (intersectionId: string) => {
      try {
        setErrorMessage(null);
        await useCases.toggleEmergency.execute({ intersectionId });
        await loadAll();
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Error al cambiar emergencia');
      }
    },
    [useCases, loadAll]
  );

  const summary: NetworkHealthSummary =
    TrafficNetworkDomainService.calculateNetworkSummary(entities);

  const viewModels: IntersectionViewModel[] = entities.map(toViewModel);

  return {
    intersections: viewModels,
    summary,
    errorMessage,
    handleAdvancePhase,
    handleSimulateScenario,
    handleActivateZoneSolar,
    handleToggleEmergency,
  };
}
