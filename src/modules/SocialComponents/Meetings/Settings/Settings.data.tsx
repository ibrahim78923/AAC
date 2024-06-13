import { Typography } from '@mui/material';

export const MEETINGS_SETTINGS_MODULES = {
  CALENDAR_INTEGRATION: 'Calendar Integration',
  VIDEO_CONFERENCING: 'Video Conferencing',
  OTHER_SETTINGS: 'Other Settings',
};

export const meetingSettingsDataDynamic = (
  setActiveModule: any,
  activeModule: any,
) => [
  {
    id: 2,
    componentProps: {
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
      sx: {
        cursor: 'pointer',
        color:
          activeModule === MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION
            ? 'slateBlue.main'
            : 'grey.900',
        fontWeight:
          activeModule === MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION
            ? 600
            : 500,
      },
      onClick: () =>
        setActiveModule(MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION),
    },
    heading: MEETINGS_SETTINGS_MODULES?.CALENDAR_INTEGRATION,
    component: Typography,
  },
  {
    id: 3,
    componentProps: {
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
      sx: {
        cursor: 'pointer',
        color:
          activeModule === MEETINGS_SETTINGS_MODULES?.VIDEO_CONFERENCING
            ? 'slateBlue.main'
            : 'grey.900',
        fontWeight:
          activeModule === MEETINGS_SETTINGS_MODULES?.VIDEO_CONFERENCING
            ? 600
            : 500,
      },
      onClick: () =>
        setActiveModule(MEETINGS_SETTINGS_MODULES?.VIDEO_CONFERENCING),
    },
    heading: MEETINGS_SETTINGS_MODULES?.VIDEO_CONFERENCING,
    component: Typography,
  },
  {
    id: 4,
    componentProps: {
      variant: 'body2',
      padding: 0.5,
      borderRadius: 1,
      marginY: 1.5,
      sx: {
        cursor: 'pointer',
        color:
          activeModule === MEETINGS_SETTINGS_MODULES?.OTHER_SETTINGS
            ? 'slateBlue.main'
            : 'grey.900',
        fontWeight:
          activeModule === MEETINGS_SETTINGS_MODULES?.OTHER_SETTINGS
            ? 600
            : 500,
      },
      onClick: () => setActiveModule(MEETINGS_SETTINGS_MODULES?.OTHER_SETTINGS),
    },
    heading: MEETINGS_SETTINGS_MODULES?.OTHER_SETTINGS,
    component: Typography,
  },
];
