import { AIR_CALL_CENTER } from '@/routesConstants/paths';

export const CallCenterSettingsRoutes: any = [
  {
    key: AIR_CALL_CENTER?.SETTINGS?.PHONE_NUMBER,
    label: 'Phone Number',
    role: 'AIR_CALL_CENTER',
    permissions: [],
  },

  {
    key: 'phone-settings',
    label: 'Phone Settings',
    role: 'AIR_CALL_CENTER',
    permissions: [],
    textNames: [
      {
        key: AIR_CALL_CENTER?.SETTINGS?.CALL_WORKFLOW,
        label: 'Call Workflow',
        permissions: [],
      },
      {
        key: AIR_CALL_CENTER?.SETTINGS?.GREETING_LIST,
        label: 'Message & Greeting List',
        permissions: [],
      },
      {
        key: AIR_CALL_CENTER?.SETTINGS?.SERVICE_LEVEL,
        label: 'Service Level',
        permissions: [],
      },
      {
        key: AIR_CALL_CENTER?.SETTINGS?.VOICE_MAILS,
        label: 'Voice Mails',
        permissions: [],
      },
      {
        key: AIR_CALL_CENTER?.SETTINGS?.ADDITIONAL_SETTINGS,
        label: 'Additional Settings',
        permissions: [],
      },
    ],
  },

  {
    key: 'general-settings',
    label: 'General Settings',
    role: 'AIR_CALL_CENTER',
    permissions: [],
    textNames: [
      {
        key: AIR_CALL_CENTER?.SETTINGS?.BUSINESS_HOURS,
        label: 'Business Hours',
        permissions: [],
      },
      {
        key: AIR_CALL_CENTER?.SETTINGS?.AGENT_STATUSES,
        label: 'Agent Statuses',
        permissions: [],
      },
    ],
  },

  {
    key: AIR_CALL_CENTER?.SETTINGS?.USER_MANAGEMENT,
    label: 'User Management',
    role: 'AIR_CALL_CENTER',
    permissions: [],
  },

  {
    key: AIR_CALL_CENTER?.SETTINGS?.PHONE_CREDITS,
    label: 'Phone Credits',
    role: 'AIR_CALL_CENTER',
    permissions: [],
  },
];
