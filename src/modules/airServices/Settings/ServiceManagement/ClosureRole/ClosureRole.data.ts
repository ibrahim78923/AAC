import { RHFRadioGroup, RHFCheckbox } from '@/components/ReactHookForm';

export const closureRoleDefaultValues = (
  getClosureRuleValues: any,
  ticket: any,
) => {
  return {
    closeIncidentTimeAdded:
      getClosureRuleValues?.incident?.[ticket?.incidentClose]?.timeEntryAdded,
    closeIncidentAssociatedTasks:
      getClosureRuleValues?.incident?.[ticket?.incidentClose]
        ?.associatedTasksCompleted,
    closeIncidentChildTickets:
      getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.closed ||
      getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.resolved,
    closeIncidentClosedResolved:
      (getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.closed &&
        'Closed'),

    resolveIncidentTimeAdded:
      getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.timeEntryAdded,
    resolveIncidentAssociatedTasks:
      getClosureRuleValues?.incident?.[ticket?.incidentResolve]
        ?.associatedTasksCompleted,
    resolveIncidentChildTickets:
      getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.closed ||
      getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.resolved,
    resolveIncidentClosedResolved:
      (getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.closed &&
        'Closed'),

    serviceCloseTimeAdded:
      getClosureRuleValues?.services?.[ticket?.serviceClose]?.timeEntryAdded,
    serviceCloseAssociatedTasks:
      getClosureRuleValues?.services?.[ticket?.serviceClose]
        ?.associatedTasksCompleted,
    serviceCloseChildTickets:
      getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.closed ||
      getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.resolved,
    serviceCloseClosedResolved:
      (getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.closed &&
        'Closed'),

    serviceResolveTimeAdded:
      getClosureRuleValues?.services?.[ticket?.serviceResolve]?.timeEntryAdded,
    serviceResolveAssociatedTasks:
      getClosureRuleValues?.services?.[ticket?.serviceResolve]
        ?.associatedTasksCompleted,
    serviceResolveChildTickets:
      getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.closed ||
      getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.resolved,
    serviceResolveClosedResolved:
      (getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.resolved &&
        'Either closed or resolved') ||
      (getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.closed &&
        'Closed'),
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
