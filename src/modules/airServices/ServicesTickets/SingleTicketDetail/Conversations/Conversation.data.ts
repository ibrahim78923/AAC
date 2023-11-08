import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const conversationModelsValidation = Yup.object().shape({
  title: Yup.string().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
  file: Yup.mixed().required('Field is Required'),
});

export const conversationModelsDefaultValues = {
  title: '', //01
  description: '', //2
  file: '', //3
};

export const conversationModelsArray = [
  {
    componentProps: {
      name: 'title',
      label: 'To',
      fullWidth: true,
    },
    options: [{ value: 'BE', label: 'BE' }],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
    mb: '12px',
  },

  {
    componentProps: {
      name: 'attachFile',
      label: 'Attach a File',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const menuOptionsAddconversation = [
  { value: 'Note', label: 'Note' },
  { value: 'Reply', label: 'Reply' },
  { value: 'Forward', label: 'Forward' },
  { value: 'Discuss', label: 'Discuss' },
];
