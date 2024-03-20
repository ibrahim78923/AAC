import * as Yup from 'yup';

export const dealPipelinesvalidationSchema = Yup?.object()?.shape({
  pipelineName: Yup?.string()?.required('Field is Required'),
  probability: Yup?.number()
    ?.required('Field is Required')
    .positive('Probability must be a positive number'),
});
