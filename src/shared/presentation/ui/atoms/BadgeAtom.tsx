import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';

export interface BadgeAtomData {
  text: string;
  tone?: 'success' | 'warning' | 'danger' | 'neutral';
  pulsing?: boolean;
}

export type BadgeAtomProps = DumbComponentProps<BadgeAtomData>;

/**
 * ÁTOMO COMPARTIDO (Dumb Component): BadgeAtom
 * Etiqueta cápsula limpia y editorial (estilo tags de NextWave).
 */
export const BadgeAtom = defineDumbComponent<BadgeAtomProps>(
  'atom',
  'shared',
  ({ text, tone = 'neutral', testId }) => {
    const palette: Record<
      NonNullable<BadgeAtomData['tone']>,
      { bg: string; fg: string; dot: string; border: string }
    > = {
      success: {
        bg: '#ecfccb',
        fg: '#3f6212',
        dot: '#84cc16',
        border: '#d9f99d',
      },
      warning: {
        bg: '#ffedd5',
        fg: '#9a3412',
        dot: '#f97316',
        border: '#fed7aa',
      },
      danger: {
        bg: '#fee2e2',
        fg: '#991b1b',
        dot: '#ef4444',
        border: '#fecaca',
      },
      neutral: {
        bg: '#f3f4f6',
        fg: '#1f2937',
        dot: '#6b7280',
        border: '#e5e7eb',
      },
    };

    const current = palette[tone];

    return (
      <span
        data-testid={testId}
        style={{
          backgroundColor: current.bg,
          color: current.fg,
          border: `1px solid ${current.border}`,
          padding: '6px 14px',
          borderRadius: '9999px',
          fontSize: '0.76rem',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          lineHeight: 1,
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: current.dot,
          }}
        />
        {text}
      </span>
    );
  }
);
