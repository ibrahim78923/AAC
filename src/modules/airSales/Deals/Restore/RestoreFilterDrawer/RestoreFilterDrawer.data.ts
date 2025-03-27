import * as yup from 'yup';

export const restoreDataValidationSchema: any = yup.object().shape({
  startDate: yup.date().required('Start date is required'),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date cannot be before start date'),
});

export const restoreDefaultValues = (data: any) => {
  return {
    startDate:
      typeof data?.dateStart === 'object' ? new Date(data?.dateStart) : null,
    endDate: typeof data?.dateEnd === 'object' ? new Date(data?.dateEnd) : null,
  };
};
