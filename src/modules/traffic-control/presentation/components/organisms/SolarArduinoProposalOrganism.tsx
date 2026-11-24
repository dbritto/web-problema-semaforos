import { useState } from 'react';
import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import {
  BadgeAtom,
  ImageCarouselMolecule,
  CarouselSlideItem,
} from '@shared/presentation/ui';
import { ZoneSummaryMetrics } from '../../../domain/services/TrafficNetworkDomainService';
import { CaliZoneId } from '../../../domain/value-objects/AutonomousSolarZoneSpec';

export interface SolarArduinoProposalOrganismData {
  readonly zones: readonly ZoneSummaryMetrics[];
}

export interface SolarArduinoProposalOrganismActions {
  readonly onActivateZoneSolar: (zoneId: CaliZoneId) => void;
}

export type SolarArduinoProposalOrganismProps = DumbComponentProps<
  SolarArduinoProposalOrganismData,
  SolarArduinoProposalOrganismActions
>;

const ZONAL_ADMIN_CAROUSEL_SLIDES: readonly CarouselSlideItem[] = [
  {
    id: 'zonal-admin-1',
    imageUrl: '/images/cali-zonal-mesh.png',
    badge: 'RED ZONAL 01 • TOPOLOGÍA MESH EN CALI',
    title: 'División en Zona Norte y Zona Oriente Independientes',
    description:
      'Cada zona de Cali opera como una micro-red autónoma conectada por radiofrecuencia LoRaWAN, eliminando la dependencia de la red eléctrica pública.',
    highlightStat: '2 Zonas Off-Grid',
  },
  {
    id: 'zonal-admin-2',
    imageUrl: '/images/cali-zonal-telemetry.png',
    badge: 'RED ZONAL 02 • GABINETE DE TELEMETRÍA',
    title: 'Monitoreo Centralizado de Baterías y Paneles por Zona',
    description:
      'Supervisa en tiempo real la carga solar (98%), la autonomía de 72 horas y el estado de los controladores Arduino en cada intersección.',
    highlightStat: '98% Carga Solar',
  },
  {
    id: 'zonal-admin-3',
    imageUrl: '/images/cali-solar-intersection.png',
    badge: 'RED ZONAL 03 • OLAS VERDES SINCRONIZADAS',
    title: 'Corredores Viales Fluidos en Hora Pico y Días de Lluvia',
    description:
      'Los Arduinos de una misma zona coordinan sus fases LED para despejar avenidas como la Av. 3 Norte, Av. 6 Norte y Carrera 29.',
    highlightStat: '-71% Espera',
  },
];

interface InteractiveZoneStep {
  readonly id: string;
  readonly name: string;
  readonly sector: string;
  readonly crosses: readonly string[];
}

const INTERACTIVE_ZONES: readonly InteractiveZoneStep[] = [
  {
    id: 'norte',
    name: 'Zona 1: Norte de Cali',
    sector: 'Corredor Av. 3 Norte y Av. 6 Norte',
    crosses: ['Calle 47 con Av. 6N', 'Calle 52 con Av. 3N', 'Calle 55 con Av. 3N'],
  },
  {
    id: 'oriente',
    name: 'Zona 2: Oriente de Cali',
    sector: 'Corredor Carrera 28D, Carrera 29 y Carrera 7L',
    crosses: ['Calle 72U con Cra. 28D', 'Calle 44 con Cra. 29', 'Calle 70 con Cra. 7L'],
  },
];

/**
 * ORGANISMO DEL MÓDULO (Dumb Component): SolarArduinoProposalOrganism
 * Explica de forma visual y con una prueba interactiva muy fácil de entender por qué dividir
 * a Cali en Zonas Solares Independientes evita que un apagón colapse los semáforos.
 */
export const SolarArduinoProposalOrganism =
  defineDumbComponent<SolarArduinoProposalOrganismProps>(
    'organism',
    'traffic-control',
    () => {
      // Un único estado claro: comparar bajo un apagón en Cali qué pasa con Zonas Solares vs. Red Eléctrica Vieja
      const [systemType, setSystemType] = useState<'TRADITIONAL_GRID' | 'SOLAR_ZONES'>(
        'SOLAR_ZONES'
      );

      const isBlackoutAffectingLights = systemType === 'TRADITIONAL_GRID';

      return (
        <section
          id="propuesta-solar"
          className="sheet-dark"
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
          {/* FILA 1: Explicación Clara + Carrusel Zonal */}
          <div className="split-story-row">
            <div className="split-story-content">
              <div>
                <span
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: '#a3e635',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  04 • Arquitectura Descentralizada sin Red Eléctrica
                </span>
                <h2 className="editorial-h2" style={{ color: '#ffffff', marginTop: '10px' }}>
                  Administración Centralizada por{' '}
                  <span className="highlight-lime-pill">Zonas Independientes</span>
                </h2>
              </div>

              <p style={{ color: '#d1d5db', fontSize: '1rem', lineHeight: 1.72 }}>
                El mayor error del sistema actual de Cali es que todos los semáforos de un sector
                dependen del mismo cable de energía pública: <strong>si explota un transformador o
                se cae la luz por lluvia, se apagan todos los cruces a la vez</strong>.
              </p>

              <p style={{ color: '#9ca3af', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Nuestra solución divide a Cali en <strong>Zonas Independientes</strong> (por
                ejemplo, <strong>Zona Norte</strong> y <strong>Zona Oriente</strong>). Cada semáforo
                tiene su propio panel solar y batería, y una pequeña central en cada zona coordina
                los Arduinos por antena inalámbrica para que los carros avancen en "ola verde".
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  marginTop: '4px',
                }}
              >
                <div className="numbered-pill-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ color: '#a3e635', fontWeight: 800, fontSize: '1rem' }}>
                      01
                    </span>
                    <div>
                      <strong style={{ color: '#ffffff', fontSize: '0.94rem', display: 'block' }}>
                        Aislamiento Total ante Cortes de Energía
                      </strong>
                      <span style={{ color: '#9ca3af', fontSize: '0.84rem' }}>
                        Aunque un barrio entero de Cali se quede sin luz eléctrica, los semáforos de
                        la zona siguen encendidos gracias a sus paneles solares.
                      </span>
                    </div>
                  </div>
                  <span style={{ color: '#a3e635', fontWeight: 700 }}>→</span>
                </div>

                <div className="numbered-pill-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ color: '#a3e635', fontWeight: 800, fontSize: '1rem' }}>
                      02
                    </span>
                    <div>
                      <strong style={{ color: '#ffffff', fontSize: '0.94rem', display: 'block' }}>
                        Si un Semáforo Falla, el Resto de la Zona No Cae
                      </strong>
                      <span style={{ color: '#9ca3af', fontSize: '0.84rem' }}>
                        Como cada poste tiene su propio Arduino y panel solar, una avería puntual
                        no arrastra a los demás cruces de la avenida.
                      </span>
                    </div>
                  </div>
                  <span style={{ color: '#a3e635', fontWeight: 700 }}>→</span>
                </div>
              </div>
            </div>

            <ImageCarouselMolecule
              slides={ZONAL_ADMIN_CAROUSEL_SLIDES}
              height="510px"
              accentTone="lime"
              autoPlayIntervalMs={5800}
            />
          </div>

          {/* =====================================================================
              FILA 2: DEMO INTERACTIVA FÁCIL DE ENTENDER:
              "¿QUÉ PASA EN CALI CUANDO SE VA LA LUZ?"
             ===================================================================== */}
          <div
            id="zonas-autonomas"
            style={{
              background: '#1e2026',
              border: '1px solid #323742',
              borderRadius: '28px',
              padding: 'clamp(22px, 3.5vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {/* Encabezado y un SOLO botón interactivo muy claro */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <BadgeAtom
                  text="PRUEBA INTERACTIVA • ¿POR QUÉ USAR ZONAS SOLARES?"
                  tone="success"
                />
                <h3
                  className="editorial-h3"
                  style={{ color: '#ffffff', marginTop: '10px' }}
                >
                  Haz la prueba: ¿Qué pasa en las zonas de Cali cuando hay un apagón eléctrico?
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginTop: '4px' }}>
                  Alterna con el botón para comparar qué sucede durante un corte de energía con la
                  red vieja vs. nuestras Zonas Solares Independientes:
                </p>
              </div>

              {/* Único botón de simulación */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setSystemType((prev) =>
                      prev === 'SOLAR_ZONES' ? 'TRADITIONAL_GRID' : 'SOLAR_ZONES'
                    )
                  }
                  className={`pill-btn ${
                    systemType === 'SOLAR_ZONES' ? 'pill-btn--danger' : 'pill-btn--primary'
                  }`}
                >
                  {systemType === 'SOLAR_ZONES'
                    ? '🔌 Ver cómo fallaría con Red Eléctrica Vieja'
                    : '☀️ Volver a Zonas Solares + Arduino'}
                </button>
              </div>
            </div>

            {/* Banner visual del resultado actual */}
            <div
              style={{
                padding: '18px 24px',
                borderRadius: '20px',
                background: isBlackoutAffectingLights
                  ? 'rgba(239, 68, 68, 0.16)'
                  : 'rgba(163, 230, 53, 0.12)',
                border: isBlackoutAffectingLights
                  ? '1px solid rgba(248, 113, 113, 0.45)'
                  : '1px solid rgba(163, 230, 53, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.6rem' }}>
                  {isBlackoutAffectingLights ? '🚨' : '✅'}
                </span>
                <div>
                  <strong
                    style={{
                      fontSize: '1rem',
                      color: isBlackoutAffectingLights ? '#fca5a5' : '#a3e635',
                      display: 'block',
                    }}
                  >
                    {isBlackoutAffectingLights
                      ? '¡CAOS TOTAL! Se fue la luz en Cali y todos los semáforos se apagaron al mismo tiempo'
                      : '¡SIN PROBLEMAS! Aunque haya apagón en los barrios, las Zonas Solares siguen 100% encendidas'}
                  </strong>
                  <span style={{ fontSize: '0.86rem', color: '#d1d5db' }}>
                    {isBlackoutAffectingLights
                      ? 'Al depender de los cables de la ciudad, un solo corte eléctrico deja a oscuras todas las intersecciones.'
                      : 'Cada zona funciona con sus propios paneles solares (72h de batería) y Arduinos conectados por antena.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Las 2 Zonas de Cali mostradas de forma visual con sus 3 semáforos cada una */}
            <div className="bento-2col">
              {INTERACTIVE_ZONES.map((zone) => (
                <div
                  key={zone.id}
                  style={{
                    background: '#14161a',
                    border: isBlackoutAffectingLights
                      ? '1px solid #ef4444'
                      : '1px solid #a3e635',
                    borderRadius: '24px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '1.15rem', color: '#ffffff', display: 'block' }}>
                        {zone.name}
                      </strong>
                      <span style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{zone.sector}</span>
                    </div>

                    <BadgeAtom
                      text={
                        isBlackoutAffectingLights
                          ? '❌ ZONA APAGADA'
                          : systemType === 'SOLAR_ZONES'
                            ? '☀️ ZONA SOLAR ACTIVA'
                            : '🔌 CONECTADA A RED PÚBLICA'
                      }
                      tone={isBlackoutAffectingLights ? 'danger' : 'success'}
                    />
                  </div>

                  {/* Lista visual de los 3 cruces dentro de esa zona */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {zone.crosses.map((crossName) => (
                      <div
                        key={crossName}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px',
                          background: '#1d2026',
                          padding: '12px 16px',
                          borderRadius: '14px',
                          border: '1px solid #2a2e37',
                        }}
                      >
                        <span style={{ fontSize: '0.88rem', color: '#f3f4f6', fontWeight: 600 }}>
                          🚦 {crossName}
                        </span>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: isBlackoutAffectingLights ? '#f87171' : '#a3e635',
                          }}
                        >
                          <span
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: isBlackoutAffectingLights ? '#ef4444' : '#a3e635',
                              boxShadow: isBlackoutAffectingLights
                                ? 'none'
                                : '0 0 10px #a3e635',
                            }}
                          />
                          {isBlackoutAffectingLights
                            ? 'Apagado (Trancón)'
                            : 'Funcionando (Ola Verde)'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  );
