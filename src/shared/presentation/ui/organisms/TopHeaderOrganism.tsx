import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';

export interface TopHeaderOrganismData {
  appTitle: string;
  subtitle: string;
  architectureTag: string;
  heroImageUrl?: string;
}

export type TopHeaderOrganismProps = DumbComponentProps<TopHeaderOrganismData>;

/**
 * ORGANISMO COMPARTIDO (Dumb Component): TopHeaderOrganism
 * Hero Editorial Limpio (Inspirado directamente en NextWave & Cargo Panda):
 * - Sheet blanca con bordes redondeados de 36px.
 * - Tipografía negra de alto impacto con palabra clave en Verde Lima (#a3e635) subrayada.
 * - Fotografía grande a la derecha con 2 tarjetas flotantes blancas superpuestas.
 */
export const TopHeaderOrganism = defineDumbComponent<TopHeaderOrganismProps>(
  'organism',
  'shared',
  ({ subtitle, heroImageUrl = '/images/arduino-solar-semaphore.png' }) => {
    return (
      <header className="sheet-white">
        <div className="editorial-hero-grid">
          {/* Columna Izquierda: Titular Editorial + Botones Cápsula */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#ecfccb',
                  color: '#3f6212',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  padding: '6px 14px',
                  borderRadius: '999px',
                }}
              >
                ● Estudio de Movilidad Urbana • Santiago de Cali
              </span>
              <span
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  padding: '6px 14px',
                  borderRadius: '999px',
                }}
              >
                UNIAJC • Facultad de Ingenierías
              </span>
            </div>

            <h1 className="editorial-h1">
              Soluciones que transforman los semáforos de{' '}
              <span className="highlight-lime-word">Cali</span>
            </h1>

            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.65,
                color: 'var(--text-body)',
                maxWidth: '540px',
              }}
            >
              {subtitle}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                marginTop: '4px',
              }}
            >
              <a href="#propuesta-solar" className="pill-btn pill-btn--primary">
                Conocer solución solar →
              </a>
              <a href="#contexto-cali" className="pill-btn pill-btn--secondary">
                ▶ Ver diagnóstico de campo
              </a>
            </div>

            {/* Mini fila de características inferiores como en Cargo Panda */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                paddingTop: '18px',
                borderTop: '1px solid var(--border-light)',
                marginTop: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#ffedd5',
                    color: '#ea580c',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  5/12
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.3 }}>
                  <strong>Cruces apagados</strong>
                  <br />
                  en hora pico (4:30 - 6:30 PM)
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#ecfccb',
                    color: '#4d7c0f',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  72h
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.3 }}>
                  <strong>Autonomía Solar</strong>
                  <br />
                  con paneles + Arduino + LED
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#f3f4f6',
                    color: '#111827',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  2
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.3 }}>
                  <strong>Zonas Autónomas</strong>
                  <br />
                  Norte y Oriente sin red pública
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Fotografía Redondeada con Tarjetas Flotantes (Estilo NextWave) */}
          <div className="hero-photo-container">
            <img
              src={heroImageUrl}
              alt="Semáforo inteligente autónomo con panel solar, luces LED y controlador Arduino en Cali"
            />

            {/* Tarjeta flotante superior derecha (igual a NextWave) */}
            <div
              className="floating-glass-card"
              style={{
                top: '20px',
                right: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    background: '#a3e635',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  🌱 Movilidad Sostenible
                </span>
                <span style={{ fontWeight: 700, color: '#6b7280' }}>↗</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.4 }}>
                Zonas semafóricas 100% independientes de la red eléctrica de Cali.
              </p>
            </div>

            {/* Tarjeta flotante inferior izquierda con miniatura del problema */}
            <div
              className="floating-glass-card"
              style={{
                bottom: '20px',
                left: '20px',
                maxWidth: '300px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <img
                src="/images/cali-traffic-chaos.png"
                alt="Tráfico en Cali"
                style={{
                  width: '58px',
                  height: '58px',
                  minHeight: '58px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#111827', display: 'block' }}>
                  Norte y Oriente de Cali
                </strong>
                <span style={{ fontSize: '0.75rem', color: '#4b5563', lineHeight: 1.35 }}>
                  Reducción de hasta 71% en tiempos de espera en hora pico y lluvia.
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
);
