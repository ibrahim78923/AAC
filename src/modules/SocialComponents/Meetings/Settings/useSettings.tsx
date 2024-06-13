import { useState, useMemo } from 'react';
import {
  MEETINGS_SETTINGS_MODULES,
  meetingSettingsDataDynamic,
} from './Settings.data';
import { useRouter } from 'next/router';
import { CalendarIntegration } from '../CalendarIntegration';
import { OtherSettings } from '../OtherSettings';
import { VideoConferencing } from '../VideoConferencing';

export const useSettings = () => {
  const router = useRouter();
  const { module } = router?.query;

  const initialModule =
    module || MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION;

  const [activeModule, setActiveModule] = useState(initialModule);

  const meetingSettingsData = meetingSettingsDataDynamic((newModule: any) => {
    setActiveModule(newModule);
    router?.push(
      {
        pathname: router?.pathname,
        query: { module: newModule },
      },
      undefined,
      { shallow: true },
    );
  }, activeModule);

  const renderSettingsModule = useMemo(
    () => ({
      [MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION]: (
        <CalendarIntegration />
      ),
      [MEETINGS_SETTINGS_MODULES?.VIDEO_CONFERENCING]: <VideoConferencing />,
      [MEETINGS_SETTINGS_MODULES?.OTHER_SETTINGS]: <OtherSettings />,
    }),
    [],
  );

  return {
    meetingSettingsData,
    activeModule,
    renderSettingsModule,
    router,
  };
};
