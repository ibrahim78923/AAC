import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAllUsersDropdownQuery } from '@/services/common-APIs';
import { getActiveProductSession } from '@/utils';

export const RestoreModalData = () => {
  const ActiveProduct = getActiveProductSession();
  const ownerData = useLazyGetAllUsersDropdownQuery();

  return [
    {
      id: 'ownerId',
      md: 12,
      component: RHFAutocompleteAsync,
      componentProps: {
        name: 'ownerId',
        label: 'Deal Owner',
        select: true,
        placeholder: 'Select Deal Owner',
        apiQuery: ownerData,
        getOptionLabel: (option: any) =>
          `${option.firstName} ${option.lastName}`,
        externalParams: { productId: ActiveProduct?._id },
      },
    },
  ];
};
