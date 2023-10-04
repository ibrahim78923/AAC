import { RHFSelect } from '@/components/ReactHookForm';
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

export const ticketsFilterDefaultFormValues = {
  ticketType: '',
  created: '',
  status: '',
  agents: '',
  requester: '',
  priority: '',
  impact: '',
  urgency: '',
};

export const ticketsFilterDefaultFormValuesFunction = (
  data: any = ticketsFilterDefaultFormValues,
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
  };
};

export const ticketsFilterFormSchema: any = Yup.object().shape({
  ticketType: Yup.string(),
  created: Yup.string(),
  status: Yup.string(),
  agents: Yup.string(),
  requester: Yup.string(),
  priority: Yup.string(),
  impact: Yup.string(),
  urgency: Yup.string(),
});

export const ticketsFilterFormFieldsDataFunction = (isFieldDisable = false) => [
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
