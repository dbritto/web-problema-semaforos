import type { FC } from 'react';

/**
 * CONTRATO DE PRESENTACIÓN: Atomic Design + Componentes Inteligentes (Smart) y Brutos (Dumb)
 *
 * Este archivo formaliza en TypeScript las reglas de diseño de componentes para
 * que ningún desarrollador o IA mezcle lógica de dominio con UI presentacional.
 */

export type AtomicLevel = 'atom' | 'molecule' | 'organism' | 'template';

/**
 * Contrato base para cualquier Componente Bruto (Dumb / Presentational Component).
 * - Recibe datos planos/inmutables (`TData`).
 * - Emite intenciones del usuario mediante callbacks (`TActions`).
 * - NUNCA importa casos de uso, repositorios ni estado global.
 */
export type DumbComponentProps<
  TData extends object = object,
  TActions extends object = object
> = Readonly<TData> &
  Readonly<TActions> & {
    readonly testId?: string;
    readonly className?: string;
  };

/**
 * Metadatos obligatorios para registrar/documentar el rol arquitectónico de un componente.
 */
export interface ComponentArchitectureMeta {
  readonly role: 'dumb' | 'smart';
  readonly atomicLevel?: AtomicLevel;
  readonly module: 'shared' | string;
}

/**
 * Helper para marcar explícitamente un Componente Bruto (Dumb Component) con su nivel de Atomic Design.
 */
export function defineDumbComponent<P extends object>(
  atomicLevel: AtomicLevel,
  moduleName: 'shared' | string,
  Component: FC<P>
): FC<P> & { readonly __architecture: ComponentArchitectureMeta } {
  const Enhanced = Component as FC<P> & { __architecture: ComponentArchitectureMeta };
  Enhanced.__architecture = {
    role: 'dumb',
    atomicLevel,
    module: moduleName,
  };
  return Enhanced;
}

/**
 * Helper para marcar explícitamente un Componente Inteligente (Smart Container).
 * Los Smart Containers conectan Casos de Uso (Application) con Componentes Brutos (Dumb UI).
 */
export function defineSmartContainer<P extends object>(
  moduleName: string,
  Container: FC<P>
): FC<P> & { readonly __architecture: ComponentArchitectureMeta } {
  const Enhanced = Container as FC<P> & { __architecture: ComponentArchitectureMeta };
  Enhanced.__architecture = {
    role: 'smart',
    module: moduleName,
  };
  return Enhanced;
}
