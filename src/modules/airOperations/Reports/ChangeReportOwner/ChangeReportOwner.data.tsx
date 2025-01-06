import * as Yup from 'yup';

export const changeReportOwnerFormDefaultValuesDynamic = (data?: any) => {
  return {
    owner: data?.owner ?? null,
  };
};

export const changeReportOwnerFormValidationSchemaDynamic =
  Yup?.object()?.shape({
    owner: Yup?.mixed()?.nullable()?.required('Owner name is Required'),
  });
