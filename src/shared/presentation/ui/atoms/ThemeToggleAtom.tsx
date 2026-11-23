import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';

export interface ThemeToggleAtomData {
  readonly isDarkMode: boolean;
}

export interface ThemeToggleAtomActions {
  readonly onToggleTheme: () => void;
}

export type ThemeToggleAtomProps = DumbComponentProps<
  ThemeToggleAtomData,
  ThemeToggleAtomActions
>;

/**
 * ÁTOMO COMPARTIDO (Dumb Component): ThemeToggleAtom
 * Botón cápsula interactivo para alternar entre Modo Claro (Editorial Light) y Modo Oscuro (Dark Mode).
 */
export const ThemeToggleAtom = defineDumbComponent<ThemeToggleAtomProps>(
  'atom',
  'shared',
  ({ isDarkMode, onToggleTheme, testId }) => {
    return (
      <button
        type="button"
        data-testid={testId}
        onClick={onToggleTheme}
        aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="theme-toggle-pill"
      >
        <span className="theme-toggle-pill__icon">
          {isDarkMode ? '☀️' : '🌙'}
        </span>
        <span className="theme-toggle-pill__label">
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      </button>
    );
  }
);
