import * as Yup from 'yup';

export const importDefaultValues = {
  file: null,
  csvColumns: [],
};

export const importValidationSchema = Yup?.object()?.shape({
  file: Yup?.mixed()?.nullable()?.required('File is required'),
  fileUrl: Yup?.string(),
  csvColumns: Yup?.array()?.of(
    Yup?.object()?.shape({
      csvColumn: Yup?.string(),
      crmColumn: Yup?.mixed()?.nullable()?.required('Selection is required'),
    }),
  ),
});
