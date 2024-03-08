import {
  RHFAutocomplete,
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSwitch,
} from '@/components/ReactHookForm';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import * as Yup from 'yup';

const todayDate = dayjs()?.format(DATE_FORMAT?.UI);

export const defaultValues = (articleData?: any) => {
  return {
    folder: articleData?.folder ?? null,
    title: articleData?.title ?? '',
    details: articleData?.details ?? '',
    tags: articleData?.tags ?? [],
    keywords: articleData?.keywords ?? [],
    needsApproval: articleData?.isApproval ?? false,
    approver: articleData?.approver ?? null,
    reviewDate: new Date(articleData?.reviewDate ?? todayDate),
    attachments: articleData?.attachments ?? null,
  };
};

export const upsertArticleValidationSchema = Yup?.object()?.shape({
  title: Yup?.string()?.required('Required'),
  details: Yup?.string()?.required('Required'),
  folder: Yup?.mixed()?.nullable()?.required('Required'),
  needsApproval: Yup?.boolean(),
  reviewDate: Yup?.date()?.when('needsApproval', {
    is: (approval: any) => approval,
    then: (schema: any) => schema?.required('Required'),
    otherwise: (schema: any) => schema?.notRequired(),
  }),
  approver: Yup?.mixed()
    ?.nullable()
    ?.when('needsApproval', {
      is: (approval: any) => approval,
      then: (schema: any) => schema?.required('Required'),
      otherwise: (schema: any) => schema?.notRequired(),
    }),
});

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
        required: needApprovals,
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
        placeholder: 'Select',
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
