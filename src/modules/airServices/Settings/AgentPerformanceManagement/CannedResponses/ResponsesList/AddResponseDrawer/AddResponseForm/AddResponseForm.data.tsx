import {
  RHFDropZone,
  RHFEditor,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const addResponseValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Field is Required'),
  message: Yup?.string(),
});

export const addResponseDefaultValues = {
  title: '',
  folder: 'Personal',
  message: '',
  attachFile: '',
};
export const addResponseDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Responses Title',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'message',
      label: 'Message',
      fullWidth: true,
      required: true,
      style: {
        height: '200px',
      },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    componentProps: {
      name: 'availableFor',
      label: 'Available For:',
      fullWidth: true,
      avatarGroup: true,
      options: [
        {
          label: 'My Self',
          value: 'mySelf',
        },
        {
          label: 'All Agents',
          value: 'allAgents',
        },
        {
          label: 'Select Agents',
          value: 'selectAgents',
        },
      ],
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    componentProps: {
      name: 'folder',
      label: 'Folder',
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
    md: 12,
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
