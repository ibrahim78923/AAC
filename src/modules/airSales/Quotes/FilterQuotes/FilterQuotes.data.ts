import { RHFAutocomplete, RHFSelect } from '@/components/ReactHookForm';
export const defaultValues = {
  quoteStatus: '',
  createdBy: '',
};

export const dataArray = (UserListData: any) => {
  return [
    {
      md: 12,
      component: RHFAutocomplete,
      componentProps: {
        name: 'status',
        label: 'Quote Status',
        placeholder: 'Select Quote Status',
        fullWidth: true,
        options: ['All', 'DRAFT', 'PUBLISHED'],
      },
    },
    {
      md: 12,
      component: RHFSelect,
      options: UserListData?.data?.usercompanyaccounts?.map((item: any) => ({
        value: item?._id,
        label: `${item?.user?.firstName} ${item?.user?.lastName}`,
      })),
      componentProps: {
        name: 'createdBy',
        label: 'Created By',
        fullWidth: true,
        select: true,
      },
    },
  ];
};
