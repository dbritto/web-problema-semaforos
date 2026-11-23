import { useState } from 'react';
import { defineSmartContainer } from '@shared/presentation/contracts/ComponentContracts';
import {
  MainDashboardTemplate,
  TopHeaderOrganism,
  StatCardMolecule,
} from '@shared/presentation/ui';
import {
  useTrafficControl,
  TrafficControlUseCases,
} from '../hooks/useTrafficControl';
import { CaliContextAndProblemsOrganism } from '../components/organisms/CaliContextAndProblemsOrganism';
import { ArduinoAndSolarExplanationOrganism } from '../components/organisms/ArduinoAndSolarExplanationOrganism';
import { SolarArduinoProposalOrganism } from '../components/organisms/SolarArduinoProposalOrganism';
import { IntersectionCardOrganism } from '../components/organisms/IntersectionCardOrganism';

export interface TrafficControlSmartContainerProps {
  readonly useCases: TrafficControlUseCases;
}

/**
 * COMPONENTE INTELIGENTE (Smart Container): TrafficControlSmartContainer
 * Ensambla la página Full-Width con secciones editoriales amplias:
 * 1. Contexto y Problemas en Cali
 * 2. ¿Qué es un Arduino, qué son los Paneles Solares y cómo juntos resuelven el problema?
 * 3. Administración Centralizada por Zonas Independientes (Off-Grid)
 * 4. Ejemplo Comparativo Único Lado a Lado: Semáforo con Red Eléctrica Mala vs. Semáforo con Panel Solar + Arduino
 */
export const TrafficControlSmartContainer =
  defineSmartContainer<TrafficControlSmartContainerProps>(
    'traffic-control',
    ({ useCases }) => {
      const {
        intersections,
        summary,
        errorMessage,
        handleAdvancePhase,
        handleSimulateScenario,
        handleActivateZoneSolar,
        handleToggleEmergency,
      } = useTrafficControl(useCases);

      const [selectedIntersectionId, setSelectedIntersectionId] = useState<string>('cali-norte-01');

      const featuredIntersection =
        intersections.find((item) => item.id === selectedIntersectionId) ?? intersections[0];

      return (
        <MainDashboardTemplate
          headerSlot={
            <TopHeaderOrganism
              appTitle="Soluciones que transforman los semáforos de Cali"
              subtitle="En el Norte y Oriente de Santiago de Cali, 5 de cada 12 intersecciones quedan fuera de servicio en hora pico por fallas en la red eléctrica, aumentando las colas y el riesgo vial. Conoce cómo unimos microcontroladores Arduino, luces LED y paneles solares administrados por Zonas Independientes."
              architectureTag="DDD + Hexagonal"
              heroImageUrl="/images/arduino-solar-semaphore.png"
            />
          }
          summarySlot={
            <>
              <StatCardMolecule
                title="Cruces Evaluados en Cali"
                value={`${summary.totalIntersections} Cruces`}
                badgeText="Tabla 2"
                badgeTone="neutral"
                subtitle="Norte (Av. 3N, 6N) y Oriente (Cra. 28D, 29, 7L)"
              />
              <StatCardMolecule
                title="Semáforos Fuera de Servicio"
                value={summary.damagedWithoutSolarCount}
                badgeText={
                  summary.damagedWithoutSolarCount > 0 ? 'Red Eléctrica' : 'Resuelto'
                }
                badgeTone={summary.damagedWithoutSolarCount > 0 ? 'warning' : 'success'}
                subtitle="Dependientes de cableado eléctrico tradicional"
              />
              <StatCardMolecule
                title="Tiempo de Espera Promedio"
                value={`${summary.averageWaitSeconds}s`}
                badgeText="Cronómetro"
                badgeTone={summary.averageWaitSeconds > 75 ? 'warning' : 'success'}
                subtitle="Medido desde detención en cola hasta cruce"
              />
              <StatCardMolecule
                title="Nodos Arduino + Solar Activos"
                value={`${summary.activeArduinoSolarNodes}/${summary.totalIntersections}`}
                badgeText="Off-Grid"
                badgeTone="success"
                subtitle="88% ahorro LED • 72h autonomía solar"
              />
            </>
          }
          mainContentSlot={
            <>
              {errorMessage && (
                <div
                  role="alert"
                  className="sheet-white"
                  style={{
                    borderColor: '#ef4444',
                    color: '#991b1b',
                    fontWeight: 700,
                    padding: '18px 24px',
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* SECCIÓN 1: Contexto en Cali y los Problemas que trae */}
              <CaliContextAndProblemsOrganism
                institution="Institución Universitaria Antonio José Camacho (Facultad de Ingenierías)"
                authors={[
                  'Daniel Stiven Britto',
                  'Juan David Castillo',
                  'Iván David Mosquera',
                  'David Alejandro Gutiérrez',
                ]}
                docente="Dircey Soraya Mosquera"
                observationWindow="9 de noviembre de 2026 (4:30 PM – 6:30 PM)"
                sampleRatioText="5 de 12 intersecciones tenían el semáforo fuera de servicio"
              />

              {/* SECCIÓN 2: ¿Qué es un Arduino, qué son los Paneles Solares y cómo juntos resuelven el problema? */}
              <ArduinoAndSolarExplanationOrganism
                arduinoImageUrl="/images/arduino-board-detail.png"
                solarImageUrl="/images/solar-panel-detail.png"
                synergyImageUrl="/images/arduino-solar-semaphore.png"
              />

              {/* SECCIÓN 3: Administración Centralizada por Zonas Independientes (Estilo Oscuro Creatix) */}
              <SolarArduinoProposalOrganism
                zones={summary.zoneSummaries}
                onActivateZoneSolar={handleActivateZoneSolar}
              />

              {/* SECCIÓN 4: UN SOLO EJEMPLO COMPARATIVO CLARO (RED ELÉCTRICA MALA VS. PANEL SOLAR) */}
              <section id="simulador-cruces" className="sheet-white">
                <div
                  style={{
                    maxWidth: '920px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginBottom: '36px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#4d7c0f',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#a3e635',
                      }}
                    />
                    Ejemplo Práctico en una Intersección Real de Cali
                  </span>

                  <h2 className="editorial-h2">
                    Comparación directa: Semáforo con{' '}
                    <span style={{ color: '#dc2626' }}>Red Eléctrica Deficiente</span> vs.{' '}
                    <span className="highlight-lime-word">Panel Solar + Arduino</span>
                  </h2>

                  <p
                    style={{
                      color: 'var(--text-body)',
                      fontSize: '1.05rem',
                      lineHeight: 1.7,
                    }}
                  >
                    Observa en un solo ejemplo qué ocurre y qué riesgos corre una intersección de
                    Cali cuando depende de la red de energía inestable de la ciudad, frente a cómo
                    funciona ese mismo cruce con su propio <strong>Panel Solar, Luces LED y Arduino</strong>.
                  </p>
                </div>

                {featuredIntersection && (
                  <IntersectionCardOrganism
                    intersection={featuredIntersection}
                    availableIntersections={intersections}
                    onSelectIntersection={setSelectedIntersectionId}
                    onAdvancePhase={handleAdvancePhase}
                    onSimulateScenario={handleSimulateScenario}
                    onToggleEmergency={handleToggleEmergency}
                  />
                )}
              </section>
            </>
          }
        />
      );
    }
  );
