import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';

const dropdownDummy = ['Option 1', 'Option 2'];

export const defaultValues = (articleData: any) => {
  return {
    folder: articleData?.folder?.name ?? null,
    details: articleData?.details,
    tags: articleData?.tags ?? '',
    keywords: articleData?.keywords ?? '',
    needsApproval: articleData?.isApprovel ?? '',
    approver: null,
    reviewDate: new Date(),
  };
};

export const editArticleFieldsFunction = (
  needApprovals: any,
  folderOptions: any,
) => {
  const conditionalFields = [
    {
      id: 1,
      componentProps: {
        fullWidth: true,
        name: 'approver',
        label: 'Approver',
        placeholder: 'Select',
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFAutocomplete,
    },
    {
      id: 6,
      component: RHFDatePicker,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'reviewDate',
        label: 'Review Date',
        sx: { pb: 1.2 },
      },
    },
  ];
  const defaultFields = [
    {
      id: 1,
      componentProps: {
        fullWidth: true,
        name: 'approver',
        label: 'Approver',
        placeholder: 'Select',
        options: dropdownDummy,
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFAutocomplete,
    },
    {
      id: 3,
      component: RHFAutocomplete,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'folder',
        label: 'Folder',
        placeholder: 'Select',
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
        sx: { pb: 1.2 },
      },
      gridLength: 12,
      component: RHFTextField,
    },
    {
      id: 2,
      componentProps: {
        fullWidth: true,
        name: 'keywords',
        label: 'Keywords',
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
