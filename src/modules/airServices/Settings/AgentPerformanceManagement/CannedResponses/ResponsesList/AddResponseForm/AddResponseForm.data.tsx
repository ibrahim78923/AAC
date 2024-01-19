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
    value: 'MY_SELF',
  },
  {
    label: 'All Agents',
    value: 'ALL_AGENTS',
  },
  {
    label: 'Select Agents',
    value: 'SELECTED',
  },
];

export const addResponseValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  message: Yup?.string()?.required('Required'),
  fileUrl: Yup?.mixed()?.required('Required'),
  availableFor: Yup?.string()?.required('Required'),
});

export const addResponseDefaultValues: any = (folderName: any, data?: any) => {
  return {
    title: data?.title ?? '',
    folder: folderName,
    message: data?.message ?? '',
    fileUrl: data?.attachments ?? null,
    availableFor: data?.availableFor ?? '',
  };
};

export const addResponseDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'title',
      label: 'Responses title',
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
        height: '12rem',
      },
    },
    component: RHFEditor,
    md: 12,
  },
  {
    id: 4,
    componentProps: {
      name: 'availableFor',
      label: 'Available for:',
      fullWidth: true,
      avatarGroup: true,
      required: true,
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
      name: 'fileUrl',
      label: 'Attach a file',
      required: true,
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};
