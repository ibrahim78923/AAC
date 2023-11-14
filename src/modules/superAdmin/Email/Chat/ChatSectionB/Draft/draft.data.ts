import {
  RHFDropZone,
  RHFEditor,
  RHFMultiCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';

export const DraftData = [
  {
    gridLength: 6,
    title: 'To',
    componentProps: {
      name: 'to',
      placeholder: 'john doe',
    },
    component: RHFTextField,
  },
  {
    gridLength: 6,
    sx: {
      '& .MuiFormGroup-root': {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: '100%',
      },
    },
    componentProps: {
      name: 'from_CC_BCC',
      placeholder: 'john doe',
      options: ['From', 'CC', 'BCC'],
    },
    component: RHFMultiCheckbox,
  },
  {
    gridLength: 6,
    title: 'Subject',
    componentProps: {
      name: 'subject',
      placeholder: 'Test Mail',
    },
    component: RHFTextField,
  },
  {
    gridLength: 6,
    title: 'Templates',
    componentProps: {
      name: 'templates',
      placeholder: 'Follow-up on stage update',
      select: true,
    },
    options: [{ value: 'value', label: 'label' }],
    component: RHFTextField,
  },
  {
    gridLength: 12,
    title: 'Description',
    componentProps: {
      name: 'description',
    },
    component: RHFEditor,
  },
  {
    gridLength: 12,
    componentProps: {
      name: 'attachment',
    },
    component: RHFDropZone,
  },
];
