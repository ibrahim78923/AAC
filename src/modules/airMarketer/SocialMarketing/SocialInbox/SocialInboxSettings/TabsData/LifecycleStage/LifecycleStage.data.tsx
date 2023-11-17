import * as Yup from 'yup';

export const socialSalesvalidationSchema = Yup?.object()?.shape({
  stageName: Yup?.string()?.required('Field is Required'),
});

export const socialSalesDefaultValues = {
  stageName: '',
};
