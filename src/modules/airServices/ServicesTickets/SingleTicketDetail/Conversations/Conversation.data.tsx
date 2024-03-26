import {
  RHFTextField,
  RHFSelect,
  RHFEditor,
  RHFDropZone,
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
  };
};
// export const conversationModalsDefaultValues: any = {
//   type: '',
//   recaipients: '',
//   text: '',
//   attachments: '',
//   // reply: '',
//   ccRecipients: '',
//   // forward: '',
// };

export const conversationOptions = [
  { value: 'Forward', label: 'Forward' },
  { value: 'Note', label: 'Note' },
  { value: 'Reply', label: 'Reply' },
];

export const conversationNoteArray = [
  {
    componentProps: {
      name: 'type',
      label: 'Note',
      fullWidth: true,
      select: true,
    },
    defaultValue: 'Reply',
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

export const conversationAddArticleData = [
  {
    title: 'Guide to how to design your site footer like we did...',
    link: 'Add link',
  },
  {
    title: 'Another article title',
    link: 'Another link',
  },
  {
    title: 'Yet another article title',
    link: 'Yet another link',
  },
];

export const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      [{ align: 'center' }, { align: 'right' }, { align: 'justify' }],
      [{ list: 'bullet' }, { list: 'ordered' }],
      [{ color: [] }],
      ['image'],
      ['capitalize'],
    ],
  },
};
export const conversationAttachmentFileData = [
  {
    name: 'Picture.pdf',
    size: '12KB',
    type: 'pdf',
  },
];
export const stepsDiscuss = [
  {
    id: '1',
    message: 'Hello Air AppleCart',
    end: true,
  },
];
export const conversationData = [
  {
    image: 'image1',
    sender: 'John',
    action: 'reply',
    to: 'nickofl@gmail.com',
    message:
      'Hi Guys We have been facing issues when we try to reach the email server 3 Hi Guys .',
    time: '11:02 PM-5 March,  2023',
    noteFile: {
      name: 'Picture.pdf',
      size: '12KB',
      type: 'pdf',
    },
  },
];
