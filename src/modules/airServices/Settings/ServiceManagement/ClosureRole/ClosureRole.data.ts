import * as Yup from 'yup';
import { RHFRadioGroup, RHFCheckbox } from '@/components/ReactHookForm';

export const closureRoleValidationSchema = Yup?.object()?.shape({
  closeIncidentTimeAdded: Yup?.boolean(),
  closeIncidentAssociatedTasks: Yup?.boolean(),
  closeIncidentChildTickets: Yup?.boolean(),
  closeIncidentClosedResolved: Yup?.string(),

  resolveIncidentTimeAdded: Yup?.boolean(),
  resolveIncidentAssociatedTasks: Yup?.boolean(),
  resolveIncidentChildTickets: Yup?.boolean(),
  resolveIncidentClosedResolved: Yup?.string(),

  serviceCloseTimeAdded: Yup?.boolean(),
  serviceCloseAssociatedTasks: Yup?.boolean(),
  serviceCloseChildTickets: Yup?.boolean(),
  serviceCloseClosedResolved: Yup?.string(),

  serviceResolveTimeAdded: Yup?.boolean(),
  serviceResolveAssociatedTasks: Yup?.boolean(),
  serviceResolveChildTickets: Yup?.boolean(),
  serviceResolveClosedResolved: Yup?.string(),
});

export const closureRoleDefaultValues = {
  closeIncidentTimeAdded: false,
  closeIncidentAssociatedTasks: false,
  closeIncidentChildTickets: false,
  closeIncidentClosedResolved: '',

  resolveIncidentTimeAdded: false,
  resolveIncidentAssociatedTasks: false,
  resolveIncidentChildTickets: false,
  resolveIncidentClosedResolved: '',

  serviceCloseTimeAdded: false,
  serviceCloseAssociatedTasks: false,
  serviceCloseChildTickets: false,
  serviceCloseClosedResolved: '',

  serviceResolveTimeAdded: false,
  serviceResolveAssociatedTasks: false,
  serviceResolveChildTickets: false,
  serviceResolveClosedResolved: '',
};

export const closeIncidentDataArray = (isRadioGroupDisable: any) => [
  {
    id: 2455,
    closeIncident: true,
    componentProps: {
      name: 'closeIncidentTimeAdded',
      label: 'Time entry is added',
    },
    component: RHFCheckbox,
  },
  {
    id: 4545,
    closeIncident: true,
    componentProps: {
      name: 'closeIncidentAssociatedTasks',
      label: 'Associated tasks are completed',
    },
    component: RHFCheckbox,
  },
  {
    id: 2345,
    closeIncident: true,
    componentProps: {
      name: 'closeIncidentChildTickets',
      label: 'Child tickets',
    },
    component: RHFCheckbox,
  },
  {
    id: 7475,
    closeIncident: true,
    componentProps: {
      name: 'closeIncidentClosedResolved',
      label: '',
      sx: { ml: 2 },
      row: false,
      disabled: isRadioGroupDisable ? false : true,
      options: [
        { value: 'Closed', label: 'Closed' },
        {
          value: 'Either closed or resolved',
          label: 'Either closed or resolved',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];

export const resolveIncidentDataArray = (isRadioGroupDisable: any) => [
  {
    id: 3541,
    resolveIncident: true,
    componentProps: {
      name: 'resolveIncidentTimeAdded',
      label: 'Time entry is added',
    },
    component: RHFCheckbox,
  },
  {
    id: 5785,
    resolveIncident: true,
    componentProps: {
      name: 'resolveIncidentAssociatedTasks',
      label: 'Associated tasks are completed',
    },
    component: RHFCheckbox,
  },
  {
    id: 2346,
    resolveIncident: true,
    componentProps: {
      name: 'resolveIncidentChildTickets',
      label: 'Child tickets',
    },
    component: RHFCheckbox,
  },
  {
    id: 6789,
    resolveIncident: true,
    componentProps: {
      name: 'resolveIncidentClosedResolved',
      label: '',
      sx: { ml: 2 },
      row: false,
      disabled: isRadioGroupDisable ? false : true,
      options: [
        { value: 'Closed', label: 'Closed' },
        {
          value: 'Either closed or resolved',
          label: 'Either closed or resolved',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];

export const serviceCloseDataArray = (isRadioGroupDisable: any) => [
  {
    id: 6857,
    serviceCloseIncident: true,
    componentProps: {
      name: 'serviceCloseTimeAdded',
      label: 'Time entry is added',
    },
    component: RHFCheckbox,
  },
  {
    id: 2345,
    serviceCloseIncident: true,
    componentProps: {
      name: 'serviceCloseAssociatedTasks',
      label: 'Associated tasks are completed',
    },
    component: RHFCheckbox,
  },
  {
    id: 8697,
    serviceCloseIncident: true,
    componentProps: {
      name: 'serviceCloseChildTickets',
      label: 'Child tickets',
    },
    component: RHFCheckbox,
  },
  {
    id: 6578,
    serviceCloseIncident: true,
    componentProps: {
      name: 'serviceCloseClosedResolved',
      label: '',
      sx: { ml: 2 },
      row: false,
      disabled: isRadioGroupDisable ? false : true,
      options: [
        { value: 'Closed', label: 'Closed' },
        {
          value: 'Either closed or resolved',
          label: 'Either closed or resolved',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];

export const serviceResolveDataArray = (isRadioGroupDisable: any) => [
  {
    id: 2341,
    serviceResolveIncident: true,
    componentProps: {
      name: 'serviceResolveTimeAdded',
      label: 'Time entry is added',
    },
    component: RHFCheckbox,
  },
  {
    id: 7675,
    serviceResolveIncident: true,
    componentProps: {
      name: 'serviceResolveAssociatedTasks',
      label: 'Associated tasks are completed',
    },
    component: RHFCheckbox,
  },
  {
    id: 8401,
    serviceResolveIncident: true,
    componentProps: {
      name: 'serviceResolveChildTickets',
      label: 'Child tickets',
    },
    component: RHFCheckbox,
  },
  {
    id: 6587,
    serviceResolveIncident: true,
    componentProps: {
      name: 'serviceResolveClosedResolved',
      sx: { ml: 2 },
      label: '',
      row: false,
      disabled: isRadioGroupDisable ? false : true,
      options: [
        { value: 'Closed', label: 'Closed' },
        {
          value: 'Either closed or resolved',
          label: 'Either closed or resolved',
        },
      ],
    },
    component: RHFRadioGroup,
  },
];
