import * as Yup from 'yup';

export const emailTemplateSchema: any = Yup?.object()?.shape({
  emailTemplate: Yup?.string()
    ?.trim()
    ?.required('Required')
    ?.test('is-not-empty', 'Required', (value) => {
      const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
      return strippedContent !== '';
    }),
});

export const defaultValues = {
  emailTemplate: '',
};

export const templateDropdownFunction = () => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [],
    handleClick: (close: any) => {
      close?.(false);
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [],
    handleClick: (close: any) => {
      close?.(false);
    },
  },
];
