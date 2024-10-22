import { RHFEditor } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { ApprovalsUsersFieldDropdown } from '../../../ServiceTicketFormFields/ApprovalsUsersFieldDropdown';
import { pxToRem } from '@/utils/getFontValue';
import { REGEX } from '@/constants/validation';

export const addRequestApprovalValidationSchema = Yup?.object()?.shape({
  subject: Yup?.mixed()?.nullable()?.required('User is required'),
  description: Yup?.string()
    ?.trim()
    ?.required('Description is required')
    ?.test('is-not-empty', 'Description is required', (value) => {
      const strippedContent = value
        ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
        ?.trim();
      return strippedContent !== '';
    }),
});

export const addRequestApprovalFormDefaultValues = {
  subject: null,
  description: '',
};

export const addRequestApprovalFormFieldsDynamic = () => [
  {
    _id: 1,
    component: ApprovalsUsersFieldDropdown,
  },
  {
    _id: 2,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
];
