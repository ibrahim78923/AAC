import * as Yup from 'yup';

export const validationSchema = (
  existingEmails: string[] = [],
  isEditMode: boolean = false,
) =>
  Yup.object().shape({
    signeeName: Yup?.string()?.trim()?.required('Field is Required'),
    company: Yup?.mixed()?.nullable()?.required('Field is Required'),
    signeeEmail: Yup.string()
      ?.trim()
      ?.email('Invalid email')
      .required('Field is Required')
      .test(
        'unique-email',
        'This email is already used by another signee',
        (value) => {
          if (isEditMode) {
            return true;
          }
          // Check if the email is already in the existing emails
          return !existingEmails.includes(value?.toLowerCase());
        },
      ),
  });
