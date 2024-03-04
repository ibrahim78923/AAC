import { RHFRadioGroup, RHFCheckbox } from '@/components/ReactHookForm';

export const closureRoleDefaultValues = (getClosureRuleValues: any) => {
  return {
    closeIncidentTimeAdded: getClosureRuleValues?.incident?.[0]?.timeEntryAdded,
    closeIncidentAssociatedTasks:
      getClosureRuleValues?.incident?.[0]?.associatedTasksCompleted,
    closeIncidentChildTickets:
      getClosureRuleValues?.incident?.[0]?.childTickets?.closed ||
      getClosureRuleValues?.incident?.[0]?.childTickets?.resolved,
    closeIncidentClosedResolved:
      (getClosureRuleValues?.incident?.[0]?.childTickets?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.incident?.[0]?.childTickets?.closed && 'Closed'),

    resolveIncidentTimeAdded:
      getClosureRuleValues?.incident?.[1]?.timeEntryAdded,
    resolveIncidentAssociatedTasks:
      getClosureRuleValues?.incident?.[1]?.associatedTasksCompleted,
    resolveIncidentChildTickets:
      getClosureRuleValues?.incident?.[1]?.childTickets?.closed ||
      getClosureRuleValues?.incident?.[1]?.childTickets?.resolved,
    resolveIncidentClosedResolved:
      (getClosureRuleValues?.incident?.[1]?.childTickets?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.incident?.[1]?.childTickets?.closed && 'Closed'),

    serviceCloseTimeAdded: getClosureRuleValues?.services?.[1]?.timeEntryAdded,
    serviceCloseAssociatedTasks:
      getClosureRuleValues?.services?.[1]?.associatedTasksCompleted,
    serviceCloseChildTickets:
      getClosureRuleValues?.services?.[1]?.childTickets?.closed ||
      getClosureRuleValues?.services?.[1]?.childTickets?.resolved,
    serviceCloseClosedResolved:
      (getClosureRuleValues?.services?.[1]?.childTickets?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.services?.[1]?.childTickets?.closed && 'Closed'),

    serviceResolveTimeAdded:
      getClosureRuleValues?.services?.[0]?.timeEntryAdded,
    serviceResolveAssociatedTasks:
      getClosureRuleValues?.services?.[0]?.associatedTasksCompleted,
    serviceResolveChildTickets:
      getClosureRuleValues?.services?.[0]?.childTickets?.closed ||
      getClosureRuleValues?.services?.[0]?.childTickets?.resolved,
    serviceResolveClosedResolved:
      (getClosureRuleValues?.services?.[0]?.childTickets?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.services?.[0]?.childTickets?.closed && 'Closed'),
  };
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
