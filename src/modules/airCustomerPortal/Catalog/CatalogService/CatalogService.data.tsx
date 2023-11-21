import {
  RHFDatePicker,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dataBackUpValidationSchema = Yup?.object()?.shape({
  dataBaseName: Yup?.string(),
  backUpData: Yup?.string(),
  backUpTime: Yup?.string(),
});

export const dataBackUpDefaultValues = {
  dataBaseName: '',
  backUpData: '',
  backUpTime: ',',
};

export const dataBackUp = [
  {
    componentProps: {
      name: 'dataBaseName',
      label: 'Database Name ',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'backUpData',
      label: 'BackUp Date',
      fullWidth: true,
    },
    component: RHFDatePicker,
    md: 6,
  },
  {
    componentProps: {
      name: 'backUpTime',
      label: 'Backup Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];
