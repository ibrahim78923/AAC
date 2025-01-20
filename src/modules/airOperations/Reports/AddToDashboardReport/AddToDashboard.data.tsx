import * as Yup from 'yup';

export const addToDashboardReportFormDefaultValuesDynamic = (
  singleSelectedReportDashboardList?: any,
) => {
  return {
    dashboard: singleSelectedReportDashboardList ?? [],
  };
};

export const addToDashboardReportFormValidationSchemaDynamic =
  Yup?.object()?.shape({
    dashboard: Yup?.array()?.min(1, 'Dashboard is Required'),
  });
