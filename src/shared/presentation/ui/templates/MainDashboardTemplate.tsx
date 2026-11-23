import React, { useState, useEffect } from 'react';
import { defineDumbComponent } from '@shared/presentation/contracts/ComponentContracts';
import { ThemeToggleAtom } from '../atoms/ThemeToggleAtom';

export interface MainDashboardTemplateProps {
  readonly headerSlot: React.ReactNode;
  readonly summarySlot?: React.ReactNode;
  readonly mainContentSlot: React.ReactNode;
}

const THEME_STORAGE_KEY = 'cali-semaforos-theme';

/**
 * TEMPLATE COMPARTIDO (Dumb Component): MainDashboardTemplate
 * Layout Editorial Full-Width con soporte nativo para Modo Claro / Modo Oscuro persistente.
 */
export const MainDashboardTemplate = defineDumbComponent<MainDashboardTemplateProps>(
  'template',
  'shared',
  ({ headerSlot, summarySlot, mainContentSlot }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
      if (typeof window === 'undefined') return false;
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark';
    });

    useEffect(() => {
      const root = document.documentElement;
      if (isDarkMode) {
        root.setAttribute('data-theme', 'dark');
        window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
      }
    }, [isDarkMode]);

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
            <a href="#que-es-arduino-solar" className="pill-navbar__link">
              Arduino y Paneles Solares
            </a>
            <a href="#propuesta-solar" className="pill-navbar__link">
              Zonas Independientes
            </a>
            <a href="#caso-exito-recta" className="pill-navbar__link">
              Caso Real: Recta Cali–Palmira
            </a>
            <a href="#simulador-cruces" className="pill-navbar__link">
              Ejemplo Comparativo
            </a>
          </div>

          <div
            className="pill-navbar__actions"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}
          >
            <ThemeToggleAtom
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode((prev) => !prev)}
            />
            <a href="#simulador-cruces" className="pill-btn pill-btn--dark">
              Ver Comparación →
            </a>
          </div>
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
