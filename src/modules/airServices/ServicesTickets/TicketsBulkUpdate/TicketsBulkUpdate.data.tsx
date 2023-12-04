import {
  RHFDropZone,
  RHFEditor,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';

import * as Yup from 'yup';
import {
  ticketImpactOptions,
  ticketPriorityOptions,
  ticketSourceOptions,
  ticketStatusOptions,
} from '../ServicesTickets.data';

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
  priority: '',
  status: '',
  impact: '',
  agent: '',
  source: '',
  category: '',
  to: '',
  description: '',
  file: '',
};

export const ticketsBulkUpdateFormValidationSchemaFunction: any = (
  isReplyAdded: boolean,
) =>
  Yup?.object()?.shape({
    priority: Yup?.string(),
    status: Yup?.string(),
    impact: Yup?.string(),
    agent: Yup?.string(),
    source: Yup?.string(),
    category: Yup?.string(),
    ...(isReplyAdded && {
      to: Yup?.string()?.required(),
      description: Yup?.mixed()?.required(),
      file: Yup?.mixed(),
    }),
  });

export const ticketsBulkUpdateFormFieldsData = [
  {
    id: 100,
    componentProps: {
      fullWidth: true,
      name: 'priority',
      label: 'Priority',
      select: true,
      options: ticketPriorityOptions,
    },
    component: RHFAutocomplete,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
      options: ticketStatusOptions,
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
      select: true,
      options: ticketImpactOptions,
    },
  },
  {
    id: 200,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'agent',
      label: 'Agent',
      select: true,
      options: dropdownDummy,
    },
  },
  {
    id: 2,
    component: RHFAutocomplete,
    componentProps: {
      fullWidth: true,
      name: 'source',
      label: 'Source',
      select: true,
      options: ticketSourceOptions,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'category',
      label: 'Category',
      select: true,
      options: dropdownDummy,
    },
    component: RHFAutocomplete,
  },
];
