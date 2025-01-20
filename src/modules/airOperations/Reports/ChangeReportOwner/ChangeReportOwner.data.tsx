import * as Yup from 'yup';

export const changeReportOwnerFormDefaultValuesDynamic = (
  singleSelectedOwner?: any,
) => {
  return {
    owner: singleSelectedOwner ?? null,
  };
};

export const changeReportOwnerFormValidationSchemaDynamic =
  Yup?.object()?.shape({
    owner: Yup?.mixed()?.nullable()?.required('Owner name is Required'),
  });
