import {
  RHFAutocomplete,
  RHFDatePicker,
  RHFSwitch,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { UpsertArticlesFormDefaultValuesI } from './UpsertArticles.interface';
import { ApprovalsFields, FoldersFields } from '../../KnowledgeBaseFormFields';

export const upsertArticleDefaultValues = (
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

export const upsertArticleFormFieldsDynamic = (needApprovals: boolean) => [
  {
    id: 1,
    component: FoldersFields,
    gridLength: 12,
  },
  {
    id: 2,
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
    id: 3,
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
  ...(needApprovals
    ? [
        {
          id: 5,
          component: ApprovalsFields,
          gridLength: 12,
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
            textFieldProps: { readOnly: true },
          },
        },
      ]
    : []),
];
