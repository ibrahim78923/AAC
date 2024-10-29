import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const feedbackValidationSchema = (emailValidation: any) =>
  Yup?.object()?.shape({
    email: Yup?.string()?.when(() =>
      emailValidation
        ? Yup?.string()?.email()?.required('Email is required')
        : Yup?.string()?.notRequired(),
    ),
    feedback: Yup?.array()
      ?.required('Field is required')
      ?.min(1, 'At least one field is required'),
    comment: Yup?.string(),
  });

export const feedbackDefaultValues = {
  email: '',
  feedback: null,
  comment: '',
};

export const feedbackDataArray = [
  {
    id: 9584,
    showField: false,
    componentProps: {
      name: 'email',
      label: 'Email',
      placeholder: 'User Email',
      size: 'small',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 2355,
    showField: true,
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
    id: 6547,
    showField: true,
    componentProps: {
      name: 'comment',
      label: 'Comment Here',
      placeholder: 'Write something',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
];
