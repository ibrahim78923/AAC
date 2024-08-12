import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { pxToRem } from '@/utils/getFontValue';
import { Box } from '@mui/material';

export const addEmailValidationSchema = Yup?.object()?.shape({
  recipients: Yup?.array()
    ?.of(Yup?.string())
    ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
      if (!value || value.length === 0) {
        return false; // 'To is Required' error message will be triggered
      }
      return value.every((email) => Yup?.string().email().isValidSync(email));
    }),
  subject: Yup?.string()?.trim()?.required('Subject is Required'),
  html: Yup?.string()?.trim()?.required('Note is Required'),
});

export const addEmailDefaultValues = {
  recipients: [],
  subject: '',
  html: '',
};

export const addEmailDataArray = [
  {
    id: 1,
    componentProps: {
      name: 'recipients',
      label: 'To',
      placeholder: 'Enter Recipients',
      required: true,
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
      endAdornment: <Box color={'grey.900'}>From CC BCC</Box>,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'Write a Subject Line',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      name: 'html',
      label: 'Note',
      required: true,
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
];
