import * as Yup from 'yup';

export const dealPipelinesvalidationSchema = Yup?.object()?.shape({
  pipelineName: Yup?.string()?.required('Field is Required'),
});

export const dealPipelinesDefaultValues = {
  pipelineName: '',
  defaultPipeline: false,
};
