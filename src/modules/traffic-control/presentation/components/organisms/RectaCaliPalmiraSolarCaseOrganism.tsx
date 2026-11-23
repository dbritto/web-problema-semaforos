import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import {
  BadgeAtom,
  ImageCarouselMolecule,
  CarouselSlideItem,
} from '@shared/presentation/ui';

export interface RectaCaliPalmiraSolarCaseOrganismData {
  readonly palmiraGovUrl: string;
  readonly caracolNewsUrl: string;
}

export type RectaCaliPalmiraSolarCaseOrganismProps =
  DumbComponentProps<RectaCaliPalmiraSolarCaseOrganismData>;

const RECTA_CALI_PALMIRA_SLIDES: readonly CarouselSlideItem[] = [
  {
    id: 'recta-slide-1',
    imageUrl: '/images/recta-cali-palmira-night.png',
    badge: 'CASO REAL EN EL VALLE • RECTA CALI–PALMIRA',
    title: '19 Kilómetros de Corredor Vial Iluminados con Energía Solar',
    description:
      'Más de 1.700 postes autónomos con paneles solares y luminarias LED iluminan la doble calzada y la ciclorruta entre Cali y Palmira sin depender de la red eléctrica.',
    highlightStat: '+90% Avance (2026)',
  },
  {
    id: 'recta-slide-2',
    imageUrl: '/images/recta-cali-palmira-pole.png',
    badge: 'TECNOLOGÍA OFF-GRID • POSTES EN FIBRA DE VIDRIO',
    title: 'Paneles Fotovoltaicos Independientes en Cada Poste Vial',
    description:
      'Cada poste cuenta con su propio panel solar superior, batería integrada y lámpara LED de alta eficiencia, evitando apagones en cadena y el robo de cableado.',
    highlightStat: '+1.700 Postes Solares',
  },
];

/**
 * ORGANISMO DEL MÓDULO (Dumb Component): RectaCaliPalmiraSolarCaseOrganism
 * Presenta el caso de éxito real de la Recta Cali-Palmira (Alcaldía de Palmira / Caracol Radio, feb. 2026)
 * como evidencia empírica de que la energía solar autónoma en infraestructura vial funciona en el Valle del Cauca.
 */
export const RectaCaliPalmiraSolarCaseOrganism =
  defineDumbComponent<RectaCaliPalmiraSolarCaseOrganismProps>(
    'organism',
    'traffic-control',
    ({ palmiraGovUrl, caracolNewsUrl }) => {
      return (
        <section
          id="caso-exito-recta"
          className="sheet-white"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          {/* Encabezado de Caso Real en el Valle del Cauca */}
          <div
            style={{
              maxWidth: '940px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <BadgeAtom
                text="EVIDENCIA REAL EN EL VALLE DEL CAUCA • FEBRERO 2026"
                tone="success"
              />
              <BadgeAtom text="CORREDOR VIAL RECTA CALI–PALMIRA" tone="warning" />
            </div>

            <h2 className="editorial-h2">
              Un ejemplo real a pocos minutos de Cali: La{' '}
              <span className="highlight-lime-word">Recta Cali–Palmira</span> ya funciona con
              paneles solares autónomos
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-body)',
                lineHeight: 1.75,
              }}
            >
              Nuestra propuesta de independizar los semáforos de Cali mediante paneles solares y
              luminarias LED no es una utopía: <strong>ya se está aplicando con éxito en el
              corredor vial más importante entre Cali y Palmira</strong>, donde más de{' '}
              <strong>1.700 postes solares autónomos</strong> iluminan 19 kilómetros de carretera
              sin depender de la red eléctrica tradicional.
            </p>
          </div>

          {/* Historia Dividida: Carrusel de la Recta Cali-Palmira + Datos Oficiales de la Obra */}
          <div className="split-story-row">
            <ImageCarouselMolecule
              slides={RECTA_CALI_PALMIRA_SLIDES}
              height="500px"
              accentTone="lime"
              autoPlayIntervalMs={5800}
            />

            <div className="split-story-content">
              <div>
                <span
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: '#65a30d',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Referente Regional • Concesión 5G Rutas del Valle
                </span>
                <h3 className="editorial-h3" style={{ marginTop: '10px' }}>
                  ¿Cómo funciona la iluminación solar de la Recta Cali–Palmira y por qué valida
                  nuestros semáforos solares?
                </h3>
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.72,
                }}
              >
                Durante años, la Recta Cali–Palmira sufrió oscuridad por fallas eléctricas y hurto
                constante de cableado subterráneo. La solución definitiva —que ya supera el{' '}
                <strong>90% de avance en instalación de estructuras</strong> y opera al{' '}
                <strong>100% en el sector de Estambul</strong>— consistió en instalar postes de
                fibra de vidrio donde cada unidad genera y almacena su propia energía solar.
              </p>

              {/* 3 Puntos Clave del Caso de Éxito */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    background: 'var(--accent-lime-soft)',
                    padding: '18px 22px',
                    borderRadius: '20px',
                    border: '1px solid #bef264',
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
                    90%
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--text-dark)' }}>
                      +1.700 Postes Solares en 19 km de Doble Calzada y Ciclorruta
                    </strong>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#374151',
                        marginTop: '4px',
                        lineHeight: 1.55,
                      }}
                    >
                      Cada poste opera como una unidad fotovoltaica independiente con luces LED:
                      si uno requiere mantenimiento, los otros 1.699 siguen encendidos sin apagones
                      en cadena.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    background: 'var(--surface-soft)',
                    padding: '18px 22px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
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
                    🔌
                  </span>
                  <div>
                    <strong style={{ fontSize: '0.96rem', color: 'var(--text-dark)' }}>
                      Mismo Clima y Radiación Solar que el Norte y Oriente de Cali
                    </strong>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-body)',
                        marginTop: '4px',
                        lineHeight: 1.55,
                      }}
                    >
                      La Recta Cali–Palmira comparte exactamente las mismas condiciones de radiación
                      solar y lluvias del Valle del Cauca, comprobando que los paneles solares
                      mantienen operativa la infraestructura vial toda la noche.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones con enlaces directos a las 2 fuentes oficiales proporcionadas */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingTop: '8px',
                }}
              >
                <a
                  href={palmiraGovUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn pill-btn--primary"
                >
                  📰 Comunicado Alcaldía de Palmira ↗
                </a>
                <a
                  href={caracolNewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn pill-btn--secondary"
                >
                  📻 Noticia Caracol Radio (90% Avance) ↗
                </a>
              </div>
            </div>
          </div>

          {/* Franja Comparativa de Cifras del Proyecto Real */}
          <div className="bento-3col">
            <div className="bento-card-light">
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#65a30d' }}>
                  INFRAESTRUCTURA SOSTENIBLE
                </span>
                <strong
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.1rem',
                    color: 'var(--text-dark)',
                    display: 'block',
                    marginTop: '6px',
                  }}
                >
                  19 Kilómetros
                </strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '6px', lineHeight: 1.5 }}>
                  Corredor estratégico Cali–Palmira iluminado con energía limpia desde el sector
                  Estambul hasta Palmira.
                </p>
              </div>
            </div>

            <div className="bento-card-lime">
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3f6212' }}>
                  AUTONOMÍA POR POSTE
                </span>
                <strong
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.1rem',
                    color: 'var(--text-dark)',
                    display: 'block',
                    marginTop: '6px',
                  }}
                >
                  +1.700 Postes
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#1f2937', marginTop: '6px', lineHeight: 1.5 }}>
                  Estructuras en fibra de vidrio con paneles solares superiores que evitan el robo
                  de cableado eléctrico.
                </p>
              </div>
            </div>

            <div className="bento-card-dark">
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#a3e635' }}>
                  APLICACIÓN A SEMÁFOROS DE CALI
                </span>
                <strong
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.1rem',
                    color: '#ffffff',
                    display: 'block',
                    marginTop: '6px',
                  }}
                >
                  100% Viable
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#d1d5db', marginTop: '6px', lineHeight: 1.5 }}>
                  Al sumar un controlador Arduino Mega a cada poste solar, llevamos este mismo
                  modelo exitoso a las intersecciones de Cali.
                </p>
              </div>
            </div>
          </div>
        </section>
      );
    }
  );
