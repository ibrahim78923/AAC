import { PHONE_SETTINGS } from '@/routesConstants/paths';

export const workflowCardArr = [
  {
    title: 'Call Queue',
    desc: 'Set up seamless call quote with welcome messages, agent assignment rules.',
    link: PHONE_SETTINGS?.CALL_QUEUE,
  },
  {
    title: 'Basic IVR',
    desc: 'Set up IVR to route calls to the right agent/team based on single digit keypress inputs',
    link: PHONE_SETTINGS?.BASIC_IVR,
  },
  {
    title: 'Agent extension flow',
    desc: 'Setup extensions to connect callers with specific agents of their choice.',
    link: PHONE_SETTINGS?.AGENT_EXT,
  },
];
