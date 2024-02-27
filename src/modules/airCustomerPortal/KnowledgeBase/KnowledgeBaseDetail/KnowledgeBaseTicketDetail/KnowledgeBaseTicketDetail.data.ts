import { RHFCheckbox, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const feedbackValidationSchema = Yup?.object()?.shape({
  information: Yup?.string(),
  understand: Yup?.string(),
  content: Yup?.string(),
  link: Yup?.string(),
  comment: Yup?.string(),
});
export const feedbackDefaultValues = {
  information: '',
  understand: '',
  content: '',
  link: '',
  comment: '',
};

export const feedbackDataArray = [
  {
    id: 2355,
    componentProps: {
      name: 'information',
      label: 'Need More Information',
    },
    component: RHFCheckbox,
  },
  {
    id: 4567,
    componentProps: {
      name: 'understand',
      label: 'Difficult to Understand',
    },
    component: RHFCheckbox,
  },
  {
    id: 3467,
    componentProps: {
      name: 'content',
      label: 'Inaccurate/irrelevant content',
    },
    component: RHFCheckbox,
  },
  {
    id: 5476,
    componentProps: {
      name: 'link',
      label: 'Missing/broken link',
    },
    component: RHFCheckbox,
  },
  {
    id: 6547,
    componentProps: {
      name: 'comment',
      label: 'Comment here',
      placeholder: 'Write something',
      fullWidth: true,
      multiline: true,
      minRows: 3,
    },
    component: RHFTextField,
  },
];
