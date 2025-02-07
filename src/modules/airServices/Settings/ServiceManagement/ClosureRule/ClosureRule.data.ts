import { RHFRadioGroup, RHFCheckbox } from '@/components/ReactHookForm';

export const closureRuleDefaultValues = (
  getClosureRuleValues: any,
  ticket: any,
) => {
  return {
    closeIncidentTimeAdded:
      getClosureRuleValues?.incident?.[ticket?.incidentClose]?.timeEntryAdded ??
      false,
    closeIncidentAssociatedTasks:
      getClosureRuleValues?.incident?.[ticket?.incidentClose]
        ?.associatedTasksCompleted ?? false,
    closeIncidentChildTickets:
      (getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.closed ||
        getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
          ?.resolved) ??
      false,
    closeIncidentClosedResolved:
      (getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.resolved &&
        'IncidentCloseEither') ||
      (getClosureRuleValues?.incident?.[ticket?.incidentClose]?.childTickets
        ?.closed &&
        'IncidentCloseClosed'),

    resolveIncidentTimeAdded:
      getClosureRuleValues?.incident?.[ticket?.incidentResolve]
        ?.timeEntryAdded ?? false,
    resolveIncidentAssociatedTasks:
      getClosureRuleValues?.incident?.[ticket?.incidentResolve]
        ?.associatedTasksCompleted ?? false,
    resolveIncidentChildTickets:
      (getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.closed ||
        getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
          ?.resolved) ??
      false,
    resolveIncidentClosedResolved:
      (getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.resolved &&
        'IncidentResolveEither') ||
      (getClosureRuleValues?.incident?.[ticket?.incidentResolve]?.childTickets
        ?.closed &&
        'IncidentResolveClosed'),

    serviceCloseTimeAdded:
      getClosureRuleValues?.services?.[ticket?.serviceClose]?.timeEntryAdded ??
      false,
    serviceCloseAssociatedTasks:
      getClosureRuleValues?.services?.[ticket?.serviceClose]
        ?.associatedTasksCompleted ?? false,
    serviceCloseChildTickets:
      (getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.closed ||
        getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
          ?.resolved) ??
      false,
    serviceCloseClosedResolved:
      (getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.resolved &&
        'ServiceResolveEither') ||
      (getClosureRuleValues?.services?.[ticket?.serviceClose]?.childTickets
        ?.closed &&
        'ServiceResolveClosed'),

    serviceResolveTimeAdded:
      getClosureRuleValues?.services?.[ticket?.serviceResolve]
        ?.timeEntryAdded ?? false,
    serviceResolveAssociatedTasks:
      getClosureRuleValues?.services?.[ticket?.serviceResolve]
        ?.associatedTasksCompleted ?? false,
    serviceResolveChildTickets:
      (getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.closed ||
        getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
          ?.resolved) ??
      false,
    serviceResolveClosedResolved:
      (getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.resolved &&
        'ServiceCloseEither') ||
      (getClosureRuleValues?.services?.[ticket?.serviceResolve]?.childTickets
        ?.closed &&
        'ServiceCloseClosed'),
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
      options: [{ value: 'IncidentCloseClosed', label: 'Closed' }],
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
      options: [{ value: 'IncidentResolveEither', label: 'Resolved' }],
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
      options: [{ value: 'ServiceCloseEither', label: 'Resolved' }],
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
      options: [{ value: 'ServiceResolveClosed', label: 'Closed' }],
    },
    component: RHFRadioGroup,
  },
];
