import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSwitch,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { UpsertArticlesFormDefaultValuesI } from './UpsertArticles.interface';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const defaultValues = (
  articleData?: UpsertArticlesFormDefaultValuesI,
) => {
  return {
    folder: articleData?.folder ?? null,
    title: articleData?.title ?? '',
    details: articleData?.details ?? '',
    tags: articleData?.tags ?? [],
    keywords: articleData?.keywords ?? [],
    needsApproval: articleData?.isApproval ?? false,
    approver: articleData?.approver ?? null,
    reviewDate: !!articleData?.reviewDate
      ? new Date(articleData?.reviewDate)
      : null,
    attachments: articleData?.attachments ?? null,
  };
};

export const upsertArticleValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.trim()?.required('Title is required'),
  details: Yup?.string()
    ?.trim()
    ?.required('Description is Required')
    ?.test('is-not-empty', 'Description is Required', (value) => {
      const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
      return strippedContent !== '';
    }),
  folder: Yup?.mixed()?.nullable()?.required('Folder name is required'),
  needsApproval: Yup?.boolean(),
  reviewDate: Yup?.mixed()
    ?.nullable()
    ?.when('needsApproval', {
      is: (approval: any) => approval,
      then: (schema: any) => schema?.required('Review date is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
  approver: Yup?.mixed()
    ?.nullable()
    ?.when('needsApproval', {
      is: (approval: any) => approval,
      then: (schema: any) => schema?.required('Approver is required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

export const editArticleFieldsFunction = (
  needApprovals: boolean,
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
        required: needApprovals,
        placeholder: 'Select an approver',
        sx: { pb: 1.2 },
        externalParams: { admin: true },
        apiQuery: apiQueryApprover,
        getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
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
        required: needApprovals,
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
        required: true,
        name: 'folder',
        label: 'Folder',
        placeholder: 'Select a folder',
        apiQuery: apiQueryFolder,
        sx: { pb: 1.2 },
      },
    },
    {
      id: 8,
      componentProps: {
        fullWidth: true,
        name: 'tags',
        label: 'Tags',
        placeholder: 'Write tags and press enter',
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
        placeholder: 'Write keywords and press enter',
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
