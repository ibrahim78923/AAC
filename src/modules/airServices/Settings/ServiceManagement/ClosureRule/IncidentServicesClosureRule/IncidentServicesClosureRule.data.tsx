import { IClosureRuleProps } from '../ClosureRule.interface';

export const getIncidentServicesClosureRuleDataArray = (
  props: IClosureRuleProps,
) => {
  const {
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
  } = props;

  return [
    {
      title: 'Incident',
      conditions: [
        {
          conditionText: 'Close an Incident only if',
          props: { closeIncident: true, closeIncidentData },
        },
        {
          conditionText: 'Resolve an Incident only if',
          props: { resolveIncident: true, resolveIncidentData },
        },
      ],
    },
    {
      title: 'Services Request',
      conditions: [
        {
          conditionText: 'Resolve a Services Request only if',
          props: { serviceResolveIncident: true, serviceResolveData },
        },
        {
          conditionText: 'Close a Services Request only if',
          props: { serviceCloseIncident: true, serviceCloseData },
        },
      ],
    },
  ];
};
