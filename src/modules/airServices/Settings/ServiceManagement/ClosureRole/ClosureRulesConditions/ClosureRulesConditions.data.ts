import { RHFRadioGroup, RHFCheckbox } from '@/components/ReactHookForm';

export const closeIncidentDataArray = [
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
      row: false,
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

export const resolveIncidentDataArray = [
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
      row: false,
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

export const serviceCloseDataArray = [
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
      row: false,
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

export const serviceResolveDataArray = [
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
      label: '',
      row: false,
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
