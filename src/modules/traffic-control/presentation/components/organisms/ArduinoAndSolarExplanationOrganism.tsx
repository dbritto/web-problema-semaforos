import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import {
  BadgeAtom,
  ImageCarouselMolecule,
  CarouselSlideItem,
} from '@shared/presentation/ui';

export interface ArduinoAndSolarExplanationOrganismData {
  readonly arduinoImageUrl?: string;
  readonly solarImageUrl?: string;
  readonly synergyImageUrl?: string;
}

export type ArduinoAndSolarExplanationOrganismProps =
  DumbComponentProps<ArduinoAndSolarExplanationOrganismData>;

const ARDUINO_CAROUSEL_SLIDES: readonly CarouselSlideItem[] = [
  {
    id: 'arduino-slide-1',
    imageUrl: '/images/arduino-board-detail.png',
    badge: 'ARDUINO 01 • MICROCONTROLADOR CENTRAL',
    title: 'Placa Arduino Mega 2560 en Gabinete Vial',
    description:
      'Ejecuta la lógica del dominio (Rojo → Verde → Amarillo), procesa el conteo de vehículos en cola y adapta los tiempos de paso en hora pico.',
    highlightStat: 'Consumo 5V DC',
  },
  {
    id: 'arduino-slide-2',
    imageUrl: '/images/arduino-lora-relay.png',
    badge: 'ARDUINO 02 • RELÉS SSR + ANTENA LORA',
    title: 'Módulo de Relés de Estado Sólido (SSR-3CH) y Radio LoRa',
    description:
      'Conmuta las matrices de luces LED de 18W sin desgaste mecánico y transmite telemetría inalámbrica a la Central Zonal sin usar cables de red.',
    highlightStat: 'Conmutación 0ms',
  },
  {
    id: 'arduino-slide-3',
    imageUrl: '/images/arduino-solar-semaphore.png',
    badge: 'ARDUINO 03 • INTEGRACIÓN EN POSTE',
    title: 'Gabinete Transparente de Control en Semáforo de Cali',
    description:
      'Protección IP66 contra lluvias tropicales con sistema Watchdog que reinicia el ciclo en microsegundos ante cualquier anomalía.',
    highlightStat: 'Operación 24/7',
  },
];

const SOLAR_ZONAL_CAROUSEL_SLIDES: readonly CarouselSlideItem[] = [
  {
    id: 'solar-slide-1',
    imageUrl: '/images/solar-panel-detail.png',
    badge: 'SOLAR ZONAL 01 • CAPTACIÓN EN POSTE',
    title: 'Panel Solar Monocristalino 180W + Batería LiFePO4',
    description:
      'Cada semáforo de Cali capta su propia energía solar durante el día y la almacena en baterías de litio para operar desconectado de la red eléctrica.',
    highlightStat: '72h Autonomía',
  },
  {
    id: 'solar-slide-2',
    imageUrl: '/images/cali-solar-intersection.png',
    badge: 'SOLAR ZONAL 02 • INTERSECCIÓN AUTÓNOMA',
    title: 'Cruce Vial de Cali con Paneles Solares y Luces LED (18W)',
    description:
      'Gracias al 88% de ahorro de las ópticas LED frente a bombillos halógenos de 150W, el panel solar mantiene la intersección encendida aún bajo lluvia.',
    highlightStat: '88% Ahorro LED',
  },
  {
    id: 'solar-slide-3',
    imageUrl: '/images/cali-zonal-telemetry.png',
    badge: 'SOLAR ZONAL 03 • TELEMETRÍA POR ZONA',
    title: 'Gabinete de Monitoreo Energético Zonal (Norte y Oriente)',
    description:
      'Supervisa el nivel de carga (98%), voltaje del controlador MPPT y estado de independencia energética de cada zona semafórica de Cali.',
    highlightStat: '100% Off-Grid',
  },
];

/**
 * ORGANISMO DEL MÓDULO (Dumb Component): ArduinoAndSolarExplanationOrganism
 * Sección editorial Full-Width que incorpora carruseles interactivos en ambos módulos:
 * 1. Carrusel de Arduino Mega 2560 + Relés SSR + Integración LED.
 * 2. Carrusel de Paneles Solares Zonales + Intersección Solar + Telemetría MPPT.
 * 3. Bloque de sinergia explicando cómo juntos resuelven la problemática de Cali.
 */
export const ArduinoAndSolarExplanationOrganism =
  defineDumbComponent<ArduinoAndSolarExplanationOrganismProps>(
    'organism',
    'traffic-control',
    ({ synergyImageUrl = '/images/cali-zonal-mesh.png' }) => {
      return (
        <section
          id="que-es-arduino-solar"
          className="sheet-white"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '84px',
          }}
        >
          {/* ENCABEZADO EDITORIAL AMPLIO */}
          <div
            style={{
              maxWidth: '920px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div>
              <BadgeAtom
                text="FUNDAMENTOS TECNOLÓGICOS • GALERÍA INTERACTIVA"
                tone="success"
              />
            </div>
            <h2 className="editorial-h2">
              ¿Qué es un <span className="highlight-lime-word">Arduino</span>, qué son los{' '}
              <span className="highlight-lime-word">Paneles Solares Zonales</span> y cómo juntos
              resuelven el caos semafórico de Cali?
            </h2>
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-body)',
                lineHeight: 1.75,
              }}
            >
              Explora en los carruseles de cada módulo cómo funciona por dentro el hardware
              propuesto para las intersecciones del Norte y Oriente de Santiago de Cali.
            </p>
          </div>

          {/* =====================================================================
              MÓDULO 1: ¿QUÉ ES UN ARDUINO? (CARRUSEL INTERACTIVO A LA IZQUIERDA)
             ===================================================================== */}
          <div className="split-story-row">
            <ImageCarouselMolecule
              slides={ARDUINO_CAROUSEL_SLIDES}
              height="510px"
              accentTone="lime"
              autoPlayIntervalMs={5500}
            />

            <div className="split-story-content">
              <div>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#65a30d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Módulo 01 • El Cerebro Electrónico del Semáforo
                </span>
                <h3 className="editorial-h3" style={{ marginTop: '10px' }}>
                  ¿Qué es un Arduino y qué hace dentro de la intersección?
                </h3>
              </div>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.75,
                }}
              >
                <strong>Arduino</strong> es una plataforma electrónica de hardware abierto que
                integra un microcontrolador reprogramable (<strong>Arduino Mega 2560</strong>).
                Actúa como una computadora industrial compacta que lee los sensores vehiculares de
                la vía y conmuta las luces LED del semáforo con precisión milimétrica.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    background: 'var(--surface-soft)',
                    padding: '20px 24px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <span
                    style={{
                      background: 'var(--accent-lime)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    1
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-dark)' }}>
                      Tiempos Adaptativos según la Cola Vehicular
                    </strong>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-body)',
                        marginTop: '4px',
                        lineHeight: 1.6,
                      }}
                    >
                      En lugar de ciclos rígidos, el Arduino evalúa cuántos vehículos esperan cada
                      5 minutos y ajusta automáticamente los segundos de luz verde en horas pico
                      (4:30 PM – 6:30 PM).
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    background: 'var(--surface-soft)',
                    padding: '20px 24px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <span
                    style={{
                      background: 'var(--accent-lime)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    2
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-dark)' }}>
                      Alimentación a 5V DC y Comunicación LoRa Zonal
                    </strong>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-body)',
                        marginTop: '4px',
                        lineHeight: 1.6,
                      }}
                    >
                      Opera directamente con la corriente continua de las baterías solares e
                      incluye un módulo de radio LoRa para sincronizarse con los demás semáforos de
                      su zona sin depender de cables externos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              MÓDULO 2: ¿QUÉ SON LOS PANELES SOLARES ZONALES? (CARRUSEL A LA DERECHA)
             ===================================================================== */}
          <div className="split-story-row">
            <div className="split-story-content">
              <div>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-orange)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Módulo 02 • Generación Solar por Zonas Independientes
                </span>
                <h3 className="editorial-h3" style={{ marginTop: '10px' }}>
                  ¿Qué son los Paneles Solares Zonales y cómo evitan los apagones en Cali?
                </h3>
              </div>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.75,
                }}
              >
                Los <strong>Paneles Solares Fotovoltaicos</strong> convierten la radiación solar de
                Cali en electricidad limpia que se almacena en baterías de litio-ferrofosfato
                (LiFePO4) dentro de cada poste. Al agruparlos en{' '}
                <strong>Zonas Independientes (Zona Norte y Zona Oriente)</strong>, ningún cruce
                depende de la red eléctrica pública.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    background: '#fff7ed',
                    padding: '20px 24px',
                    borderRadius: '20px',
                    border: '1px solid #fed7aa',
                  }}
                >
                  <span
                    style={{
                      background: 'var(--accent-orange)',
                      color: '#ffffff',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ☀️
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: '#9a3412' }}>
                      Inmunes a los Cortes Eléctricos durante Lluvias
                    </strong>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#7c2d12',
                        marginTop: '4px',
                        lineHeight: 1.6,
                      }}
                    >
                      Cuando llueve en Cali y falla un transformador del sector, los semáforos
                      actuales quedan a oscuras. Nuestro nodo solar zonal continúa encendido al
                      100% sin interrupción.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    background: 'var(--surface-soft)',
                    padding: '20px 24px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <span
                    style={{
                      background: '#141416',
                      color: '#a3e635',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    🔋
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-dark)' }}>
                      72 Horas de Autonomía + Luces LED de 18W (88% Ahorro)
                    </strong>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-body)',
                        marginTop: '4px',
                        lineHeight: 1.6,
                      }}
                    >
                      La combinación de un panel de 180W con luminarias LED de apenas 18W garantiza
                      3 días completos de operación continua aún sin sol directo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ImageCarouselMolecule
              slides={SOLAR_ZONAL_CAROUSEL_SLIDES}
              height="510px"
              accentTone="orange"
              autoPlayIntervalMs={6000}
            />
          </div>

          {/* =====================================================================
              BLOQUE 3: ¿CÓMO ESTOS JUNTOS RESUELVEN EL PROBLEMA EN CALI?
             ===================================================================== */}
          <div
            style={{
              background: 'var(--accent-lime-soft)',
              border: '1px solid #bef264',
              borderRadius: '32px',
              padding: 'clamp(32px, 4.5vw, 60px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '36px',
            }}
          >
            <div className="split-story-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <span
                    style={{
                      background: 'var(--accent-lime)',
                      color: 'var(--text-dark)',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                    }}
                  >
                    03 • LA SINERGIA COMPLETA EN LAS CALLES DE CALI
                  </span>
                </div>

                <h3 className="editorial-h2" style={{ color: 'var(--text-dark)' }}>
                  ¿Cómo Arduino + Paneles Solares + Luces LED resuelven juntos la problemática?
                </h3>

                <p
                  style={{
                    fontSize: '1.04rem',
                    color: '#1f2937',
                    lineHeight: 1.75,
                  }}
                >
                  Cuando unimos el <strong>Panel Solar (energía inagotable)</strong>, las{' '}
                  <strong>Luces LED (ultra bajo consumo)</strong> y el{' '}
                  <strong>Arduino (control inteligente)</strong> bajo una{' '}
                  <strong>Administración Centralizada por Zonas Independientes</strong>, atacamos
                  todas las variables del problema identificadas en Cali:
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginTop: '6px',
                  }}
                >
                  <div
                    style={{
                      background: '#ffffff',
                      padding: '18px 24px',
                      borderRadius: '20px',
                      fontSize: '0.95rem',
                      color: 'var(--text-dark)',
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>1. Energía Solar + LED = Fin de los semáforos apagados:</strong> El
                    panel solar carga la batería durante el día; las luces LED consumen tan poca
                    energía (18W) que el semáforo jamás se apaga en hora pico ni cuando llueve.
                  </div>

                  <div
                    style={{
                      background: '#ffffff',
                      padding: '18px 24px',
                      borderRadius: '20px',
                      fontSize: '0.95rem',
                      color: 'var(--text-dark)',
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>2. Arduino + Sensores = Reducción del 71% en tiempo de espera:</strong>{' '}
                    Al haber siempre una señal luminosa clara y tiempos de verde adaptados a la cola
                    real, desaparece la improvisación y ya no se necesita que civiles arriesguen su
                    vida regulando el cruce por monedas.
                  </div>

                  <div
                    style={{
                      background: '#ffffff',
                      padding: '18px 24px',
                      borderRadius: '20px',
                      fontSize: '0.95rem',
                      color: 'var(--text-dark)',
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>3. Zonas Independientes (Norte y Oriente) = Cero caídas en cadena:</strong>{' '}
                    Los Arduinos de una misma zona se comunican entre sí por radiofrecuencia
                    (LoRaWAN) para sincronizar olas verdes sin depender de cables eléctricos ni de
                    una central única vulnerable.
                  </div>
                </div>
              </div>

              <div className="split-story-media" style={{ height: '480px' }}>
                <img
                  src={synergyImageUrl}
                  alt="Integración de Zonas Autónomas en Cali con Arduino, Luces LED y Paneles Solares"
                />
                <div
                  className="floating-glass-card"
                  style={{ bottom: '24px', right: '24px', maxWidth: '320px' }}
                >
                  <strong style={{ fontSize: '0.92rem', color: '#111827', display: 'block' }}>
                    ⚡ Resultado en Cali (Hipótesis)
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.45 }}>
                    El tiempo de espera baja de ~184 segundos (caos bajo lluvia) a ~52 segundos con
                    regulación solar autónoma.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  );
