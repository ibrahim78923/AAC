import { RHFMultiCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const feedbackValidationSchema = Yup?.object()?.shape({
  feedback: Yup?.array()
    ?.required('Field is Required')
    ?.min(1, 'At least one field is required'),
  comment: Yup?.string(),
});
export const feedbackDefaultValues = {
  feedback: null,
  comment: '',
};

export const feedbackDataArray = [
  {
    id: 2355,
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
