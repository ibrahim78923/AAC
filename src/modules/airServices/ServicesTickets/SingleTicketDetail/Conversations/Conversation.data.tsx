import {
  RHFTextField,
  RHFSelect,
  RHFDropZone,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import ConversationEditor from './ConversationEditor';
import ConversationArticalselect from './ConversationArticalselect';

export const conversationModelsValidation: any = Yup.object().shape({
  note: Yup.string().required('Field is Required'),
  title: Yup.string().required('Field is Required'),
  conversationartical: Yup.string().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
  response: Yup.string().trim().required('Field is Required'),
  file: Yup.mixed().required('Field is Required'),
});

export const conversationModelsDefaultValues: any = {
  note: '',
  title: '',
  description: '',
  conversationartical: '',
  response: '',
  file: '',
};

export const conversationModelsArray = [
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
    options: [{ value: 'BE', label: 'BE' }],
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
    mb: '12px',
  },
  {
    componentProps: {
      name: 'conversationartical',
      label: 'Artical',
      fullWidth: true,
      select: false,
      // required: true,
    },
    options: [{ value: 'BE', label: 'BE' }],
    component: ConversationArticalselect,
    md: 12,
  },
  {
    componentProps: {
      name: 'response',
      label: 'Canned response',
      fullWidth: true,
      select: false,
      // required: true,
    },
    options: [{ value: 'BE', label: 'BE' }],
    component: ConversationArticalselect,
    md: 12,
  },
  {
    componentProps: {
      name: 'attachFile',
      label: 'Attach a File',
      fullWidth: true,
    },
    component: RHFDropZone,
    md: 12,
  },
];

export const menuOptionsAddconversation = [
  { value: 'Note', label: 'Note' },
  { value: 'Reply', label: 'Reply' },
  { value: 'Forward', label: 'Forward' },
  { value: 'Discuss', label: 'Discuss' },
];
export const ConversationDrawerTitle: any = {
  Add: 'Add Tickets',
  Edit: 'Edit Tickets',
  View: 'View Tickets',
};

export const ConversationAddArticalData = [
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
