import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import { BadgeAtomData } from '../atoms/BadgeAtom';

export interface StatCardMoleculeData {
  title: string;
  value: string | number;
  badgeText?: string;
  badgeTone?: BadgeAtomData['tone'];
  subtitle?: string;
}

export type StatCardMoleculeProps = DumbComponentProps<StatCardMoleculeData>;

/**
 * MOLÉCULA COMPARTIDA (Dumb Component): StatCardMolecule
 * Bloque de métrica limpia dentro de la barra oscura (Estilo Creatix / NextWave footer stats).
 */
export const StatCardMolecule = defineDumbComponent<StatCardMoleculeProps>(
  'molecule',
  'shared',
  ({ title, value, badgeText, badgeTone = 'neutral', subtitle, testId }) => {
    const valueColorMap: Record<NonNullable<BadgeAtomData['tone']>, string> = {
      success: '#a3e635',
      warning: '#f97316',
      danger: '#fb7185',
      neutral: '#ffffff',
    };

    return (
      <div
        data-testid={testId}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          borderLeft: '1px solid #2e3036',
          paddingLeft: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.15rem',
              fontWeight: 800,
              color: valueColorMap[badgeTone],
              lineHeight: 1.05,
            }}
          >
            {value}
          </strong>
          {badgeText && (
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                color: '#d1d5db',
              }}
            >
              {badgeText}
            </span>
          )}
        </div>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f3f4f6' }}>{title}</span>
        {subtitle && (
          <span style={{ fontSize: '0.76rem', color: '#9ca3af', lineHeight: 1.35 }}>
            {subtitle}
          </span>
        )}
      </div>
    );
  }
);
