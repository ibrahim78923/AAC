import { RHFDropZone, RHFEditor, RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import RHFMultiSearchableSelectWithAccordion from './MultiSearchableSelectWithAccordion';

export const validationSchema = Yup?.object()?.shape({
  SocialAccount: Yup?.string(),
  Campaign: Yup?.string(),
  PostDetails: Yup?.string(),
  Media: Yup?.string(),
});

export const defaultValues = {
  SocialAccount: '',
  Campaign: '',
  PostDetails: '',
  Media: '',
};

export const createPostDataArray = [
  {
    componentProps: {
      name: 'SocialAccount',
      label: 'Add Social Account',
      isCheckBox: false,
      isSearch: true, //optional...
      isAllSelect: true, //optional...
      options: [
        { value: 'JohnDoe', label: 'John Doe' },
        { value: 'Andrew', label: 'Andrew' },
        { value: 'RichardRobertson', label: 'Richard robertson' },
        { value: 'Franksten', label: 'Franksten' },
      ],
    },
    component: RHFMultiSearchableSelectWithAccordion,
    md: 12,
  },
  {
    componentProps: {
      name: 'Campaign',
      label: 'Campaign',
      fullWidth: true,
      select: true,
      options: [
        { value: 'pdf', label: 'Pdf' },
        { value: 'excel', label: 'Excel' },
        { value: 'xls', label: 'XLS' },
      ],
    },

    component: RHFSelect,

    md: 12,
  },
  {
    componentProps: {
      name: 'PostDetails',
      label: 'Post Details',
      fullWidth: true,
      select: false,
    },

    component: RHFEditor,

    md: 12,
  },
  {
    componentProps: {
      name: 'Media',
      label: 'Media',
      fullWidth: true,
      select: false,
    },

    component: RHFDropZone,

    md: 12,
  },
];
