import { useState, useEffect, useCallback } from 'react';
import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';

export interface CarouselSlideItem {
  readonly id: string;
  readonly imageUrl: string;
  readonly badge: string;
  readonly title: string;
  readonly description: string;
  readonly highlightStat?: string;
}

export interface ImageCarouselMoleculeData {
  readonly slides: readonly CarouselSlideItem[];
  readonly autoPlayIntervalMs?: number;
  readonly height?: string;
  readonly accentTone?: 'lime' | 'orange';
}

export type ImageCarouselMoleculeProps = DumbComponentProps<ImageCarouselMoleculeData>;

/**
 * MOLÉCULA COMPARTIDA (Dumb Component): ImageCarouselMolecule
 * Carrusel editorial interactivo y 100% responsive (en escritorio la tarjeta flota sobre la imagen;
 * en celular la imagen tiene su propio viewport arriba y la tarjeta se apila debajo sin taparla).
 */
export const ImageCarouselMolecule = defineDumbComponent<ImageCarouselMoleculeProps>(
  'molecule',
  'shared',
  ({
    slides,
    autoPlayIntervalMs = 5500,
    height = '510px',
    accentTone = 'lime',
    testId,
  }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const total = slides.length;

    const handleNext = useCallback(() => {
      if (total <= 1) return;
      setActiveIndex((prev) => (prev + 1) % total);
    }, [total]);

    const handlePrev = useCallback(() => {
      if (total <= 1) return;
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    useEffect(() => {
      if (isPaused || total <= 1 || autoPlayIntervalMs <= 0) return;
      const timer = window.setInterval(handleNext, autoPlayIntervalMs);
      return () => window.clearInterval(timer);
    }, [isPaused, total, autoPlayIntervalMs, handleNext]);

    if (total === 0) return null;

    const currentSlide = slides[activeIndex] ?? slides[0];
    const accentColor = accentTone === 'lime' ? '#a3e635' : '#f97316';
    const accentTextColor = accentTone === 'lime' ? '#111827' : '#ffffff';

    return (
      <div
        data-testid={testId}
        className="editorial-carousel"
        style={{ height }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Viewport de imágenes */}
        <div className="editorial-carousel__viewport">
          {slides.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={slide.id}
                className="editorial-carousel__slide"
                style={{
                  opacity: isCurrent ? 1 : 0,
                  transform: isCurrent ? 'scale(1)' : 'scale(1.04)',
                  pointerEvents: isCurrent ? 'auto' : 'none',
                  zIndex: isCurrent ? 1 : 0,
                }}
              >
                <img src={slide.imageUrl} alt={slide.title} />
                <div className="editorial-carousel__gradient" />
              </div>
            );
          })}

          {/* Barra superior: Tag del slide + Contador 01 / 03 */}
          <div className="editorial-carousel__topbar">
            <span
              style={{
                background: accentColor,
                color: accentTextColor,
                padding: '6px 13px',
                borderRadius: '999px',
                fontSize: '0.73rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
              }}
            >
              {currentSlide.badge}
            </span>

            <span
              style={{
                background: 'rgba(20, 20, 22, 0.82)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: 700,
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Controles Inferiores: Tarjeta Informativa + Flechas + Píldoras de Paginación */}
        <div className="editorial-carousel__bottom">
          <div className="editorial-carousel__caption-card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '6px',
              }}
            >
              <strong style={{ fontSize: '1rem', color: '#111827', lineHeight: 1.3 }}>
                {currentSlide.title}
              </strong>
              {currentSlide.highlightStat && (
                <span
                  style={{
                    background: '#141416',
                    color: '#a3e635',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSlide.highlightStat}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.84rem', color: '#374151', lineHeight: 1.5 }}>
              {currentSlide.description}
            </p>

            {/* Fila de Dots + Flechas Prev/Next dentro de la tarjeta */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              {/* Indicadores tipo cápsula */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {slides.map((slide, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-label={`Ir a imagen ${idx + 1}: ${slide.title}`}
                      onClick={() => setActiveIndex(idx)}
                      style={{
                        width: isCurrent ? '28px' : '10px',
                        height: '10px',
                        borderRadius: '999px',
                        border: 'none',
                        background: isCurrent ? '#141416' : '#d1d5db',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  );
                })}
              </div>

              {/* Botones Anterior / Siguiente */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={handlePrev}
                  className="editorial-carousel__arrow-btn"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Siguiente imagen"
                  onClick={handleNext}
                  className="editorial-carousel__arrow-btn editorial-carousel__arrow-btn--primary"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
