import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const articleFeedbackFormValidationSchema = () =>
  Yup?.object()?.shape({
    email: Yup?.string()
      ?.email('Enter valid email')
      ?.required('Email is required'),
    feedback: Yup?.array()
      ?.required('Field is required')
      ?.min(1, 'At least one field is required'),
    comment: Yup?.string(),
  });

export const articleFeedbackFormDefaultValues = (
  email?: string | undefined,
) => {
  return {
    email: email ?? '',
    feedback: null,
    comment: '',
  };
};

export const articleFeedbackFormFieldsDynamic = (email?: string) => [
  {
    _id: 1,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'User Email',
      required: true,
      disabled: !!email,
    },
    component: RHFTextField,
  },
  //TODO: will be used when added by BE in api
  // {
  //   _id: 2,
  //   componentProps: {
  //     name: 'name',
  //     label: 'Name',
  //     placeholder: 'Enter Name',
  //     required: true,
  //   },
  //   component: RHFTextField,
  // },
  {
    _id: 3,
    componentProps: {
      name: 'feedback',
      label: 'Your Feedback',
      required: true,
      options: [
        { value: 'Need More Information', label: 'Need More Information' },
        { value: 'Difficult to Understand', label: 'Difficult to Understand' },
        {
          value: 'Inaccurate/irrelevant content',
          label: 'Inaccurate/irrelevant content',
        },
        { value: 'Missing/broken link', label: 'Missing/broken link' },
        { value: 'Others', label: 'Others' },
      ],
    },
    component: RHFMultiCheckbox,
  },
  {
    _id: 4,
    componentProps: {
      name: 'comment',
      label: 'Comment Here',
      placeholder: 'Write something',
      fullWidth: true,
      multiline: true,
      rows: 3,
    },
    component: RHFTextField,
  },
];
