import * as Yup from 'yup';
import { DepartmentFieldDropdown } from '../ServiceTicketFormFields/DepartmentFieldDropdown';
import { AgentFieldDropdown } from '../ServiceTicketFormFields/AgentFieldDropdown';

export const moveTicketsValidationSchema = Yup?.object()?.shape({
  department: Yup?.mixed()?.nullable()?.required('Department is required'),
  agent: Yup?.mixed()?.nullable()?.required('Agent is required'),
});

export const moveTicketsDefaultValue = {
  department: null,
  agent: null,
};

export const moveTicketsFormFieldsDynamic = () => [
  {
    id: 1,
    component: DepartmentFieldDropdown,
  },
  {
    id: 2,
    component: AgentFieldDropdown,
  },
];
