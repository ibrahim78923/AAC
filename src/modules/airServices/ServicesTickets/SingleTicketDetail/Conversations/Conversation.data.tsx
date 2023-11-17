import { RHFTextField, RHFSelect } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import ConversationEditor from './ConversationEditor';
export const conversationModalsValidation: any = Yup?.object().shape({
  note: Yup?.string()?.required('Field is Required'),
  title: Yup?.string()?.required('Field is Required'),
  description: Yup?.string()?.trim()?.required('Field is Required'),
  from: Yup?.string()?.required('Field is Required'),
  reply: Yup?.string()?.required('Field is Required'),
});

export const conversationModalsDefaultValues: any = {
  note: '',
  title: '',
  description: '',
  from: '',
  reply: '',
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
      name: 'title',
      label: 'Notify to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: ConversationEditor,
    md: 12,
    mb: 2,
  },
];
export const conversationReplyArray = [
  {
    componentProps: {
      name: 'note',
      label: 'Reply',
      fullWidth: true,
      select: true,
    },

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
      name: 'from',
      label: 'From',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'reply',
      label: 'Reply to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: ConversationEditor,
    md: 12,
    mb: 2,
  },
];
export const conversationForwardArray = [
  {
    componentProps: {
      name: 'note',
      label: 'Forward',
      fullWidth: true,
      select: true,
    },

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
      name: 'from',
      label: 'From',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'reply',
      label: 'From to',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: ConversationEditor,
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
