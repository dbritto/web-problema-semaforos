import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import { BadgeAtom } from '@shared/presentation/ui';

export interface CaliContextAndProblemsOrganismData {
  readonly institution: string;
  readonly authors: readonly string[];
  readonly docente: string;
  readonly observationWindow: string;
  readonly sampleRatioText: string;
}

export type CaliContextAndProblemsOrganismProps =
  DumbComponentProps<CaliContextAndProblemsOrganismData>;

/**
 * ORGANISMO DEL MÓDULO (Dumb Component): CaliContextAndProblemsOrganism
 * Diseño amplio (Full-Width) y espacioso para explicar el contexto de Cali y los problemas detectados.
 */
export const CaliContextAndProblemsOrganism =
  defineDumbComponent<CaliContextAndProblemsOrganismProps>(
    'organism',
    'traffic-control',
    ({ institution, authors, docente, observationWindow, sampleRatioText }) => {
      return (
        <section
          id="contexto-cali"
          className="sheet-white"
          style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}
        >
          {/* FILA 1: CONTEXTO DE CALI (50% TEXTO EDITORIAL AMPLIO / 50% IMAGEN GRANDE) */}
          <div className="split-story-row">
            <div className="split-story-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    color: 'var(--accent-orange)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  01 • Contexto en Santiago de Cali —
                </span>
                <BadgeAtom text="Observación Norte y Oriente" tone="warning" />
              </div>

              <h2 className="editorial-h2">
                ¿Qué está pasando con los semáforos en el Norte y Oriente de Cali?
              </h2>

              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.75 }}>
                En las principales arterias viales del <strong>Norte y Oriente de Cali</strong>, la
                movilidad depende de semáforos conectados a la red eléctrica pública tradicional.
                Durante el estudio de campo realizado el <strong>{observationWindow}</strong>, se
                documentó que <strong>{sampleRatioText}</strong>, dejando a miles de conductores y
                peatones sin una señal clara que indique a quién le corresponde avanzar.
              </p>

              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: 1.75 }}>
                Ante la presencia poca o nula de agentes oficiales de tránsito en estos puntos,
                personas de la misma comunidad asumen la regulación del paso vehicular a cambio de
                una colaboración voluntaria (monedas), situación que se vuelve aún más crítica
                durante las horas pico (4:30 PM a 6:30 PM) y en los días de lluvia.
              </p>

              <div style={{ paddingTop: '8px' }}>
                <a href="#que-es-arduino-solar" className="pill-btn pill-btn--danger">
                  Ver cómo lo resolvemos con Arduino y Paneles Solares →
                </a>
              </div>
            </div>

            <div className="split-story-media">
              <img
                src="/images/cali-traffic-chaos.png"
                alt="Congestión en intersección de Cali con semáforo fuera de servicio bajo la lluvia"
              />
              <div
                className="floating-glass-card"
                style={{ bottom: '24px', left: '24px', maxWidth: '340px' }}
              >
                <strong style={{ fontSize: '0.92rem', color: '#111827', display: 'block' }}>
                  📍 Evidencia en Campo (Hora Pico)
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.45 }}>
                  Conteos vehiculares cada 5 minutos y medición con cronómetro en 12 intersecciones
                  de Cali.
                </span>
              </div>
            </div>
          </div>

          {/* FILA 2: LOS PROBLEMAS QUE TRAE (TARJETAS AMPLIAS Y ESPACIOSAS EN 2 COLUMNAS) */}
          <div
            id="problemas-cali"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              paddingTop: '48px',
              borderTop: '1px solid var(--border-light)',
            }}
          >
            <div style={{ maxWidth: '780px' }}>
              <span
                style={{
                  color: 'var(--accent-orange)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                02 • Consecuencias en la Ciudad
              </span>
              <h3 className="editorial-h2" style={{ marginTop: '8px' }}>
                Los problemas reales que genera un semáforo apagado en Cali
              </h3>
            </div>

            <div className="bento-2col">
              <article className="bento-card-orange">
                <div>
                  <span
                    style={{
                      background: 'rgba(255,255,255,0.22)',
                      color: '#ffffff',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    Hipótesis Principal • Tiempo de Espera
                  </span>
                  <h4 style={{ fontSize: '1.45rem', marginTop: '16px', color: '#ffffff' }}>
                    El tiempo de espera se duplica y las colas colapsan la vía
                  </h4>
                  <p
                    style={{
                      fontSize: '0.98rem',
                      color: 'rgba(255,255,255,0.94)',
                      marginTop: '10px',
                      lineHeight: 1.65,
                    }}
                  >
                    Cuando no hay nadie regulando un cruce dañado, los conductores avanzan por
                    improvisación. El tiempo medido con cronómetro desde que el último vehículo se
                    detiene en la cola hasta que logra cruzar pasa de ~60 segundos a más de 180
                    segundos.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                    Afecta transporte público MIO, particulares y carga
                  </span>
                  <span className="circle-arrow-badge">↗</span>
                </div>
              </article>

              <article className="bento-card-dark">
                <div>
                  <BadgeAtom text="Hipótesis Complementaria • Lluvia y Red Eléctrica" tone="warning" />
                  <h4 style={{ fontSize: '1.45rem', marginTop: '16px', color: '#ffffff' }}>
                    Apagones masivos bajo la lluvia y alto riesgo de accidentes
                  </h4>
                  <p
                    style={{
                      fontSize: '0.98rem',
                      color: '#d1d5db',
                      marginTop: '10px',
                      lineHeight: 1.65,
                    }}
                  >
                    Al depender de la red eléctrica convencional, las lluvias en Cali provocan
                    cortes que apagan varias intersecciones al mismo tiempo justo cuando el asfalto
                    mojado reduce la velocidad de cruce (+35% más demora), poniendo en riesgo a
                    peatones y voluntarios comunitarios.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.88rem', color: '#a3e635', fontWeight: 700 }}>
                    Vulnerabilidad por dependencia de la red eléctrica
                  </span>
                  <span className="circle-arrow-badge">→</span>
                </div>
              </article>
            </div>
          </div>

          {/* FILA 3: FICHA DEL EQUIPO DE INVESTIGACIÓN */}
          <div
            className="bento-2col"
            style={{
              paddingTop: '12px',
            }}
          >
            <div
              className="bento-card-light"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 36px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  INSTITUCIÓN UNIVERSITARIA • CALI, COLOMBIA
                </span>
                <h4 style={{ fontSize: '1.12rem', color: 'var(--text-dark)', marginTop: '6px' }}>
                  {institution}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '4px' }}>
                  Docente: {docente} • Asignatura: Introducción a la Ingeniería
                </p>
              </div>
              <span className="circle-arrow-badge">🏛️</span>
            </div>

            <div
              className="bento-card-light"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 36px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  AUTORES DEL ESTUDIO DE CAMPO
                </span>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', marginTop: '6px' }}>
                  {authors.join(' • ')}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '4px' }}>
                  Metodología cuantitativa: cronómetro, aforo cada 5 min y encuestas en sector.
                </p>
              </div>
              <span className="circle-arrow-badge">📊</span>
            </div>
          </div>
        </section>
      );
    }
  );
