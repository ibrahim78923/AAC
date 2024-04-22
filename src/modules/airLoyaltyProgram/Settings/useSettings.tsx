import { useState } from 'react';
import { SETTINGS_MODULES, settingsDataDynamic } from './Settings.data';
import Management from './management';
import { General } from './General';

export const useSettings = () => {
  const [activeModule, setActiveModule] = useState(SETTINGS_MODULES?.GENERAL);
  const settingsData: any = settingsDataDynamic(setActiveModule, activeModule);
  const renderSettingsModule = {
    [SETTINGS_MODULES?.GENERAL]: <General />,
    [SETTINGS_MODULES?.SHOP_AND_PROFILES]: <Management />,
  };

  return {
    settingsData,
    activeModule,
    renderSettingsModule,
  };
};
