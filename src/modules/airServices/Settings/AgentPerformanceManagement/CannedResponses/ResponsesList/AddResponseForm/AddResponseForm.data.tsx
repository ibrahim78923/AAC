import {
  RHFDropZone,
  RHFEditor,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
const availableForOptions = [
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
];
export const AVAILABLE_FOR = 'availableFor';
export const SELECT_AGENTS = 'selectAgents';
export const addResponseValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Field is Required'),
  message: Yup?.string(),
});

export const addResponseDefaultValues = {
  title: '',
  folder: 'Personal',
  message: '',
  attachFile: '',
  availableFor: '',
};
export const addResponseDataArray = [
  {
    id: 1,
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
    id: 5,
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
    id: 4,
    componentProps: {
      name: 'availableFor',
      label: 'Available For:',
      fullWidth: true,
      avatarGroup: true,
      options: availableForOptions,
    },
    component: RHFRadioGroup,
    md: 12,
  },
  {
    id: 3,
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
    id: 2,
    componentProps: {
      name: 'attachFile',
      label: 'Attach a File',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
