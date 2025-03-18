import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup?.object()?.shape({
    collaborators: Yup.array().of(
      Yup.object().shape({
        sharedUserData: Yup.mixed().nullable()?.required('Field is Required'),
        permissions: Yup?.string()?.trim()?.required('Field is Required'),
      }),
    ),
  });
};

const defaultCollaborator = [
  {
    sharedUserData: null,
    permissions: '',
  },
];

export const defaultValues = (data: any) => {
  return {
    collaborators:
      data?.sharedWithUsers?.length > 0
        ? data?.sharedWithUsers
        : defaultCollaborator,
    emailContent: data?.emailContent ?? '',
  };
};
