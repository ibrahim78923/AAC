import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const dealPipelinesvalidationSchema = Yup.object().shape({
  pipelineName: Yup.string().required('Field is Required'),
  defaultPipeline: Yup.string(),
});

export const dealPipelinesDefaultValues = {
  pipelineName: '',
  defaultPipeline: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'pipelineName',
      label: 'Pipeline Name',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'defaultPipeline',
      label: 'Mark as Default Pipeline',
      fullWidth: true,
    },
    component: RHFCheckbox,
    md: 12,
  },
];
