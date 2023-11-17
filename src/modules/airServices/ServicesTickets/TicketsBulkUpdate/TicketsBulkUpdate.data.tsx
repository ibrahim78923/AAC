import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
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
    md: 12,
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
      style: { height: '250px' },
    },
    md: 12,
    component: RHFEditor,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'file',
      label: 'File',
    },
    md: 12,
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
      description: Yup?.mixed(),
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
    md: 12,
    component: RHFSelect,
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
    md: 12,
    component: RHFSelect,
  },
  {
    id: 82,
    component: RHFSelect,
    md: 12,
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
    component: RHFSelect,
    md: 12,
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
    component: RHFSelect,
    md: 12,
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
    md: 12,
    component: RHFSelect,
  },
];
