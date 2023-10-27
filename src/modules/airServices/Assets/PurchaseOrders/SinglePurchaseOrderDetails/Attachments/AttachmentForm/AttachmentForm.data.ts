import * as Yup from 'yup';

export const defaultValues = {
  attachments: null,
};

export const validationSchema: any = Yup?.object()?.shape({
  attachments: Yup?.mixed()?.nullable()?.required('Select a File!'),
});
