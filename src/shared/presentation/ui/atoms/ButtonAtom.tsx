import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';

export interface ButtonAtomData {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface ButtonAtomActions {
  onClick: () => void;
}

export type ButtonAtomProps = DumbComponentProps<ButtonAtomData, ButtonAtomActions>;

/**
 * ÁTOMO COMPARTIDO (Dumb Component): ButtonAtom
 * Botón tipo cápsula (Pill Button) estilo NextWave / Cargo Panda.
 */
export const ButtonAtom = defineDumbComponent<ButtonAtomProps>(
  'atom',
  'shared',
  ({ label, variant = 'primary', disabled = false, onClick, testId }) => {
    return (
      <button
        data-testid={testId}
        disabled={disabled}
        onClick={onClick}
        className={`pill-btn pill-btn--${variant}`}
      >
        {label}
      </button>
    );
  }
);
