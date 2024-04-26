import { RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const callActionsValidationSchema = Yup.object().shape({
  businessHours: Yup.string()?.required('Field Required'),
  actionDuringBusinessHours: Yup.string()?.required('Field Required'),
  ActionOutsideBusinessHours: Yup.string()?.required('Field Required'),
  ActionDuringHolidays: Yup.string()?.required('Field Required'),
  allowedFor: Yup.string()?.required('Field Required'),
});

export const callActionsDefaultValues = {
  businessHours: '',
  actionDuringBusinessHours: '',
  ActionOutsideBusinessHours: '',
  ActionDuringHolidays: '',
  allowedFor: '',
};

export const callActionsArray = [
  {
    componentProps: {
      name: 'businessHours',
      label: 'Business Hours',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'allTime', label: '24*7' },
      { value: 'asiaBusiness', label: 'Asia Business Hours' },
      { value: 'us&canada', label: 'US & Canada' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'actionDuringBusinessHours',
      label: 'Action (During Business Hours)',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'callQueue', label: 'Send To Call Queue' },
      { value: 'agentExtension', label: 'Send To Agent Extension' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'ActionOutsideBusinessHours',
      label: 'Action (outside business hours)',
      required: true,
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'voicemail', label: 'Send To Voicemail' },
      { value: 'callQueue', label: 'Send To Another Call Queue' },
      { value: 'hangUp', label: 'Hang up' },
      { value: 'agentExtension', label: 'Send to Agent Extension' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'ActionDuringHolidays',
      label: 'Action (during holidays)',
      required: true,
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'voiceMail', label: 'Send To Voicemail' },
      { value: 'hangUp', label: 'Hang Up' },
      { value: 'agentExtension', label: 'Send To Agent Extension' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'allowedFor',
      label: 'Allowed For',
      required: true,
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'wilson', label: 'Jenny Wilson' },
      { value: 'floyd', label: 'Floyd Miles' },
    ],
    component: RHFSelect,
    md: 12,
  },
];
