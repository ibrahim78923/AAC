import {
  RHFDropZone,
  RHFEditor,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { CANNED_RESPONSES } from '@/constants/strings';
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
  title: Yup?.string()
    ?.trim()
    ?.max(30, 'Title up to 30 characters')
    ?.required('Title is Required'),
  message: Yup?.string()?.trim()?.required('Message is Required'),
  fileUrl: Yup?.mixed()?.nullable(),
  availableFor: Yup?.string()?.trim(),
});

export const addResponseDefaultValues: any = (folderName: any, data?: any) => {
  return {
    title: data?.title ?? '',
    folder: folderName,
    message: data?.message ?? '',
    fileUrl: null,
    availableFor: data?.availableFor ?? '',
  };
};

export const addResponseDataArray = (
  setOpenSelectAgentsModal: any,
  hasAttachment: any,
) => [
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
      options: availableForOptions,
      onClick: (e: any) => {
        if (e?.target?.value === CANNED_RESPONSES?.SELECT_AGENTS) {
          setOpenSelectAgentsModal(true);
        }
      },
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
      fullWidth: true,
      disabled: hasAttachment,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: 1024 * 1024 * 2.44,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const stringAvatar = (name: string) => {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};
