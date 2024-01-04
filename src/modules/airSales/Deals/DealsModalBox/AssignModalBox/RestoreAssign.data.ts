import { RHFTextField } from '@/components/ReactHookForm';

export const defaultValues = {
  dealOwnerId: 'select',
};
export const RestoreModalData = (UserListData: any) => {
  return [
    {
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        select: true,
        defaultValues: 'Select',
      },
      options: UserListData?.data?.users?.map((item: any) => {
        return {
          value: item?._id,
          label: `${item?.firstName} ${item?.lastName}`,
        };
      }) ?? [{ label: 'Select', value: 'Select' }],
      component: RHFTextField,
    },
  ];
};
