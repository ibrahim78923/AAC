import * as Yup from 'yup';

export const importLocationValidationSchema = Yup?.object()?.shape({
  addFile: Yup?.mixed()?.nullable()?.required('Required'),
});

export const importLocationDefaultValue = (data?: any) => {
  return {
    addFile: data?.requester ?? null,
  };
};
