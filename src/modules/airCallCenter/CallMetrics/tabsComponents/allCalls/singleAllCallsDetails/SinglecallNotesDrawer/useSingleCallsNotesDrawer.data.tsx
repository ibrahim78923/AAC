import {
  RHFMultiSearchableSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

export const selectTagsOptions = [
  {
    value: '1',
    label: 'Interested ',
  },
  {
    value: '2',
    label: 'Not interested',
  },
  {
    value: '3',
    label: 'Left message',
  },
];

export const viewCallNotesFormDefaultValues = () => {
  return {
    callNotes: null,
    selectTags: null,
  };
};

export const viewCallNotesFormFieldsDynamic = () => [
  {
    id: 1,
    componentProps: {
      name: 'callNotes',
      label: 'Call Notes',
      fullWidth: true,
      multiline: true,
      maxRows: 5.5,
      minRows: 5.5,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    id: 2,
    componentProps: {
      name: 'candidateId',
      label: 'Candidates',
      isCheckBox: true,
      isSearch: false,
      options: selectTagsOptions,
    },

    component: RHFMultiSearchableSelect,
    md: 12,
  },
];
