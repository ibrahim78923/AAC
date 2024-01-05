import {
  RHFButtonGroup,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { ZoomLogoImage, TeamsLogoImage } from '@/assets/images';

export const addEmailValidationSchema = Yup?.object()?.shape({
  to: Yup?.string()?.required('Field is Required'),
  subject: Yup?.string()?.required('Field is Required'),
  addVideoConferencing: Yup?.string(),
});

export const addEmailDefaultValues = {
  to: '',
  subject: '',
  addVideoConferencing: '',
};

export const addEmailDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'to',
      label: 'To',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },

  {
    id: 3,
    componentProps: {
      name: 'addVideoConferencing',
      label: 'Add Video Conferencing',
    },
    buttonGroup: true,
    options: [
      { value: 'gmail', label: 'Gmail', img: ZoomLogoImage },
      {
        value: 'microsoftOutlook',
        label: 'Microsoft Outlook',
        img: TeamsLogoImage,
      },
      { value: 'others', label: 'Others', img: ZoomLogoImage },
    ],
    component: RHFButtonGroup,
    md: 12,
  },

  {
    id: 4,
    componentProps: {
      name: 'meetingNotes',
      label: 'Meeting Notes',
      fullWidth: true,
    },
    component: RHFEditor,
    md: 12,
  },
];
