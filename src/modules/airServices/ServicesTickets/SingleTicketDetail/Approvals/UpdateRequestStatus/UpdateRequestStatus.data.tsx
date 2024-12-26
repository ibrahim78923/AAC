import * as Yup from 'yup';

export const updateRequestStatusDefaultValues = {
  reason: '',
};

export const updateRequestStatusValidationSchema = Yup?.object()?.shape({
  reason: Yup?.string()?.trim()?.required('Remark is required'),
});
