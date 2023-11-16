import * as Yup from 'yup';
export const validationSchemaModules = Yup?.object()?.shape({
  permissionSlugs: Yup?.array()
    ?.min(1, 'Field is Required')
    ?.max(10, 'Field is Required')
    ?.required('Field is Required'),
});

export const defaultValuesModules = {
  permissionSlugs: [],
};

export const validationSchemaPlanFeatures = Yup?.object()?.shape({
  featureId: Yup?.string()?.required('Field is Required'),
});

export const defaultValuesPlanFeatures = {
  featureId: '',
};
