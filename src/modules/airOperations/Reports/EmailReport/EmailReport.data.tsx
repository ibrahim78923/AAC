import {
  RHFAutocomplete,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { pxToRem } from '@/utils/getFontValue';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { FILE_MAX_SIZE } from '@/config';
import { EmailReportDataDefaultValuesI } from './EmailReport.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { REGEX } from '@/constants/validation';

const { ZERO } = SELECTED_ARRAY_LENGTH ?? {};

export const emailReportValidationSchema = Yup?.object()?.shape({
  recipients: Yup?.array()
    ?.of(Yup?.string())
    ?.test('is-emails-valid', 'Enter valid email formats', function (value) {
      if (!value || value?.length === ZERO) {
        return false;
      }
      return value?.every(
        (email) => Yup?.string()?.email()?.isValidSync(email),
      );
    }),
  subject: Yup?.string()?.trim()?.required('Subject is required'),
  html: Yup?.string()
    ?.trim()
    ?.required('Message is required')
    ?.test('is-not-empty', 'Message is required', (value) => {
      const strippedContent = value
        ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
        ?.trim();
      return strippedContent !== '';
    }),
  attachments: Yup?.mixed()?.nullable()?.required('Attachment is required'),
});

export const emailReportDefaultValues = (
  data?: EmailReportDataDefaultValuesI,
) => {
  return {
    recipients: !!data?.recipients?.length ? data?.recipients : [],
    subject: data?.subject ?? '',
    html: data?.html ?? '',
    sender: data?.sender ?? '',
    attachments: null,
  };
};

export const emailReportFormFields: ReactHookFormFieldsI[] = [
  {
    _id: 1,
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
    _id: 2,
    componentProps: {
      name: 'recipients',
      label: 'To',
      placeholder: 'Enter recipients and press enter',
      required: true,
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
  {
    _id: 3,
    componentProps: {
      name: 'subject',
      label: 'Email subject',
      placeholder: 'Add subject',
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 4,
    componentProps: {
      name: 'html',
      label: 'Message',
      placeholder: 'Type your message',
      required: true,
      style: { height: pxToRem(200) },
    },
    component: RHFEditor,
  },
  {
    _id: 5,
    componentProps: {
      name: 'attachments',
      label: 'Attach Report',
      fullWidth: true,
      required: true,
      fileName: 'Attach the report',
      fileType: `PDF only (max ${
        FILE_MAX_SIZE?.ATTACH_FILE_MAX_SIZE / (1024 * 1024)
      } MB)`,
      accept: {
        'application/pdf': ['.pdf'],
      },
    },
    component: RHFDropZone,
  },
];
