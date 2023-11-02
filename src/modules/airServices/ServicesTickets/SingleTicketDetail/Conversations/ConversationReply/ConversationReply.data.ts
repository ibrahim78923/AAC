import {
  RHFTextField,
  RHFSelect,
  RHFDropZone,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import ConversationEditor from '../ConversationEditor';
import ConversationArticalselect from '../ConversationArticalselect';

export const conversationModelsValidation = Yup.object().shape({
  note: Yup.string().required('Field is Required'),
  from: Yup.string().required('Field is Required'),
  reply: Yup.string().required('Field is Required'),
  description: Yup.string().trim().required('Field is Required'),
  file: Yup.mixed().required('Field is Required'),
});

export const conversationModelsDefaultValues = {
  note: '',
  from: '',
  reply: '',
  description: '',
  file: '',
};

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
    // options: [{ value: 'BE', label: 'BE' }],
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'reply',
      label: 'Reply to',
      fullWidth: true,
    },
    // options: [{ value: 'BE', label: 'BE' }],
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
