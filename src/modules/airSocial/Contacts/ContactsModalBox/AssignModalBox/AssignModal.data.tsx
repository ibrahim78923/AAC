import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';

export const customValidationSchema = Yup?.object()?.shape({
  contactOwnerId: Yup?.mixed()?.required('Field is Required'),
});

export const defaultValues = {
  contactOwnerId: null,
};

export const AssignModalData = (contactOwnerData: any, orgId: any) => {
  return [
    {
      id: 'contactOwnerId',
      component: RHFAutocompleteAsync,
      md: 12,
      componentProps: {
        name: 'contactOwnerId',
        label: 'Contact Owner',
        placeholder: 'Select Owner',
        apiQuery: contactOwnerData,
        getOptionLabel: (option: any) =>
          `${option?.firstName} ${option?.lastName}`,
        externalParams: { id: orgId, meta: false },
      },
    },
  ];
};
