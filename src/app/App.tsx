import React from 'react';
import { TrafficControlSmartContainer } from '@modules/traffic-control/presentation/containers/TrafficControlSmartContainer';
import { trafficControlModuleContainer } from './di/container';

export const App: React.FC = () => {
  return <TrafficControlSmartContainer useCases={trafficControlModuleContainer} />;
};
