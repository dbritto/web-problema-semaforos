import { InMemoryTrafficIntersectionRepositoryAdapter } from '@modules/traffic-control/infrastructure/adapters/InMemoryTrafficIntersectionRepositoryAdapter';
import { GetIntersectionsUseCase } from '@modules/traffic-control/application/use-cases/GetIntersectionsUseCase';
import { AdvanceIntersectionPhaseUseCase } from '@modules/traffic-control/application/use-cases/AdvanceIntersectionPhaseUseCase';
import { OptimizeIntersectionCongestionUseCase } from '@modules/traffic-control/application/use-cases/OptimizeIntersectionCongestionUseCase';
import { ToggleEmergencyCorridorUseCase } from '@modules/traffic-control/application/use-cases/ToggleEmergencyCorridorUseCase';
import { SimulateRegulationScenarioUseCase } from '@modules/traffic-control/application/use-cases/SimulateRegulationScenarioUseCase';
import { ActivateAutonomousSolarZoneUseCase } from '@modules/traffic-control/application/use-cases/ActivateAutonomousSolarZoneUseCase';
import { TrafficControlUseCases } from '@modules/traffic-control/presentation/hooks/useTrafficControl';

/**
 * COMPOSITION ROOT / CONTENEDOR DE INYECCIÓN DE DEPENDENCIAS:
 * Único punto de la aplicación donde se instancian los adaptadores concretos de infraestructura
 * y se inyectan en los Casos de Uso de Aplicación.
 */
const trafficIntersectionRepository = new InMemoryTrafficIntersectionRepositoryAdapter();

export const trafficControlModuleContainer: TrafficControlUseCases = {
  getIntersections: new GetIntersectionsUseCase(trafficIntersectionRepository),
  advancePhase: new AdvanceIntersectionPhaseUseCase(trafficIntersectionRepository),
  optimizeCongestion: new OptimizeIntersectionCongestionUseCase(trafficIntersectionRepository),
  toggleEmergency: new ToggleEmergencyCorridorUseCase(trafficIntersectionRepository),
  simulateScenario: new SimulateRegulationScenarioUseCase(trafficIntersectionRepository),
  activateSolarZone: new ActivateAutonomousSolarZoneUseCase(trafficIntersectionRepository),
};
