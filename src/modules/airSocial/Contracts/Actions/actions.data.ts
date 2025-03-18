import * as Yup from 'yup';

export const associationsValidationSchema = Yup.object().shape({
  linkToDeal: Yup?.mixed()?.nullable()?.required('Required'),
});
export const associationsDefaultValues = {
  linkToDeal: null,
};
