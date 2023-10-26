import {
  RHFDropZone,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';

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

export const ticketsBulkUpdateToDefaultFormValues = {
  to: '',
  description: '',
  file: '',
};
export const ticketsBulkUpdateToDefaultFormValuesFunction = (
  data: any = ticketsBulkUpdateToDefaultFormValues,
) => {
  return {
    to: data?.to,
    description: data?.description,
    file: data?.file,
  };
};
export const ticketsBulkUpdateToFormSchema: any = {
  to: Yup.string(),
  description: Yup.mixed(),
  file: Yup.mixed(),
};

export const ticketsBulkUpdateToFormFieldsDataFunction = (
  isFieldDisable = false,
) => [
  {
    id: 2,
    component: RHFTextField,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'to',
      label: 'To',
      disabled: isFieldDisable,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'description',
      label: 'Description',
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFEditor,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'file',
      label: 'File',
      //   select: true,
      //   options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFDropZone,
  },
];
export const ticketsBulkUpdateDefaultFormValues = (expandForm?: boolean) => {
  return {
    ticketType: '',
    created: '',
    status: '',
    agents: '',
    requester: '',
    priority: '',
    impact: '',
    urgency: '',
    // ...ticketsBulkUpdateToDefaultFormValues,
    ...(expandForm && {
      to: '',
      description: '',
      file: '',
    }),
  };
};

export const ticketsBulkUpdateDefaultFormValuesFunction = (
  expandForm?: boolean,
  data: any = ticketsBulkUpdateDefaultFormValues?.(expandForm),
) => {
  return {
    ticketType: data?.ticketType,
    created: data?.created,
    status: data?.status,
    agents: data?.agents,
    requester: data?.requester,
    priority: data?.priority,
    impact: data?.impact,
    urgency: data?.urgency,
    // to: data?.to,
    // description: data?.description,
    // file: data?.file,
    ...(expandForm && {
      to: data?.to,
      description: data?.description,
      file: data?.file,
    }),
  };
};

export const ticketsBulkUpdateFormSchemaFunction: any = (expandForm: boolean) =>
  Yup.object().shape({
    ticketType: Yup.string(),
    created: Yup.string(),
    status: Yup.string(),
    agents: Yup.string(),
    requester: Yup.string(),
    priority: Yup.string(),
    impact: Yup.string(),
    urgency: Yup.string(),
    ...(expandForm && {
      to: Yup.string().required(),
      description: Yup.mixed(),
      file: Yup.mixed(),
    }),
  });

export const ticketsBulkUpdateFormFieldsDataFunction = (
  isFieldDisable = false,
) => [
  {
    id: 2,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'ticketType',
      label: 'Ticket Type',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 920,
    componentProps: {
      fullWidth: true,
      name: 'created',
      label: 'Created',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 150,
    componentProps: {
      fullWidth: true,
      name: 'status',
      label: 'Status',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 200,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'agents',
      label: 'Agents',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 129,
    componentProps: {
      fullWidth: true,
      name: 'requester',
      label: 'Requester',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 100,
    componentProps: {
      fullWidth: true,
      name: 'priority',
      label: 'Priority',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
  {
    id: 82,
    component: RHFSelect,
    gridLength: 6,
    componentProps: {
      fullWidth: true,
      name: 'impact',
      label: 'Impact',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
  },
  {
    id: 90,
    componentProps: {
      fullWidth: true,
      name: 'urgency',
      label: 'Urgency',
      select: true,
      options: dropdownDummy,
      disabled: isFieldDisable,
    },
    gridLength: 6,
    component: RHFSelect,
  },
];
