import { useState } from 'react';
import { SETTINGS_MODULES, settingsDataDynamic } from './Settings.data';

export const useSettings = () => {
  const [activeModule, setActiveModule] = useState(SETTINGS_MODULES?.LOYALTY);
  const settingsData: any = settingsDataDynamic(setActiveModule, activeModule);

  return {
    settingsData,
    activeModule,
  };
};
