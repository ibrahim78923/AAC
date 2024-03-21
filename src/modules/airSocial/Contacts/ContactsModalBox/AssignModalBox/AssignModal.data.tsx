import { RHFSelect } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  contact: Yup?.string()?.required('Field is Required'),
});

export const defaultValues = {
  contact: '',
};

export const AssignModalData = (contactOwnerData: any) => {
  return [
    {
      id: 'contactOwnerId',
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select',
        select: true,
      },
      options: contactOwnerData,
      component: RHFSelect,
      md: 4,
    },
  ];
};
