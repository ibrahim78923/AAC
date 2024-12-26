import * as Yup from 'yup';

export const assignedTicketsFormValidationSchema = Yup?.object()?.shape({
  agent: Yup?.mixed()?.nullable()?.required('Agent is required'),
});

export const assignedTicketsFormDefaultValues = {
  agent: null,
};
