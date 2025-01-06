import * as Yup from 'yup';

export const addToDashboardReportFormDefaultValuesDynamic = (data?: any) => {
  return {
    dashboard: data?.dashboard ?? [],
  };
};

export const addToDashboardReportFormValidationSchemaDynamic =
  Yup?.object()?.shape({
    dashboard: Yup?.array()?.min(1, 'Dashboard is Required'),
  });
