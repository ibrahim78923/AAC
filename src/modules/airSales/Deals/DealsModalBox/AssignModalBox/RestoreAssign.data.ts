import { RHFSelect } from '@/components/ReactHookForm';
import { useGetAllUsersDropdownQuery } from '@/services/common-APIs';
import { getActiveProductSession } from '@/utils';

export const defaultValues = {
  dealOwnerId: '',
};
export const RestoreModalData = () => {
  const ActiveProduct = getActiveProductSession();
  const ownerData = useGetAllUsersDropdownQuery({
    params: { productId: ActiveProduct?._id },
  });

  return [
    {
      id: 'ownerId',
      md: 12,
      component: RHFSelect,
      componentProps: {
        name: 'ownerId',
        label: 'Deal Owner',
        select: true,
        placeholder: 'Select Deal Owner',
      },
      options: ownerData?.data?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })),
    },
  ];
};
