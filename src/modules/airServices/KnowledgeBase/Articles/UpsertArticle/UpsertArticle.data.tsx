import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';

const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const defaultValues = {
  details: '',
  folder: null,
  tags: '',
  keywords: '',
  needsApproval: false,
  approver: '',
  reviewDate: null,
};

export const newArticleFieldsFunction = (
  needApprovals: any,
  folderOptions: any = [],
) => {
  const conditionalFields = [
    {
      id: 5,
      componentProps: {
        fullWidth: true,
        name: 'approver',
        label: 'Approver',
        select: true,
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFSelect,
    },
    {
      id: 6,
      component: RHFDatePicker,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'reviewDate',
        label: 'Review Date',
        select: true,
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
    },
  ];
  const defaultFields = [
    {
      id: 3,
      component: RHFAutocomplete,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'folder',
        label: 'Folder',
        placeholder: 'Select',
        select: true,
        options: folderOptions,
        getOptionLabel: (option: any) => option?.label,
        sx: { pb: 1.2 },
      },
    },
    {
      id: 8,
      componentProps: {
        fullWidth: true,
        name: 'tags',
        label: 'Tags',
        placeholder: '#example',
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFTextField,
    },
    {
      id: 8,
      componentProps: {
        fullWidth: true,
        name: 'keywords',
        label: 'Keywords',
        placeholder: 'Keywords',
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFTextField,
    },
    {
      id: 4,
      component: RHFSwitch,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'needsApproval',
        label: 'Need Approvals',
        sx: { pb: 1.8, pl: 1 },
      },
    },
  ];
  return needApprovals
    ? [...defaultFields, ...conditionalFields]
    : defaultFields;
};
