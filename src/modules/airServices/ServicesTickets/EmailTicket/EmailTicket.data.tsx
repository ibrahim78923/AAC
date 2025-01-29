import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { pxToRem } from '@/utils/getFontValue';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const sendTicketEmailFormValidationSchema = Yup?.object()?.shape({
  recipients: Yup?.array()
    ?.of(Yup?.string())
    ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
      if (!value || value?.length === SELECTED_ARRAY_LENGTH?.ZERO) {
        return false;
      }
      return value.every((email) => Yup?.string().email().isValidSync(email));
    }),
  subject: Yup?.string()?.trim()?.required('Subject is required'),
  html: Yup?.string()?.trim()?.required('Note is required'),
});

export const sendTicketEmailFormDefaultValues = {
  recipients: [],
  subject: '',
  html: '',
};

export const sendTicketEmailFormFields = [
  {
    _id: 1,
    componentProps: {
      name: 'recipients',
      label: 'To',
      placeholder: 'Write recipients email and press enter',
      required: true,
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
  {
    _id: 2,
    componentProps: {
      name: 'subject',
      label: 'Subject',
      placeholder: 'Write a subject',
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 3,
    componentProps: {
      name: 'html',
      label: 'Note',
      placeholder: 'Write a note',
      required: true,
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
];
