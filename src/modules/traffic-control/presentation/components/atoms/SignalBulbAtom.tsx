import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import { TrafficPhaseColor } from '../../../domain/value-objects/LightPhase';

export interface SignalBulbAtomData {
  color: TrafficPhaseColor;
  active: boolean;
}

export type SignalBulbAtomProps = DumbComponentProps<SignalBulbAtomData>;

/**
 * ÁTOMO DEL MÓDULO (Dumb Component): SignalBulbAtom
 * Foco LED semafórico con halo de luz neón pulsante.
 */
export const SignalBulbAtom = defineDumbComponent<SignalBulbAtomProps>(
  'atom',
  'traffic-control',
  ({ color, active }) => {
    const colorMap: Record<TrafficPhaseColor, string> = {
      RED: '#ff3366',
      YELLOW: '#ffb800',
      GREEN: '#00f5a0',
    };

    return (
      <span
        aria-label={`Luz ${color} ${active ? 'encendida' : 'apagada'}`}
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: active ? colorMap[color] : 'rgba(30, 41, 59, 0.9)',
          border: active ? `2px solid #ffffff` : '1px solid rgba(148, 163, 184, 0.25)',
          boxShadow: active
            ? `0 0 18px ${colorMap[color]}, 0 0 34px ${colorMap[color]}88`
            : 'inset 0 2px 4px rgba(0,0,0,0.6)',
          opacity: active ? 1 : 0.35,
          transform: active ? 'scale(1.12)' : 'scale(1)',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    );
  }
);
