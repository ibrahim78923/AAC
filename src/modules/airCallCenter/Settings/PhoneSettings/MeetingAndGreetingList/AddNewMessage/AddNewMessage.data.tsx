import {
  RHFAutocomplete,
  RHFDropZone,
  RHFTextField,
} from '@/components/ReactHookForm';

const GENDER_OPTIONS = [
  { _id: '1', label: 'Female' },
  { _id: '2', label: 'Male' },
];

const LANGUAGE_OPTIONS = [
  { _id: '1', label: 'Chinese' },
  { _id: '2', label: 'Portuguese' },
  { _id: '11', label: 'English' },
  { _id: '21', label: 'Hindi' },
  { _id: '12', label: 'Arabic' },
];

export const addNewMessageFormDefaultValues: any = () => {
  return {
    0: {
      messageName: '',
      message: '',
      selectVoice: null,
      language: null,
    },
    1: {
      messageName: '',
      file: null,
    },
    2: {
      messageName: '',
      voiceMessage: null,
    },
  };
};

export const addNewMessageFormFieldsDynamic: any = {
  0: [
    {
      id: 1,
      componentProps: {
        name: 'messageName',
        label: 'Message Name',
        fullWidth: true,
        placeholder: 'Air Applecart',
        required: true,
      },
      component: RHFTextField,
    },
    {
      id: 11,
      componentProps: {
        name: 'message',
        label: 'Message',
        fullWidth: true,
        placeholder: 'This business calendar belongs to Chicago timeline',
        required: true,
        multiline: true,
        rows: 3,
      },
      component: RHFTextField,
    },
    {
      id: 12,
      componentProps: {
        name: 'selectVoice',
        label: 'Select Voice',
        fullWidth: true,
        required: true,
        options: GENDER_OPTIONS,
        getOptionLabel: (option: any) => option?.label,
      },
      component: RHFAutocomplete,
    },
    {
      id: 22,
      componentProps: {
        name: 'language',
        label: 'Language',
        fullWidth: true,
        required: true,
        options: LANGUAGE_OPTIONS,
        getOptionLabel: (option: any) => option?.label,
      },
      component: RHFAutocomplete,
    },
  ],
  1: [
    {
      id: 1,
      componentProps: {
        name: 'messageName',
        label: 'Message Name',
        fullWidth: true,
        placeholder: 'Air Applecart',
        required: true,
      },
      component: RHFTextField,
    },
    {
      id: 12,
      componentProps: {
        name: 'file',
        maxSize: 1024 * 1024 * 2.44,
        fileType: 'MP3 , WAV, MP4  (max 2.44 MB)',
        accept: {
          'audio/mpeg': ['.mp3'],
          'audio/wav': ['.wav'],
          'video/mp4': ['.mp4'],
        },
        fullWidth: true,
        required: true,
      },
      component: RHFDropZone,
    },
  ],
  2: [
    {
      id: 1,
      componentProps: {
        name: 'messageName',
        label: 'Message Name',
        fullWidth: true,
        placeholder: 'Air Applecart',
        required: true,
      },
      component: RHFTextField,
    },
  ],
};
