import { GLOBAL_CHARACTERS_LIMIT } from '@/constants/validation';
import * as yup from 'yup';

export const holidayDefaultValues = {
  name: '',
  date: null,
};

export const holidayValidationSchema: any = yup?.object()?.shape({
  name: yup
    ?.string()
    ?.required('Name is required')
    ?.min(3, 'At least 3 characters required')
    ?.max(
      GLOBAL_CHARACTERS_LIMIT?.NAME,
      `Maximum characters limit is ${GLOBAL_CHARACTERS_LIMIT?.NAME}`,
    ),
  date: yup?.string()?.nullable()?.required('Date is required'),
});
