import {
  RHFDropZone,
  RHFEditor,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { CANNED_RESPONSES } from '@/constants/strings';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
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
  availableFor: Yup?.string()?.trim()?.required('Availability is Required'),
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
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'message',
      label: 'Message',
      required: true,
      style: {
        height: '12rem',
      },
    },
    component: RHFEditor,
  },
  {
    id: 3,
    avatarGroup: true,
    componentProps: {
      name: 'availableFor',
      label: 'Available for:',
      options: availableForOptions,
      required: true,
      onClick: (e: any) => {
        if (e?.target?.value === CANNED_RESPONSES?.SELECT_AGENTS) {
          setOpenSelectAgentsModal(true);
        }
      },
    },
    component: RHFRadioGroup,
  },
  {
    id: 4,
    componentProps: {
      name: 'folder',
      label: 'Folder',
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    componentProps: {
      name: 'fileUrl',
      label: 'Attach a file',
      disabled: hasAttachment,
      fileType: `PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`,
      accept: {
        'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
        'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
        'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
      },
    },
    component: RHFDropZone,
  },
];
