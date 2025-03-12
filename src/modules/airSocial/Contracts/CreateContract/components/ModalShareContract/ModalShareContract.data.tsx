import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup?.object()?.shape({
    collaborators: Yup.array().of(
      Yup.object().shape({
        user: Yup.mixed().nullable()?.required('Field is Required'),
        permission: Yup?.string()?.trim()?.required('Field is Required'),
      }),
    ),
  });
};

const defaultCollaborator = [
  {
    user: null,
    permission: '',
  },
];

export const defaultValues = (data: any) => {
  return {
    collaborators:
      data?.sharedWithUserIds?.length > 0
        ? data?.sharedWithUserIds
        : defaultCollaborator,
    emailContent: data?.emailContent ?? '',
  };
};
