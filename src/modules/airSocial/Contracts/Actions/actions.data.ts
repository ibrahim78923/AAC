import * as Yup from 'yup';

export const associationsValidationSchema = Yup.object().shape({
  deal: Yup?.mixed()?.nullable()?.required('Required'),
});
export const associationsDefaultValues = {
  deal: null,
};
