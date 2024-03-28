import * as Yup from 'yup';
export const validationSchemaModules = Yup?.object()?.shape({
  permissionSlugs: Yup?.array(),
});

export const defaultValuesModules = {
  permissionSlugs: [],
};

export const validationSchemaPlanFeatures = Yup?.object()?.shape({
  // featureId: Yup?.string()?.required('Field is Required'),
});

export const defaultValuesPlanFeatures = {
  features: [],
};
