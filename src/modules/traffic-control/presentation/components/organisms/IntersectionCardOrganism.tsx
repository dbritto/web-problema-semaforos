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
 * Muestra UN SOLO EJEMPLO CLARO Y COMPARATIVO LADO A LADO:
 * - Lado Izquierdo: Cómo se ve y qué riesgos corre el cruce dependiendo de la red eléctrica deficiente de Cali.
 * - Lado Derecho: El escenario opuesto operando con el Panel Solar + Arduino + Luces LED en Zona Independiente.
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

    // Cálculos comparativos claros para el mismo cruce con y sin lluvia
    const brokenGridWaitSeconds = isRainActive ? 185 : 138;
    const brokenGridVehiclesQueue = isRainActive ? 46 : 36;

    const solarWaitSeconds = isRainActive ? 54 : 42;
    const solarVehiclesQueue = isRainActive ? 14 : 11;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {/* Barra Superior de Control del Ejemplo: Selector opcional de cruce + Botón de Lluvia */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            background: 'var(--surface-soft)',
            padding: '20px 28px',
            borderRadius: '24px',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              📍 Cruce de Cali analizado:
            </span>
            {availableIntersections.length > 0 && onSelectIntersection ? (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                      style={{ padding: '9px 18px', fontSize: '0.84rem' }}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            ) : (
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                {intersection.name}
              </strong>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <ButtonAtom
              label={
                isRainActive
                  ? '🌧️ Lluvia Activa en Cali (Clic para Día Seco)'
                  : '☀️ Día Seco en Cali (Clic para Simular Aguacero)'
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

        {/* =====================================================================
            COMPARACIÓN LADO A LADO DE UN SOLO CRUCE:
            IZQUIERDA (RED ELÉCTRICA MALA DE LA CIUDAD) vs DERECHA (PANEL SOLAR + ARDUINO)
           ===================================================================== */}
        <div className="split-story-row" style={{ alignItems: 'stretch' }}>
          {/* -------------------------------------------------------------------
              COLUMNA 1: ESCENARIO ACTUAL (DEPENDIENDO DE LA RED ELÉCTRICA MALA)
             ------------------------------------------------------------------- */}
          <article
            style={{
              background: '#fff5f5',
              border: '2px solid #fecaca',
              borderRadius: '32px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  text="❌ ESCENARIO ACTUAL • RED ELÉCTRICA TRADICIONAL"
                  tone="danger"
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#991b1b',
                    background: '#fee2e2',
                    padding: '6px 12px',
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
                <p style={{ fontSize: '0.96rem', color: '#991b1b', lineHeight: 1.6 }}>
                  En <strong>{intersection.name}</strong>, un bajón de energía o lluvia fuerte
                  apaga el semáforo por completo y deja la intersección sin ley.
                </p>
              </div>

              {/* Imagen Real de cómo se ve el cruce apagado */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  height: '250px',
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
                    padding: '16px 20px',
                    background:
                      'linear-gradient(to top, rgba(127, 29, 29, 0.95), rgba(127, 29, 29, 0.4), transparent)',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ fontSize: '0.92rem', display: 'block' }}>
                    🛑 Así se ve el cruce cuando falla la energía:
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#fecaca' }}>
                    Luces muertas, bloqueo en las 4 esquinas y civiles pidiendo monedas para dar
                    paso.
                  </span>
                </div>
              </div>

              {/* Lista Clara de los Riesgos que Corre */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '22px',
                  padding: '22px 24px',
                  border: '1px solid #fecaca',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <strong style={{ fontSize: '0.95rem', color: '#991b1b' }}>
                  ⚠️ ¿Qué riesgos graves corre este cruce hoy?
                </strong>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>💥</span>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55 }}>
                    <strong>Choques por improvisación:</strong> Nadie sabe quién tiene la vía; los
                    vehículos se atraviesan al mismo tiempo sin señal clara.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>🦺</span>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55 }}>
                    <strong>Peligro para peatones y voluntarios:</strong> Ante la ausencia de
                    agentes de tránsito, personas de la comunidad se paran en medio de los carros a
                    regular el paso.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>⛈️</span>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55 }}>
                    <strong>Apagón seguro cuando llueve:</strong> Justo cuando el piso mojado exige
                    más precaución, la red eléctrica del sector colapsa.
                  </p>
                </div>
              </div>
            </div>

            {/* Métricas del Escenario Malo */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                background: '#fee2e2',
                padding: '18px 22px',
                borderRadius: '20px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 700 }}>
                  TIEMPO DE ESPERA EN COLA
                </span>
                <strong
                  style={{
                    fontSize: '1.65rem',
                    color: '#7f1d1d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  ⏱️ {brokenGridWaitSeconds} seg
                </strong>
                <span style={{ fontSize: '0.76rem', color: '#991b1b' }}>
                  Más de {Math.round(brokenGridWaitSeconds / 60)} minutos detenido
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 700 }}>
                  TRANCONES CADA 5 MIN
                </span>
                <strong
                  style={{
                    fontSize: '1.65rem',
                    color: '#7f1d1d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  🚗 {brokenGridVehiclesQueue} carros
                </strong>
                <span style={{ fontSize: '0.76rem', color: '#991b1b' }}>
                  Cola crítica acumulada
                </span>
              </div>
            </div>
          </article>

          {/* -------------------------------------------------------------------
              COLUMNA 2: ESCENARIO CON SOLUCIÓN (PANEL SOLAR + ARDUINO + LED)
             ------------------------------------------------------------------- */}
          <article
            style={{
              background: 'var(--accent-lime-soft)',
              border: '2px solid #84cc16',
              borderRadius: '32px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  text="✅ ESCENARIO CON SOLUCIÓN • PANEL SOLAR + ARDUINO + LED"
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
                <p style={{ fontSize: '0.96rem', color: '#166534', lineHeight: 1.6 }}>
                  En <strong>{intersection.name}</strong>, el semáforo produce su propia energía
                  solar y el <strong>Arduino</strong> organiza el tráfico sin depender de la red
                  eléctrica de Cali.
                </p>
              </div>

              {/* Imagen Real de cómo se ve el cruce con Panel Solar y Luces LED */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  height: '250px',
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
                    padding: '16px 20px',
                    background:
                      'linear-gradient(to top, rgba(20, 83, 45, 0.95), rgba(20, 83, 45, 0.45), transparent)',
                    color: '#ffffff',
                  }}
                >
                  <strong style={{ fontSize: '0.92rem', display: 'block' }}>
                    ☀️ Así funciona con el Panel Solar y Arduino:
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#dcfce7' }}>
                    Luces LED de alto brillo encendidas 24/7, paso ordenado y ola verde coordinada
                    por zona.
                  </span>
                </div>
              </div>

              {/* Lista Clara de Beneficios y Protección */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '22px',
                  padding: '22px 24px',
                  border: '1px solid #bef264',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
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
                  <strong style={{ fontSize: '0.95rem', color: '#166534' }}>
                    🛡️ ¿Cómo elimina todos los riesgos anteriores?
                  </strong>
                  <ButtonAtom
                    label="Cambiar Fase LED del Arduino ↻"
                    variant="primary"
                    onClick={() => onAdvancePhase(intersection.id)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>☀️</span>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55 }}>
                    <strong>Nunca se apaga aunque se vaya la luz en Cali:</strong> El panel solar de
                    180W y su batería de 72 horas mantienen las luces LED (18W) encendidas día,
                    noche y bajo tormentas.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>🤖</span>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55 }}>
                    <strong>Cero improvisación con control Arduino:</strong> El microcontrolador
                    asigna luz verde inteligente según la cola real, protegiendo al peatón y
                    evitando que civiles arriesguen su vida en la vía.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem' }}>📡</span>
                  <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55 }}>
                    <strong>Respaldo por Zona Autónoma:</strong> Conectado a la{' '}
                    <strong>{intersection.zoneName}</strong> para sincronizar el corredor vial sin
                    cables eléctricos públicos.
                  </p>
                </div>
              </div>
            </div>

            {/* Métricas del Escenario Solar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                background: '#d9f99d',
                padding: '18px 22px',
                borderRadius: '20px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: '#3f6212', fontWeight: 700 }}>
                  TIEMPO DE ESPERA CON SOLAR
                </span>
                <strong
                  style={{
                    fontSize: '1.65rem',
                    color: '#14532d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  ⏱️ {solarWaitSeconds} seg (-71%)
                </strong>
                <span style={{ fontSize: '0.76rem', color: '#3f6212' }}>
                  Ahorras {brokenGridWaitSeconds - solarWaitSeconds} segundos por cruce
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: '#3f6212', fontWeight: 700 }}>
                  COLA VEHICULAR CADA 5 MIN
                </span>
                <strong
                  style={{
                    fontSize: '1.65rem',
                    color: '#14532d',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  🚗 {solarVehiclesQueue} carros
                </strong>
                <span style={{ fontSize: '0.76rem', color: '#3f6212' }}>
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
