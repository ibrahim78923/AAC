import * as Yup from 'yup';

export const dealPipelinesvalidationSchema = Yup.object().shape({
  dealStages: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Field is Required'),
        probability: Yup.string().required('Field is Required'),
      }),
    )
    .required('At least one deal stage is required'),
  pipelineName: Yup.string().required('Field is Required'),
  defaultPipeline: Yup.boolean().optional(),
});

export const dealPipelinesDefaultValues = {
  dealStages: [
    { name: 'New', probability: '' },
    { name: 'Lost', probability: '' },
    { name: 'Won', probability: '' },
  ],
  pipelineName: '',
  defaultPipeline: false,
};
