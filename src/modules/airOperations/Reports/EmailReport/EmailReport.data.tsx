import {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { pxToRem } from '@/utils/getFontValue';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const emailReportValidationSchema = Yup?.object()?.shape({
  recipients: Yup?.array()
    ?.of(Yup?.string())
    ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
      if (!value || value?.length === SELECTED_ARRAY_LENGTH?.ZERO) {
        return false;
      }
      return value?.every(
        (email) => Yup?.string()?.email()?.isValidSync(email),
      );
    }),
  subject: Yup?.string()?.trim()?.required('Subject is required'),
  html: Yup?.string()?.trim()?.required('Message is required'),
});

export const emailReportDefaultValues = (data?: any) => {
  return {
    recipients: !!data?.recipients?.length ? data?.recipients : [],
    subject: data?.subject ?? '',
    html: data?.html ?? '',
    sender: data?.sender ?? '',
  };
};

export const emailReportFormFields = [
  {
    id: 1,
    componentProps: {
      name: 'sender',
      label: 'From',
      placeholder: 'Enter Recipients',
      required: true,
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 2,
    componentProps: {
      name: 'recipients',
      label: 'To',
      placeholder: 'Enter Recipients and press enter',
      required: true,
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    componentProps: {
      name: 'subject',
      label: 'Email subject',
      placeholder: 'add Subject Line',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'html',
      label: 'Message',
      required: true,
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
];
