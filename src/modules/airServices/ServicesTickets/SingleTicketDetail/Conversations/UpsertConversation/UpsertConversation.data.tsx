import {
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import * as Yup from 'yup';
import { TICKET_CONVERSATION_PORTAL_ACTIONS_CONSTANT } from '../Conversations.data';
import { ConversationResponseType } from '../ConversationResponseType';

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
      const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
      return strippedContent !== '';
    }),
});

export const upsertConversationFormFieldsDynamic = (portalAction: string) => [
  {
    id: 1,
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
          id: 2,
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
    id: 3,
    componentProps: {
      name: 'recipients',
      label: portalAction?.includes(NOTE) ? 'Notify to' : `${portalAction} to`,
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 4,
    componentProps: {
      name: 'html',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: '200px' },
    },
    component: RHFEditor,
  },
  {
    id: 6,
    component: ConversationResponseType,
  },
  {
    id: 5,
    componentProps: {
      name: 'attachments',
      label: 'Attach file',
      fullWidth: true,
    },
    component: RHFDropZone,
  },
];
