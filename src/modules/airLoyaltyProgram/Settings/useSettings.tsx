import { useState } from 'react';
import { SETTINGS_MODULES, settingsDataDynamic } from './Settings.data';
import Management from './management';
import Loyalty from './Modules/Loyalty';

export const useSettings = () => {
  const [activeModule, setActiveModule] = useState(SETTINGS_MODULES?.GENERAL);
  const settingsData: any = settingsDataDynamic(setActiveModule, activeModule);
  const renderSettingsModule = {
    [SETTINGS_MODULES?.GENERAL]: 'g',
    [SETTINGS_MODULES?.SHOP_AND_PROFILES]: <Management />,
    [SETTINGS_MODULES?.GIFTCARD]: 'gift',
    [SETTINGS_MODULES?.LOYALTY]: <Loyalty />,
  };

  return {
    settingsData,
    activeModule,
    renderSettingsModule,
  };
};
