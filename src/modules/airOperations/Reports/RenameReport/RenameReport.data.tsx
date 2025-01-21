import * as Yup from 'yup';

export const renameReportFormDefaultValuesDynamic = (
  singleSelectedReportName?: string,
) => {
  return {
    name: singleSelectedReportName ?? null,
  };
};

export const renameReportFormValidationSchemaDynamic = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Report name is required'),
});
