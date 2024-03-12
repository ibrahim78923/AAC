import {
  RHFDropZone,
  RHFEditor,
  RHFAutocomplete,
  RHFTextField,
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
  to: Yup?.string(),
  description: Yup?.mixed(),
  file: Yup?.mixed(),
};

export const ticketsBulkUpdateAddReplyFormFieldsData = [
  {
    id: 2,
    component: RHFTextField,
    componentProps: {
      fullWidth: true,
      name: 'to',
      label: 'To',
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'description',
      label: 'Description',
      required: true,
      style: { height: '250px' },
    },
    component: RHFEditor,
  },
  {
    id: 150,
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
  to: '',
  description: '',
  file: '',
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
      to: Yup?.string()?.required(),
      description: Yup?.mixed()?.required(),
      file: Yup?.mixed(),
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
      getOptionLabel: (option: any) => option?.label,
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
      getOptionLabel: (option: any) => option?.label,
    },
    component: RHFAutocomplete,
  },
  {
    id: 82,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      options: ticketImpactOptions,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 200,
    componentProps: {
      fullWidth: true,
      name: 'agent',
      label: 'Agent',
      apiQuery: apiQueryAgent,
      placeholder: 'Choose Agent',
      externalParams: { limit: 50, role: ROLES?.ORG_AGENT },
      getOptionLabel: (option: any) =>
        `${option?.firstName} ${option?.lastName}`,
    },
    component: RHFAutocompleteAsync,
  },
  {
    id: 2,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'source',
      label: 'Source',
      options: ticketSourceOptions,
      getOptionLabel: (option: any) => option?.label,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      apiQuery: apiQueryCategories,
      placeholder: 'Choose Category',
      getOptionLabel: (option: any) => option?.categoryName,
    },
    component: RHFAutocompleteAsync,
  },
];
