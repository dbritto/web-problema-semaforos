import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import {
  BadgeAtom,
  ButtonAtom,
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

/**
 * ORGANISMO DEL MÓDULO (Dumb Component): SolarArduinoProposalOrganism
 * Sección amplia (Full-Width) y 100% responsive sobre fondo oscuro mate (`sheet-dark`)
 * con Carrusel Zonal Interactivo dedicada a la Administración Centralizada por Zonas Independientes.
 */
export const SolarArduinoProposalOrganism =
  defineDumbComponent<SolarArduinoProposalOrganismProps>(
    'organism',
    'traffic-control',
    ({ zones, onActivateZoneSolar }) => {
      return (
        <section
          id="propuesta-solar"
          className="sheet-dark"
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
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
                El mayor error del sistema actual de Cali es depender de la red eléctrica pública:
                cuando falla un circuito eléctrico, se apagan múltiples semáforos al mismo tiempo.
              </p>

              <p style={{ color: '#9ca3af', fontSize: '0.96rem', lineHeight: 1.7 }}>
                Nuestra propuesta divide la ciudad en <strong>Zonas Autónomas Independientes</strong>{' '}
                (como la <strong>Zona Norte</strong> y la <strong>Zona Oriente</strong>). Cada poste
                genera su propia energía con su panel solar, y los Arduinos de cada zona se
                comunican inalámbricamente (Red Mesh LoRaWAN) con una{' '}
                <strong style={{ color: '#ffffff' }}>Central Zonal Autónoma</strong> para coordinar
                olas verdes y reportar su estado en tiempo real.
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
                        Aislamiento Total de Fallas Eléctricas
                      </strong>
                      <span style={{ color: '#9ca3af', fontSize: '0.84rem' }}>
                        Si se va la luz en un barrio, la Zona Semafórica sigue operando al 100% con
                        sus paneles solares y baterías LiFePO4.
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
                        Sincronización de Olas Verdes por Corredor
                      </strong>
                      <span style={{ color: '#9ca3af', fontSize: '0.84rem' }}>
                        La central de cada zona coordina los Arduinos de su sector (ej. Av. 3 Norte
                        o Carrera 29) para despejar las colas vehiculares.
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

          {/* Tarjetas Amplias de Control de las 2 Zonas de Cali */}
          <div id="zonas-autonomas" style={{ borderTop: '1px solid #2e3036', paddingTop: '36px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '14px',
                marginBottom: '24px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: '#a3e635', fontWeight: 700 }}>
                  CONTROL CENTRALIZADO POR ZONAS • SIMULADOR DDD
                </span>
                <h3 className="editorial-h3" style={{ color: '#ffffff', marginTop: '6px' }}>
                  Estado de las Centrales Zonales Autónomas de Cali
                </h3>
              </div>
              <span style={{ fontSize: '0.88rem', color: '#9ca3af' }}>
                Haz clic en una zona para migrar todos sus semáforos a operación Arduino + Solar:
              </span>
            </div>

            <div className="bento-2col">
              {zones.map((zone) => {
                const allMigrated = zone.autonomousNodesCount === zone.intersectionsCount;
                return (
                  <div
                    key={zone.zoneId}
                    className="bento-card-dark"
                    style={{
                      borderColor: allMigrated ? '#a3e635' : '#2e3036',
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
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#a3e635', fontWeight: 700 }}>
                          {zone.zoneId === 'ZONA_NORTE'
                            ? 'ZONA AUTÓNOMA 01 • NORTE DE CALI'
                            : 'ZONA AUTÓNOMA 02 • ORIENTE DE CALI'}
                        </span>
                        <h4 style={{ fontSize: '1.22rem', color: '#ffffff', marginTop: '4px' }}>
                          {zone.zoneName}
                        </h4>
                      </div>
                      <BadgeAtom
                        text={
                          allMigrated
                            ? '100% Solar Off-Grid'
                            : `${zone.autonomousNodesCount}/${zone.intersectionsCount} Nodos Solares`
                        }
                        tone={allMigrated ? 'success' : 'warning'}
                      />
                    </div>

                    <div
                      className="two-metrics-grid"
                      style={{
                        background: '#141416',
                        padding: '20px',
                        borderRadius: '18px',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'block' }}>
                          Tiempo de Espera Promedio
                        </span>
                        <strong
                          style={{
                            fontSize: '1.4rem',
                            color: '#a3e635',
                            marginTop: '4px',
                            display: 'block',
                          }}
                        >
                          ⏱️ {zone.averageWaitSeconds} seg
                        </strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'block' }}>
                          Vehículos en Cola Zonal
                        </span>
                        <strong
                          style={{
                            fontSize: '1.4rem',
                            color: '#ffffff',
                            marginTop: '4px',
                            display: 'block',
                          }}
                        >
                          🚗 {zone.totalVehiclesInQueue} veh.
                        </strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'block' }}>
                          Respaldo Solar por Poste
                        </span>
                        <strong
                          style={{
                            fontSize: '0.94rem',
                            color: '#e5e7eb',
                            marginTop: '4px',
                            display: 'block',
                          }}
                        >
                          🔋 {zone.batteryAutonomyHours} horas sin red eléctrica
                        </strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'block' }}>
                          Ahorro Energético con LED
                        </span>
                        <strong
                          style={{
                            fontSize: '0.94rem',
                            color: '#a3e635',
                            marginTop: '4px',
                            display: 'block',
                          }}
                        >
                          💡 -{zone.energySavingsPercentage}% consumo (18W)
                        </strong>
                      </div>
                    </div>

                    <ButtonAtom
                      label={
                        allMigrated
                          ? '✓ Zona Operando 100% con Arduino + Paneles Solares'
                          : `Activar Red Arduino + Solar en ${
                              zone.zoneId === 'ZONA_NORTE' ? 'Zona Norte' : 'Zona Oriente'
                            } →`
                      }
                      variant={allMigrated ? 'secondary' : 'primary'}
                      disabled={allMigrated}
                      onClick={() => onActivateZoneSolar(zone.zoneId)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }
  );
