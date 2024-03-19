import * as Yup from 'yup';

export const dealPipelinesvalidationSchema = Yup?.object()?.shape({
  pipelineName: Yup?.string()?.required('Field is Required'),
  // probability: Yup?.string()?.required('Field is Required'),
});
