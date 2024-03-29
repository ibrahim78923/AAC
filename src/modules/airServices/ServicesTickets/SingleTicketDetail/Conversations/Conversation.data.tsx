import {
  RHFTextField,
  RHFEditor,
  RHFDropZone,
  RHFSelect,
} from '@/components/ReactHookForm';
import { TICKETS_CONVERSATION_TYPE } from '@/constants/strings';
import * as Yup from 'yup';
export const conversationValidationSchema = (action: any) => {
  switch (action) {
    case TICKETS_CONVERSATION_TYPE?.NOTE:
      return Yup?.object()?.shape({
        type: Yup?.string()?.required('Required Field'),
        recaipients: Yup?.string()?.required('Required Field'),
        text: Yup?.string()?.trim()?.required('Required Field'),
        attachments: Yup?.string()?.trim()?.required('Required Field'),
      });
    case TICKETS_CONVERSATION_TYPE?.REPLY:
      return Yup?.object()?.shape({
        type: Yup?.string()?.required('Required Field'),
        recaipients: Yup?.string()?.required('Required Field'),
        ccRecipients: Yup?.string()?.required('Required Field'),
      });
    case TICKETS_CONVERSATION_TYPE?.FORWARD:
      return Yup?.object()?.shape({
        type: Yup?.string()?.required('Required Field'),
        recaipients: Yup?.string()?.required('Required Field'),
        ccRecipients: Yup?.string()?.required('Required Field'),
      });
    default:
      return Yup?.object()?.shape({});
  }
};

export const conversationModalsDefaultValues = (data: any) => {
  const taskData = data?.[0];
  return {
    type: taskData?.type ?? '',
    recaipients: taskData?.recaipients ?? '',
    text: taskData?.text ?? null,
    ccRecipients: taskData?.ccRecipients ?? '',
    attachments: taskData?.attachments ?? '',
    note: taskData?.note ?? '',
    reply: taskData?.reply ?? '',
    forward: taskData?.forward ?? '',
  };
};

export const conversationOptions = [
  { value: 'Note', label: 'Note' },
  { value: 'Forward', label: 'Forward' },
  { value: 'Reply', label: 'Reply' },
];

export const conversationNoteArray = [
  {
    componentProps: {
      name: 'note',
      label: 'Note',
      fullWidth: true,
      select: true,
      value: 'Note',
      type: 'Note',
      disabled: true,
    },
    options: conversationOptions,

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'recaipients',
      label: 'Notify to',
      placeholder: 'Search Email',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'text',
      label: 'Description',
      fullWidth: true,
      required: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    mb: 2,
  },
  {
    componentProps: {
      name: 'attachments',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
export const conversationReplyArray = [
  {
    componentProps: {
      name: 'reply',
      label: 'Reply',
      fullWidth: true,
      select: true,
      value: 'Reply',
      type: 'Reply',
      disabled: true,
    },

    options: conversationOptions,

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'recaipients',
      label: 'From',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'replyTo',
      label: 'Reply to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'text',
      label: 'Description',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    mb: 2,
  },
  {
    componentProps: {
      name: 'attachments',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];
export const conversationForwardArray = [
  {
    componentProps: {
      name: 'forward',
      label: 'Forward',
      fullWidth: true,
      select: true,
      value: 'Forward',
      type: 'Forward',
      disabled: true,
    },
    options: conversationOptions,
    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'recaipients',
      label: 'From',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'ccRecipients',
      label: 'From to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'text',
      label: 'Description',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    mb: 2,
  },
  {
    componentProps: {
      name: 'attachments',
      label: '',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const menuOptionsAddConversation = [
  { value: 'Note', label: 'Note' },
  { value: 'Reply', label: 'Reply' },
  { value: 'Forward', label: 'Forward' },
  { value: 'Discuss', label: 'Discuss' },
];
export const conversationDrawerTitle: any = {
  Add: 'Add Tickets',
  Edit: 'Edit Tickets',
  View: 'View Tickets',
};

export const stepsDiscuss = [
  {
    id: '1',
    message: 'Hello Air AppleCart',
    end: true,
  },
];
