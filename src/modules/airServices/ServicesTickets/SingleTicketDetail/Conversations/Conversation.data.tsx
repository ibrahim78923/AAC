import { RHFTextField, RHFSelect, RHFEditor } from '@/components/ReactHookForm';
import { TICKETS_CONVERSATION_TYPE } from '@/constants/strings';
import * as Yup from 'yup';
export const conversationValidationSchema = (action) => {
  switch (action) {
    case TICKETS_CONVERSATION_TYPE?.NOTE:
      return Yup?.object()?.shape({
        note: Yup?.string()?.required('Field is Required'),
        notify: Yup?.string()?.required('Field is Required'),
        noteDescription: Yup?.string()?.trim()?.required('Field is Required'),
      });
    case TICKETS_CONVERSATION_TYPE?.REPLY:
      return Yup?.object()?.shape({
        reply: Yup?.string()?.required('Field is Required'),
        replyFrom: Yup?.string()?.required('Field is Required'),
        replyTo: Yup?.string()?.required('Field is Required'),
        replyDescription: Yup?.string()?.trim()?.required('Field is Required'),
      });
    case TICKETS_CONVERSATION_TYPE?.FORWARD:
      return Yup?.object()?.shape({
        forward: Yup?.string()?.required('Field is Required'),
        forwardFrom: Yup?.string()?.required('Field is Required'),
        forwardTo: Yup?.string()?.required('Field is Required'),
        forwardDescription: Yup?.string()
          ?.trim()
          ?.required('Field is Required'),
      });
    default:
      return Yup?.object()?.shape({});
  }
};

export const conversationModalsDefaultValues: any = {
  note: '',
  notify: '',
  noteDescription: '',
  reply: '',
  replyFrom: '',
  replyTo: '',
  replyDescription: '',
  forward: '',
  forwardFrom: '',
  forwardTo: '',
  forwardDescription: '',
};

export const conversationNoteArray = [
  {
    componentProps: {
      name: 'note',
      label: 'Note',
      fullWidth: true,
      select: true,
    },
    defaultValue: 'Reply',
    options: [
      { value: 'Note', label: 'Note' },
      { value: 'Reply', label: 'Reply' },
      { value: 'Forward', label: 'Forward' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'notify',
      label: 'Notify to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'noteDescription',
      label: 'Description',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    mb: 2,
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

    options: [
      { value: 'Reply', label: 'Reply' },
      { value: 'Forward', label: 'Forward' },
      { value: 'Note', label: 'Note' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'replyFrom',
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
      name: 'replyDescription',
      label: 'Description',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    mb: 2,
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

    options: [
      { value: 'Forward', label: 'Forward' },
      { value: 'Note', label: 'Note' },
      { value: 'Reply', label: 'Reply' },
    ],

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'forwardFrom',
      label: 'From',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'forwardTo',
      label: 'From to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'forwardDescription',
      label: 'Description',
      fullWidth: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
    md: 12,
    mb: 2,
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

export const conversationData = [
  {
    image: 'image1',
    sender: 'John',
    action: 'reply',
    to: 'nickofl@gmail.com',
    message:
      'Hi Guys We have been facing issue  when we try to reach email server 3 Hi Guys .',
    time: '11:02 PM-5 March,  2023',
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
