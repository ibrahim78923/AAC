import * as Yup from 'yup';

export const renameReportFormDefaultValuesDynamic = (data?: any) => {
  return {
    name: data?.name ?? null,
  };
};

export const renameReportFormValidationSchemaDynamic = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Report name is required'),
});
