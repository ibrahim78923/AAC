import { PercentageCircleIcon } from '@/assets/icons';
import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import { IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';

export const dealPipelinesvalidationSchema = Yup?.object()?.shape({
  pipelineName: Yup?.string()?.required('Field is Required'),
  defaultPipeline: Yup?.string(),
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
      placeholder: 'Inbound Sales',
      required: true,
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
  {
    componentProps: {
      name: 'new(default)',
      label: '',
      fullWidth: true,
      placeholder: 'New',
    },
    component: RHFTextField,
    md: 5,
  },
  {
    componentProps: {
      name: 'new(default)',
      label: '',
      fullWidth: true,
      placeholder: 'New',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <PercentageCircleIcon />
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    component: RHFTextField,
    md: 5,
  },
];
