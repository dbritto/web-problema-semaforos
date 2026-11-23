import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import { BadgeAtom, ButtonAtom } from '@shared/presentation/ui';
import { TrafficPhaseColor } from '../../../domain/value-objects/LightPhase';
import { CongestionCategory } from '../../../domain/value-objects/CongestionLevel';
import { RegulatorActorType } from '../../../domain/value-objects/TrafficRegulationCondition';
import { CaliZoneId } from '../../../domain/value-objects/AutonomousSolarZoneSpec';
import { TrafficSemaphoreMolecule } from '../molecules/TrafficSemaphoreMolecule';

export interface IntersectionViewModel {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly avenue: string;
  readonly zoneId: CaliZoneId;
  readonly zoneName: string;
  readonly reportedStatus: string;
  readonly phaseColor: TrafficPhaseColor;
  readonly durationSeconds: number;
  readonly vehiclesWaiting: number;
  readonly congestionCategory: CongestionCategory;
  readonly optimalGreenSeconds: number;
  readonly regulator: RegulatorActorType;
  readonly regulatorLabel: string;
  readonly isRaining: boolean;
  readonly estimatedWaitSeconds: number;
  readonly solarSpecSummary: string;
  readonly emergencyPriorityActive: boolean;
}

export interface IntersectionCardOrganismData {
  readonly intersection: IntersectionViewModel;
  readonly availableIntersections?: readonly IntersectionViewModel[];
}

export interface IntersectionCardOrganismActions {
  readonly onSelectIntersection?: (id: string) => void;
  readonly onAdvancePhase: (id: string) => void;
  readonly onSimulateScenario: (
    id: string,
    regulator: RegulatorActorType,
    isRaining: boolean
  ) => void;
  readonly onToggleEmergency: (id: string) => void;
}

export type IntersectionCardOrganismProps = DumbComponentProps<
  IntersectionCardOrganismData,
  IntersectionCardOrganismActions
>;

/**
 * ORGANISMO DEL MÓDULO (Dumb Component): IntersectionCardOrganism
 * Muestra UN SOLO EJEMPLO CLARO Y COMPARATIVO (100% responsive en celular y escritorio):
 * - Panel 1: Cómo se ve y qué riesgos corre el cruce dependiendo de la red eléctrica deficiente de Cali.
 * - Panel 2: El escenario opuesto operando con el Panel Solar + Arduino + Luces LED en Zona Independiente.
 */
export const IntersectionCardOrganism = defineDumbComponent<IntersectionCardOrganismProps>(
  'organism',
  'traffic-control',
  ({
    intersection,
    availableIntersections = [],
    onSelectIntersection,
    onAdvancePhase,
    onSimulateScenario,
  }) => {
    const isRainActive = intersection.isRaining;

    const brokenGridWaitSeconds = isRainActive ? 185 : 138;
    const brokenGridVehiclesQueue = isRainActive ? 46 : 36;

    const solarWaitSeconds = isRainActive ? 54 : 42;
    const solarVehiclesQueue = isRainActive ? 14 : 11;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Barra Superior de Control del Ejemplo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            background: 'var(--surface-soft)',
            padding: '18px 20px',
            borderRadius: '22px',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', width: '100%' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              📍 Cruce de Cali analizado:
            </span>
            {availableIntersections.length > 0 && onSelectIntersection ? (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
                {availableIntersections.slice(0, 3).map((item) => {
                  const isSelected = item.id === intersection.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectIntersection(item.id)}
                      className={`pill-btn ${
                        isSelected ? 'pill-btn--dark' : 'pill-btn--secondary'
                      }`}
                      style={{ padding: '9px 16px', fontSize: '0.82rem' }}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            ) : (
              <strong style={{ fontSize: '1rem', color: 'var(--text-dark)' }}>
                {intersection.name}
              </strong>
            )}

            <ButtonAtom
              label={
                isRainActive
                  ? '🌧️ Lluvia Activa (Cambiar a Día Seco)'
                  : '☀️ Día Seco (Simular Aguacero)'
              }
              variant={isRainActive ? 'danger' : 'secondary'}
              onClick={() =>
                onSimulateScenario(
                  intersection.id,
                  intersection.regulator,
                  !intersection.isRaining
                )
              }
            />
          </div>
        </div>

        {/* COMPARACIÓN DE UN SOLO CRUCE */}
        <div className="split-story-row" style={{ alignItems: 'stretch' }}>
          {/* PANEL 1: ESCENARIO ACTUAL (DEPENDIENDO DE LA RED ELÉCTRICA MALA) */}
          <article className="comparison-panel-bad">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <BadgeAtom
                  text="❌ ESCENARIO ACTUAL • RED ELÉCTRICA"
                  tone="danger"
                />
                <span
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#991b1b',
                    background: '#fee2e2',
                    padding: '5px 12px',
                    borderRadius: '999px',
                  }}
                >
                  Semáforo Apagado
                </span>
              </div>

              <div>
                <h3
                  className="editorial-h3"
                  style={{ color: '#7f1d1d', marginBottom: '6px' }}
                >
                  1. Dependiendo de la Red Eléctrica Inestable de Cali
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#991b1b', lineHeight: 1.6 }}>
                  En <strong>{intersection.name}</strong>, un bajón de energía o lluvia fuerte
                  apaga el semáforo por completo y deja la intersección sin ley.
                </p>
              </div>

              <div
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '230px',
                  border: '1px solid #fca5a5',
                }}
              >
                <img
                  src="/images/cali-traffic-chaos.png"
                  alt="Intersección de Cali con semáforo apagado por falla eléctrica"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 0 0 0',
                    padding: '14px 16px',
                    background:
                      'linear-gradient(to top, rgba(127, 29, 29, 0.95), rgba(127, 29, 29, 0.45), transparent)',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ fontSize: '0.88rem', display: 'block' }}>
                    🛑 Así se ve el cruce cuando falla la energía:
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#fecaca' }}>
                    Luces muertas, bloqueo en las 4 esquinas y civiles pidiendo monedas.
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '18px 20px',
                  border: '1px solid #fecaca',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <strong style={{ fontSize: '0.92rem', color: '#991b1b' }}>
                  ⚠️ ¿Qué riesgos graves corre este cruce hoy?
                </strong>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.05rem' }}>💥</span>
                  <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong>Choques por improvisación:</strong> Nadie sabe quién tiene la vía; los
                    vehículos se atraviesan al mismo tiempo sin señal clara.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.05rem' }}>🦺</span>
                  <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong>Peligro para peatones y voluntarios:</strong> Personas de la comunidad
                    se paran en medio de los carros a regular el paso.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.05rem' }}>⛈️</span>
                  <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong>Apagón seguro cuando llueve:</strong> Justo cuando el piso mojado exige
                    más precaución, la red eléctrica del sector colapsa.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="two-metrics-grid"
              style={{
                background: '#fee2e2',
                padding: '16px 20px',
                borderRadius: '18px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>
                  TIEMPO DE ESPERA EN COLA
                </span>
                <strong
                  style={{
                    fontSize: '1.5rem',
                    color: '#7f1d1d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  ⏱️ {brokenGridWaitSeconds} seg
                </strong>
                <span style={{ fontSize: '0.74rem', color: '#991b1b' }}>
                  Más de {Math.round(brokenGridWaitSeconds / 60)} minutos detenido
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>
                  TRANCONES CADA 5 MIN
                </span>
                <strong
                  style={{
                    fontSize: '1.5rem',
                    color: '#7f1d1d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  🚗 {brokenGridVehiclesQueue} carros
                </strong>
                <span style={{ fontSize: '0.74rem', color: '#991b1b' }}>
                  Cola crítica acumulada
                </span>
              </div>
            </div>
          </article>

          {/* PANEL 2: ESCENARIO CON SOLUCIÓN (PANEL SOLAR + ARDUINO + LED) */}
          <article className="comparison-panel-good">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <BadgeAtom
                  text="✅ CON SOLUCIÓN • PANEL SOLAR + ARDUINO"
                  tone="success"
                />
                <TrafficSemaphoreMolecule
                  activeColor={intersection.phaseColor}
                  durationSeconds={intersection.durationSeconds}
                />
              </div>

              <div>
                <h3
                  className="editorial-h3"
                  style={{ color: '#14532d', marginBottom: '6px' }}
                >
                  2. El Mismo Cruce con Panel Solar y Zona Independiente
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#166534', lineHeight: 1.6 }}>
                  En <strong>{intersection.name}</strong>, el semáforo produce su propia energía
                  solar y el <strong>Arduino</strong> organiza el tráfico sin depender de la red
                  eléctrica de Cali.
                </p>
              </div>

              <div
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '230px',
                  border: '1px solid #84cc16',
                }}
              >
                <img
                  src="/images/cali-solar-intersection.png"
                  alt="Intersección de Cali operando con panel solar, luces LED y control Arduino"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 'auto 0 0 0',
                    padding: '14px 16px',
                    background:
                      'linear-gradient(to top, rgba(20, 83, 45, 0.95), rgba(20, 83, 45, 0.45), transparent)',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ fontSize: '0.88rem', display: 'block' }}>
                    ☀️ Así funciona con el Panel Solar y Arduino:
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#dcfce7' }}>
                    Luces LED encendidas 24/7, paso ordenado y ola verde coordinada por zona.
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '18px 20px',
                  border: '1px solid #bef264',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <strong style={{ fontSize: '0.92rem', color: '#166534' }}>
                    🛡️ ¿Cómo elimina todos los riesgos anteriores?
                  </strong>
                  <ButtonAtom
                    label="Cambiar Fase LED ↻"
                    variant="primary"
                    onClick={() => onAdvancePhase(intersection.id)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.05rem' }}>☀️</span>
                  <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong>Nunca se apaga aunque se vaya la luz en Cali:</strong> El panel solar de
                    180W y su batería de 72 horas mantienen las luces LED (18W) encendidas día y
                    noche.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.05rem' }}>🤖</span>
                  <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong>Cero improvisación con control Arduino:</strong> Asigna luz verde según
                    la cola real, protegiendo al peatón y evitando que civiles arriesguen su vida.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.05rem' }}>📡</span>
                  <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5 }}>
                    <strong>Respaldo por Zona Autónoma:</strong> Conectado a la{' '}
                    <strong>{intersection.zoneName}</strong> sin cables eléctricos públicos.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="two-metrics-grid"
              style={{
                background: '#d9f99d',
                padding: '16px 20px',
                borderRadius: '18px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#3f6212', fontWeight: 700 }}>
                  TIEMPO DE ESPERA CON SOLAR
                </span>
                <strong
                  style={{
                    fontSize: '1.5rem',
                    color: '#14532d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  ⏱️ {solarWaitSeconds} seg (-71%)
                </strong>
                <span style={{ fontSize: '0.74rem', color: '#3f6212' }}>
                  Ahorras {brokenGridWaitSeconds - solarWaitSeconds} segundos por cruce
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#3f6212', fontWeight: 700 }}>
                  COLA VEHICULAR CADA 5 MIN
                </span>
                <strong
                  style={{
                    fontSize: '1.5rem',
                    color: '#14532d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  🚗 {solarVehiclesQueue} carros
                </strong>
                <span style={{ fontSize: '0.74rem', color: '#3f6212' }}>
                  Flujo continuo y despejado
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
);
