import {
  RHFDatePicker,
  RHFTextField,
  RHFTimePicker,
} from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const dataBackUpValidationSchema = Yup?.object()?.shape({
  dataBaseName: Yup?.string(),
});

export const dataBackUpDefaultValues = {
  dataBaseName: '',
};

export const dataBackUp = [
  {
    componentProps: {
      name: 'dataBaseName',
      label: 'Data Base Name ',
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
      name: 'BackUpTime',
      label: 'Backup Time',
      fullWidth: true,
    },
    component: RHFTimePicker,
    md: 6,
  },
];
