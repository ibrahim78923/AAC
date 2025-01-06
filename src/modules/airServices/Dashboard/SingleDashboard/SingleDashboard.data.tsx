import * as Yup from 'yup';

export const singleDashboardDefaultValues = { dashboardId: null };
export const singleDashboardValidationSchema = Yup?.object()?.shape({
  dashboardId: Yup?.mixed()?.nullable(),
});
