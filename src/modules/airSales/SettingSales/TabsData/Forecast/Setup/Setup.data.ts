import * as Yup from 'yup';

export const SetupValidationSchema = Yup.object().shape({
  addNetwork: Yup.string().required('Field is Required'),
});

export const SetupDefaultValues = {
  addNetwork: '',
};
