import * as Yup from 'yup';

export const contractAllocationFormValidationSchema = Yup?.object()?.shape({
  contract: Yup?.mixed()?.required('Contract is required'),
});

export const contractAllocationFormDefaultValues = { contract: null };
