import {
  RHFAutocomplete,
  RHFDropZone,
  RHFEditor,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  TICKET_CONVERSATIONS_RESPONSE_TYPE,
  TICKET_CONVERSATIONS_TYPE,
} from '@/constants/strings';
import * as Yup from 'yup';
import { CONVERSATION_TYPE_MODIFY } from '../Conversations.data';
import { Box, IconButton } from '@mui/material';
import { ArticleModalIcon, CannedResponseModalIcon } from '@/assets/icons';

export const upsertConversationFormDefaultValues = (data?: any) => {
  return {
    type: data?.conversationType
      ? {
          _id: data?.conversationType,
          label: data?.conversationType,
        }
      : null,
    recipients:
      data?.isEdit ||
      data?.conversationType === TICKET_CONVERSATIONS_TYPE?.REPLY
        ? data?.recipients?.[0]
        : '',
    html:
      data?.conversationType === TICKET_CONVERSATIONS_TYPE?.REPLY
        ? ''
        : data?.html
        ? data?.html
        : '',
    attachments: null,
    from: data?.from ?? '',
  };
};

export const upsertConversationFormValidationSchema = Yup?.object()?.shape({
  type: Yup?.mixed()?.nullable()?.required(''),
  recipients: Yup?.string()
    ?.email('Invalid email format')
    ?.required('Recipient is required'),
  html: Yup?.string()?.trim()?.required('Description is required'),
});

export const conversationTypesOptions = [
  {
    _id: TICKET_CONVERSATIONS_TYPE?.NOTE,
    label: TICKET_CONVERSATIONS_TYPE?.NOTE,
  },
  {
    _id: TICKET_CONVERSATIONS_TYPE?.FORWARD,
    label: TICKET_CONVERSATIONS_TYPE?.FORWARD,
  },
  {
    _id: TICKET_CONVERSATIONS_TYPE?.REPLY,
    label: TICKET_CONVERSATIONS_TYPE?.REPLY,
  },
];

export const upsertConversationFormFieldsDynamic = (
  selectedConversationType?: any,
  setSelectedResponseType?: any,
) => [
  {
    id: 1,
    componentProps: {
      name: 'type',
      label:
        CONVERSATION_TYPE_MODIFY?.[selectedConversationType?.conversationType]
          ?.label,
      fullWidth: true,
      disabled: true,
      options: conversationTypesOptions,
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  ...(selectedConversationType?.conversationType !==
  TICKET_CONVERSATIONS_TYPE?.NOTE
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
      label: `${CONVERSATION_TYPE_MODIFY?.[
        selectedConversationType?.conversationType
      ]?.recipients}`,
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
      disabled:
        selectedConversationType?.conversationType ===
        TICKET_CONVERSATIONS_TYPE?.FORWARD,
    },
    component: RHFEditor,
  },
  {
    id: 6,
    componentProps: {},
    component: Box,
    children: (
      <Box
        display={'flex'}
        gap={0.5}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'flex-end'}
      >
        <IconButton
          disabled={
            selectedConversationType?.conversationType ===
            TICKET_CONVERSATIONS_TYPE?.FORWARD
          }
          onClick={() =>
            setSelectedResponseType?.({
              type: TICKET_CONVERSATIONS_RESPONSE_TYPE?.CANNED_RESPONSES,
              isOpen: true,
            })
          }
          sx={{ cursor: 'pointer' }}
        >
          <CannedResponseModalIcon />
        </IconButton>
        <IconButton
          disabled={
            selectedConversationType?.conversationType ===
            TICKET_CONVERSATIONS_TYPE?.FORWARD
          }
          onClick={() =>
            setSelectedResponseType?.({
              type: TICKET_CONVERSATIONS_RESPONSE_TYPE?.ARTICLE,
              isOpen: true,
            })
          }
          sx={{ cursor: 'pointer' }}
        >
          <ArticleModalIcon />
        </IconButton>
      </Box>
    ),
  },
  {
    id: 5,
    componentProps: {
      name: 'attachments',
      label: 'Attach file',
      fullWidth: true,
      fileType: 'PNG or JPG  (max 2.44 MB)',
      maxSize: 1024 * 1024 * 2.44,
      disabled:
        selectedConversationType?.conversationType ===
        TICKET_CONVERSATIONS_TYPE?.FORWARD,
      accept: {
        'image/*': ['.png', '.jpg'],
      },
    },
    component: RHFDropZone,
  },
];
