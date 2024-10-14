import { RHFSelect } from '@/components/ReactHookForm';

export const defaultValues = {
  dealOwnerId: '',
};
export const RestoreModalData = (UserListData: any) => {
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
      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
      })),
    },
  ];
};
