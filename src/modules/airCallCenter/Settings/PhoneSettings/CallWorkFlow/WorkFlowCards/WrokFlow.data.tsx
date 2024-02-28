import { AIR_CALL_CENTER } from '@/routesConstants/paths';

export const workflowCardArr = [
  {
    title: 'Call Queue',
    desc: 'Set up seamless call quote with welcome messages, agent assignment rules.',
    link: AIR_CALL_CENTER?.SETTINGS?.CALL_QUEUE,
  },
  {
    title: 'Basic IVR',
    desc: 'Set up IVR to route calls to the right agent/team based on single digit keypress inputs',
    link: AIR_CALL_CENTER?.SETTINGS?.BASIC_IVR,
  },
  {
    title: 'Agent extension flow',
    desc: 'Setup extensions to connect callers with specific agents of their choice.',
    link: AIR_CALL_CENTER?.SETTINGS?.AGENT_EXT,
  },
];
