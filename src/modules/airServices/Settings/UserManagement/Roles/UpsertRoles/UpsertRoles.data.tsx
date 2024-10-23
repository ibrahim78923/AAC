import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import { REGEX } from '@/constants/validation';
import * as Yup from 'yup';

export const upsertRolesValidationSchema = Yup?.object()?.shape({
  name: Yup?.string()
    ?.trim()
    ?.required('Name is required')
    ?.max(30, 'Name up to 30 characters'),
  description: Yup?.string()
    ?.trim()
    ?.required('Description is required')
    ?.test('is-not-empty', 'Description is required', (value) => {
      const strippedContent = value
        ?.replace(REGEX?.GLOBAL_HTML_TAG, '')
        ?.trim();
      return strippedContent !== '';
    }),
});

export const upsertRolesDefaultValues: any = (slugs: any) => {
  return {
    name: '',
    description: '',
    ...slugs,
  };
};

export const upsertRolesFormData = [
  {
    id: 1,
    componentProps: {
      label: 'Name',
      name: 'name',
      placeholder: 'Enter Role Name',
      required: true,
    },
    component: RHFTextField,
  },
  {
    id: 3,
    componentProps: {
      label: 'Description',
      name: 'description',
      placeholder: 'Enter Role Description',
      required: true,
      style: { height: '20vh' },
    },
    component: RHFEditor,
  },
];
