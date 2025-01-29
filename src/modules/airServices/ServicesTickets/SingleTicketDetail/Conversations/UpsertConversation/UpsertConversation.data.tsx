import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import * as Yup from 'yup';
import { TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT } from '../Conversations.data';
import { ConversationResponseType } from '../ConversationResponseType';
import { pxToRem } from '@/utils/getFontValue';
import { REGEX } from '@/constants/validation';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';

const canPopulateRecipients = [
  TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.EDIT_NOTE,
  TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.REPLY,
];

export const NOTE = 'Note';

export const upsertConversationFormDefaultValues = (data?: any) => {
  return {
    type: data?.conversationType ?? '',
    recipients: canPopulateRecipients?.includes(data?.action)
      ? data?.recipients?.[ARRAY_INDEX?.ZERO]
      : '',
    html:
      data?.conversationType ===
      TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT?.REPLY
        ? ''
        : data?.html ?? '',
    attachments: null,
    from: data?.from ?? '',
  };
};

export const upsertConversationFormValidationSchema = Yup?.object()?.shape({
  type: Yup?.string()?.trim()?.required(''),
  recipients: Yup?.string()
    ?.email('Invalid email format')
    ?.required('Recipient is required'),
  html: Yup?.string()
    ?.trim()
    ?.required('Description is required')
    ?.test('is-not-empty', 'Description is required', (value) => {
      const strippedContent = value
        ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
        ?.trim();
      return strippedContent !== '';
    }),
});

export const upsertConversationFormFieldsDynamic = (portalAction: string) => [
  {
    _id: 1,
    componentProps: {
      name: 'type',
      label: portalAction?.includes(NOTE) ? NOTE : portalAction,
      fullWidth: true,
      disabled: true,
    },
    component: RHFTextField,
  },
  ...(!portalAction?.includes(NOTE)
    ? [
        {
          _id: 2,
          componentProps: {
            name: 'from',
            label: 'From',
            fullWidth: true,
            required: true,
            disabled: true,
          },
          component: RHFTextField,
        },
      ]
    : []),
  {
    _id: 3,
    componentProps: {
      name: 'recipients',
      label: portalAction?.includes(NOTE) ? 'Notify to' : `${portalAction} to`,
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    _id: 4,
    componentProps: {
      name: 'html',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    _id: 6,
    component: ConversationResponseType,
  },
  {
    _id: 5,
    componentProps: {
      name: 'attachments',
      label: 'Attach file',
      fullWidth: true,
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
