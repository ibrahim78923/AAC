import {
  RHFDropZone,
  RHFEditor,
  RHFAutocomplete,
  RHFAutocompleteAsync,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../ServicesTickets.data';
import { ROLES } from '@/constants/strings';
import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';
import { PAGINATION } from '@/config';
import { pxToRem } from '@/utils/getFontValue';

export const dropdownDummy = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
];

export const isReplyAddedNeglect = ['to', 'description', 'file'];

export const ticketsBulkUpdateToFormSchema: any = {
  to: Yup?.array()?.of(Yup?.string()),
  description: Yup?.string(),
  file: Yup?.mixed()?.nullable(),
};

export const ticketsBulkUpdateAddReplyFormFieldsData = [
  {
    id: 11,
    componentProps: {
      name: 'to',
      label: 'To',
      placeholder: 'Enter Email And Press Enter',
      required: true,
      freeSolo: true,
      options: [],
      multiple: true,
      isOptionEqualToValue: () => {},
    },
    component: RHFAutocomplete,
  },
  {
    id: 13,
    componentProps: {
      fullWidth: true,
      name: 'description',
      label: 'Description',
      style: { height: pxToRem(250) },
    },
    component: RHFEditor,
  },
  {
    id: 15,
    componentProps: {
      fullWidth: true,
      name: 'file',
      label: 'File',
    },
    component: RHFDropZone,
  },
];

export const ticketsBulkUpdateDefaultFormValues = {
  pirority: null,
  status: null,
  impact: null,
  agent: null,
  source: null,
  category: null,
  to: [],
  description: '',
  file: null,
};

export const ticketsBulkUpdateFormValidationSchemaFunction: any = (
  isReplyAdded: boolean,
) =>
  Yup?.object()?.shape({
    category: Yup?.mixed()?.nullable(),
    status: Yup?.mixed()?.nullable(),
    pirority: Yup?.mixed()?.nullable(),
    source: Yup?.mixed()?.nullable(),
    impact: Yup?.mixed()?.nullable(),
    agent: Yup?.mixed()?.nullable(),
    ...(isReplyAdded && {
      to: Yup?.array()
        ?.of(Yup?.string())
        ?.test(
          'is-emails-valid',
          'Enter valid email formats',
          function (value) {
            if (!value || value.length === 0) {
              return false;
            }
            return value.every(
              (email) => Yup?.string().email().isValidSync(email),
            );
          },
        ),
      description: Yup?.string()?.required('Description is required'),
      file: Yup?.mixed()?.nullable(),
    }),
  });

export const ticketsBulkUpdateFormFieldsDynamic = (
  apiQueryAgent: any,
  apiQueryCategories: any,
) => [
  {
    id: 1,
    componentProps: {
      fullWidth: true,
      name: 'pirority',
      label: 'Priority',
      options: ticketPriorityOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      options: ticketStatusOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 3,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
  },
  {
    id: 4,
    componentProps: {
      fullWidth: true,
      name: 'agent',
      label: 'Agent',
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: {
        limit: PAGINATION?.DROPDOWNS_RECORD_LIMIT,
        role: ROLES?.ORG_EMPLOYEE,
      },
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 5,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'source',
      label: 'Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: AutocompleteOptionsI) => option?.label,
    },
  },
  {
    id: 6,
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      apiQuery: apiQueryCategories,
      placeholder: 'Choose Category',
      getOptionLabel: (option: AutocompleteAsyncOptionsI) =>
        option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
];
