import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const propertiesValidationSchema = Yup.object().shape({
  companyName: Yup.string()?.required('Field Required'),
  name: Yup.string()?.required('Field Required'),
  recordType: Yup.string()?.required('Field Required'),
  customHoldMessage: Yup.string()?.required('Field Required'),
  customRingtone: Yup.string()?.required('Field Required'),
  shortAbandon: Yup.string()?.required('Field Required'),
});

export const propertiesDefaultValues = {
  companyName: 'UK',
  name: '',
  recordType: '',
  customHoldMessage: '',
  customRingtone: '',
  shortAbandon: '',
};

export const propertiesArray = [
  {
    componentProps: {
      name: 'companyName',
      label: 'Company Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'name',
      label: 'Name',
      required: true,
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'recordType',
      label: 'Record Type',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'notRecord', label: 'Do not record calls' },
      { value: 'allCalls', label: 'record all calls' },
      { value: 'incomingCalls', label: 'record incoming calls' },
      { value: 'outgoingCalls', label: 'record outgoing calls' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'recording-opt',
      label: 'Enable recording opt-in',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      name: 'customHoldMessage',
      label: 'Custom Hold Message',
      fullWidth: true,
      required: true,
      select: true,
    },
    options: [
      { value: 'welcomeMessage', label: 'Welcome Message' },
      { value: 'voiceMailMessage', label: 'Voice Mail Message' },
      { value: 'hangUpMessage', label: 'Hang Up Message' },
      { value: 'callBackMessage', label: 'Call Back Message' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'customRingtone',
      label: 'Custom Ringtone',
      required: true,
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'welcomeMessage', label: 'Welcome Message' },
      { value: 'voiceMailMessage', label: 'Voice Mail Message' },
      { value: 'hangUpMessage', label: 'Hang Up Message' },
      { value: 'callBackMessage', label: 'Call Back Message' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'maskNumber',
      label: 'Mask Number',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      name: 'voiceMailTranscript',
      label: 'Voice Mail Transcript',
    },
    component: RHFSwitch,
    md: 12,
  },
  {
    componentProps: {
      name: 'shortAbandon',
      label: 'Short Abandon ',
      required: true,
      fullWidth: true,
      placeholder: 'Enter short Abandon',
    },
    component: RHFTextField,
    md: 12,
  },
];
