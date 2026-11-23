import React from 'react';
import { defineDumbComponent } from '@shared/presentation/contracts/ComponentContracts';

export interface MainDashboardTemplateProps {
  readonly headerSlot: React.ReactNode;
  readonly summarySlot?: React.ReactNode;
  readonly mainContentSlot: React.ReactNode;
}

/**
 * TEMPLATE COMPARTIDO (Dumb Component): MainDashboardTemplate
 * Layout Editorial Full-Width (100% de la pantalla) de Bloques Apilados con alto aire visual.
 */
export const MainDashboardTemplate = defineDumbComponent<MainDashboardTemplateProps>(
  'template',
  'shared',
  ({ headerSlot, summarySlot, mainContentSlot }) => {
    return (
      <div className="editorial-wrapper">
        {/* Barra de Navegación Flotante tipo Cápsula a todo lo ancho */}
        <nav className="pill-navbar">
          <a href="#" className="pill-navbar__brand">
            <span className="pill-navbar__logo-dot">⚡</span>
            <span>CaliSemaforización</span>
          </a>

          <div className="pill-navbar__links">
            <a href="#contexto-cali" className="pill-navbar__link pill-navbar__link--active">
              Contexto en Cali
            </a>
            <a href="#problemas-cali" className="pill-navbar__link">
              Problemáticas
            </a>
            <a href="#que-es-arduino-solar" className="pill-navbar__link">
              ¿Qué es Arduino y Paneles Solares?
            </a>
            <a href="#propuesta-solar" className="pill-navbar__link">
              Zonas Independientes
            </a>
            <a href="#simulador-cruces" className="pill-navbar__link">
              Cruces de Cali (Tabla 2)
            </a>
          </div>

          <a href="#simulador-cruces" className="pill-btn pill-btn--dark">
            Simular Intersecciones →
          </a>
        </nav>

        {/* Hero Principal */}
        {headerSlot}

        {/* Barra Oscura de KPIs */}
        {summarySlot && <section className="kpi-dark-bar">{summarySlot}</section>}

        {/* Secciones Principales Apiladas con separación amplia */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {mainContentSlot}
        </main>

        {/* Footer Verde Lima limpio estilo Creatix */}
        <footer className="sheet-lime-footer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <strong
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.55rem',
                  fontWeight: 800,
                }}
              >
                CaliSemaforización • Red Zonal Autónoma Solar
              </strong>
              <p style={{ fontSize: '0.95rem', marginTop: '6px', color: '#1f2937' }}>
                Facultad de Ingenierías — Institución Universitaria Antonio José Camacho (UNIAJC) •
                Santiago de Cali, Colombia
              </p>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827' }}>
              Arquitectura Hexagonal • DDD • Atomic Design (Smart & Dumb Components)
            </div>
          </div>
        </footer>
      </div>
    );
  }
);
