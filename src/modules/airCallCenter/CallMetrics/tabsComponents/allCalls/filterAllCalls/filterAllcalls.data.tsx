import { RHFAutocomplete } from '@/components/ReactHookForm';
import { TIME_PERIODS } from '@/constants/services';
import {
  AGENTS_LIST,
  CALL_DIRECTION,
  CALL_TAGS,
  CALL_TYPES,
  CONTRACT,
} from '@/constants/strings';

export const virtualNumbersOptions = [
  {
    _id: '+44 123 456 78',
    label: '+44 123 456 78',
  },
  {
    _id: '+44 589 456 78',
    label: '+44 123 456 78',
  },
  {
    _id: '+44 589 163 20',
    label: '+44 589 163 20',
  },
];

const callTypesOptions = [
  { _id: CALL_TYPES?.ANSWERED, label: CALL_TYPES?.ANSWERED },
  {
    _id: CALL_TYPES?.MISSED,
    label: CALL_TYPES?.MISSED,
  },
  { _id: CALL_TYPES?.ABANDONED, label: CALL_TYPES?.ABANDONED },
  { _id: CALL_TYPES?.VOICEMAIL, label: CALL_TYPES?.VOICEMAIL },
];

const timePeriodOptions = [
  {
    _id: TIME_PERIODS?.TODAYS,
    label: TIME_PERIODS?.TODAYS,
  },
  {
    _id: TIME_PERIODS?.YESTERDAYS,
    label: TIME_PERIODS?.YESTERDAYS,
  },
  {
    _id: TIME_PERIODS?.SEVEN_DAYS,
    label: TIME_PERIODS?.SEVEN_DAYS,
  },
  {
    _id: TIME_PERIODS?.THIRTY_DAYS,
    label: TIME_PERIODS?.THIRTY_DAYS,
  },
  {
    _id: TIME_PERIODS?.CUSTOM_RANGE,
    label: TIME_PERIODS?.CUSTOM_RANGE,
  },
];
const callTagsOptions = [
  { _id: CALL_TAGS?.SALES, label: CALL_TAGS?.SALES },
  { _id: CALL_TAGS?.MARKETING, label: CALL_TAGS?.MARKETING },
  { _id: CALL_TAGS?.CALL_BACK, label: CALL_TAGS?.CALL_BACK },
  { _id: CALL_TAGS?.FIRST_CALL, label: CALL_TAGS?.FIRST_CALL },
];
export const callDirectionOption = [
  { _id: CALL_DIRECTION?.INCOMING, label: CALL_DIRECTION?.INCOMING },
  { _id: CALL_DIRECTION?.OUTGOING, label: CALL_DIRECTION?.OUTGOING },
];
export const contactsOption = [
  { _id: CONTRACT?.SAVANNAH_NGUYEN, label: CONTRACT?.SAVANNAH_NGUYEN },
  { _id: CONTRACT?.KRISTIN_WATSON, label: CONTRACT?.KRISTIN_WATSON },
  { _id: CONTRACT?.ANNETTE_BLACK, label: CONTRACT?.ANNETTE_BLACK },
  { _id: CONTRACT?.LESLIE_ALEXANDER, label: CONTRACT?.LESLIE_ALEXANDER },
  { _id: CONTRACT?.JENNY_WILSON, label: CONTRACT?.JENNY_WILSON },
];
export const agentsOption = [
  { _id: AGENTS_LIST?.SAVANNAH_NGUYEN, label: AGENTS_LIST?.SAVANNAH_NGUYEN },
  { _id: AGENTS_LIST?.KRISTIN_WATSON, label: AGENTS_LIST?.KRISTIN_WATSON },
  { _id: AGENTS_LIST?.ANNETTE_BLACK, label: AGENTS_LIST?.ANNETTE_BLACK },
  { _id: AGENTS_LIST?.LESLIE_ALEXANDER, label: AGENTS_LIST?.LESLIE_ALEXANDER },
  { _id: AGENTS_LIST?.JENNY_WILSON, label: AGENTS_LIST?.JENNY_WILSON },
];
export const waitQueueManagementOption = [
  { _id: 'CALLS_MANUALLY_PICKED_UP_BY', label: 'Calls manually picked up by' },
  { _id: 'SUPERVISOR', label: 'Supervisor' },
  {
    _id: 'CALLS_MANUALLY_ASSIGNED_TO_AGENTS',
    label: 'Calls manually assigned to agent',
  },
];
export const queuesOption = [
  { _id: 'GLOBAL', label: 'Global' },
  { _id: 'UK_SUPPORT', label: 'UK Support' },
  { _id: 'CALL_BACK', label: 'Call Back' },
  { _id: 'FIRST_CALL', label: 'First Call' },
];
export const businessHourOption = [
  { _id: 'WITHIN_BUSINESS_HOURS', label: 'Within Business Hours' },
  { _id: 'OUTSIDE_BUSINESS_HOURS', label: 'Outside Business Hours' },
];

export const allcallsFilterFormDefaultValues = () => {
  return {
    virtualNumbers: null,
    timePeriod: null,
    callTypes: null,
    callTags: null,
    callDirection: null,
    contacts: null,
    agents: null,
    waitQueueManagement: null,
    queues: null,
    businessHour: null,
  };
};

export const allcallsFilterFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'virtualNumbers',
      label: 'Virtual Numbers',
      fullWidth: true,
      placeholder: 'select',
      options: virtualNumbersOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'timePeriod',
      label: 'Time Period',
      fullWidth: true,
      placeholder: 'Select',
      options: timePeriodOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'callTypes',
      label: 'Call Types',
      placeholder: 'Select',
      fullWidth: true,
      options: callTypesOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 4,
    componentProps: {
      name: 'callTags',
      label: 'Call Tags',
      placeholder: 'Select',
      fullWidth: true,
      options: callTagsOptions,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 5,
    componentProps: {
      name: 'callDirection',
      label: 'Call Direction',
      placeholder: 'Select',
      fullWidth: true,
      options: callDirectionOption,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 6,
    componentProps: {
      name: 'contacts',
      label: 'Contacts',
      placeholder: 'Select',
      fullWidth: true,
      options: contactsOption,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 7,
    componentProps: {
      name: 'agents',
      label: 'Agents',
      placeholder: 'Select',
      fullWidth: true,
      options: agentsOption,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 8,
    componentProps: {
      name: 'waitQueueManagement',
      label: 'Wait Queue Management',
      placeholder: 'Select',
      fullWidth: true,
      options: waitQueueManagementOption,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 9,
    componentProps: {
      name: 'queues',
      label: 'Queues',
      placeholder: 'Select',
      fullWidth: true,
      options: queuesOption,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
  {
    id: 10,
    componentProps: {
      name: 'businessHour',
      label: 'Business Hour',
      placeholder: 'Select',
      fullWidth: true,
      options: businessHourOption,
      getOptionLabel: (option: any) => option?.label?.replaceAll?.('_', ' '),
    },
    component: RHFAutocomplete,
  },
];
