import * as Yup from 'yup';

export const moveToCategoryValidationSchema: any = Yup?.object()?.shape({
  category: Yup?.mixed()?.nullable()?.required('Category is required'),
});

export const moveToCategoryDefaultValues = {
  category: null,
};
