import { useState } from 'react';
import {
  MEETINGS_SETTINGS_MODULES,
  meetingSettingsDataDynamic,
} from './Settings.data';
import { useRouter } from 'next/router';
import { CalendarIntegration } from '../CalendarIntegration';
import { VideoConferencing } from '../VideoConferencing';
import { OtherSettings } from '../OtherSettings';

export const useSettings = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState(
    MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION,
  );
  const meetingSettingsData: any = meetingSettingsDataDynamic(
    setActiveModule,
    activeModule,
  );
  const renderSettingsModule = {
    [MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION]: <CalendarIntegration />,
    [MEETINGS_SETTINGS_MODULES?.VIDEO_CONFERENCING]: <VideoConferencing />,
    [MEETINGS_SETTINGS_MODULES?.OTHER_SETTINGS]: <OtherSettings />,
  };

  return {
    meetingSettingsData,
    activeModule,
    renderSettingsModule,
    router,
  };
};
