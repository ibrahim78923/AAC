import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSwitch,
} from '@/components/ReactHookForm';

export const defaultValues = (articleData?: any) => {
  return {
    folder: articleData?.folder ?? null,
    details: articleData?.details,
    tags: articleData?.tags ?? [],
    keywords: articleData?.keywords ?? [],
    needsApproval: articleData?.isApproval ?? '',
    approver: articleData?.approver ?? null,
    reviewDate: new Date(articleData?.reviewDate) ?? new Date(),
  };
};

export const editArticleFieldsFunction = (
  needApprovals: any,
  apiQueryFolder: any,
  apiQueryApprover: any,
) => {
  const conditionalFields = [
    {
      id: 1,
      componentProps: {
        fullWidth: true,
        name: 'approver',
        label: 'Approver',
        placeholder: 'Select',
        sx: { pb: 1.2 },
        apiQuery: apiQueryApprover,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
      },
      gridLength: 12,
      component: RHFAutocompleteAsync,
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
      id: 3,
      component: RHFAutocompleteAsync,
      gridLength: 12,
      componentProps: {
        fullWidth: true,
        name: 'folder',
        label: 'Folder',
        placeholder: 'Select',
        apiQuery: apiQueryFolder,
        // getOptionLabel: (option: any) =>
        //   `${option?.firstName} ${option?.lastName}`,
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
        freeSolo: true,
        options: [],
        multiple: true,
        isOptionEqualToValue: () => {},
      },
      gridLength: 12,
      component: RHFAutocomplete,
    },
    {
      id: 2,
      componentProps: {
        fullWidth: true,
        name: 'keywords',
        label: 'Keywords',
        // sx: { pb: 1.2 },
        freeSolo: true,
        options: [],
        multiple: true,
        isOptionEqualToValue: () => {},
      },
      gridLength: 12,
      component: RHFAutocomplete,
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
