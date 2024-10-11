import * as Yup from 'yup';

export const selectAgentSchema = Yup?.object()?.shape({
  agents: Yup?.array()?.required('Agents is Required'),
});

export const selectAgentDefaultValues = (agentsDetails: any) => ({
  agents: agentsDetails ?? [],
});
