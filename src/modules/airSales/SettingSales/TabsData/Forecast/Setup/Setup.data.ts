import * as Yup from 'yup';

export const SetupValidationSchema = Yup.object().shape({
  addNetwork: Yup.string(),
});

export const SetupDefaultValues = {
  addNetwork: '',
};
