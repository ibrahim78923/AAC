import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const basicIvrValidationSchema = Yup.object().shape({
  ivrMenuName: Yup.string(),
  playMessage: Yup.string(),
  afterNRepeat: Yup.string(),
  ifNotValid: Yup.string(),
});

export const basicIvrDefaultValues = {
  ivrMenuName: '',
  playMessage: '',
  afterNRepeat: '',
  ifNotValid: '',
};

export const basicIvrArray = [
  {
    componentProps: {
      name: 'ivrMenuName',
      label: 'IVR Menu Name',
      placeholder: 'IVR2',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'playMessage',
      label: 'Play Message',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6,
  },
  {
    componentProps: {
      name: 'afterNRepeat',
      label: 'After N Repeats',
      placeholder: '3',
      fullWidth: true,
      select: false,
      required: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'ifNotValid',
      label: 'If Not Valid Input',
      fullWidth: true,
      select: true,
      required: true,
    },
    options: [
      { value: 'welcome', label: 'welcome message' },
      { value: 'voicemail', label: 'voicemail message' },
      { value: 'hangup', label: 'hang up message' },
      { value: 'callback', label: 'call back message' },
    ],
    component: RHFSelect,
    md: 6,
  },
];
