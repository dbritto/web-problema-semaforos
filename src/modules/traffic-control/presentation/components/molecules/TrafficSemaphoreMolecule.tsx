import {
  DumbComponentProps,
  defineDumbComponent,
} from '@shared/presentation/contracts/ComponentContracts';
import { TrafficPhaseColor } from '../../../domain/value-objects/LightPhase';
import { SignalBulbAtom } from '../atoms/SignalBulbAtom';

export interface TrafficSemaphoreMoleculeData {
  activeColor: TrafficPhaseColor;
  durationSeconds: number;
}

export type TrafficSemaphoreMoleculeProps = DumbComponentProps<TrafficSemaphoreMoleculeData>;

/**
 * MOLÉCULA DEL MÓDULO (Dumb Component): TrafficSemaphoreMolecule
 * Cabezal semafórico LED con contador digital monoespaciado de alta visibilidad.
 */
export const TrafficSemaphoreMolecule = defineDumbComponent<TrafficSemaphoreMoleculeProps>(
  'molecule',
  'traffic-control',
  ({ activeColor, durationSeconds }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(5, 8, 20, 0.92)',
          border: '1px solid rgba(148, 163, 184, 0.28)',
          padding: '10px 18px',
          borderRadius: '9999px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.45)',
        }}
      >
        <SignalBulbAtom color="RED" active={activeColor === 'RED'} />
        <SignalBulbAtom color="YELLOW" active={activeColor === 'YELLOW'} />
        <SignalBulbAtom color="GREEN" active={activeColor === 'GREEN'} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            color: '#f8fafc',
            fontSize: '0.95rem',
            fontWeight: 700,
            marginLeft: '6px',
            paddingLeft: '10px',
            borderLeft: '1px solid rgba(148, 163, 184, 0.25)',
          }}
        >
          {durationSeconds}s
        </span>
      </div>
    );
  }
);
