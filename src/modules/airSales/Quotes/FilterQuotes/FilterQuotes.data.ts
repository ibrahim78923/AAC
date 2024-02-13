import { RHFSelect } from '@/components/ReactHookForm';

export const defaultValues = {
  quoteStatus: '',
  createdBy: '',
};

export const dataArray = (UserListData: any) => {
  return [
    {
      md: 12,
      component: RHFSelect,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
      componentProps: {
        name: 'status',
        label: 'Quote Status',
        fullWidth: true,
        select: true,
      },
    },
    {
      md: 12,
      component: RHFSelect,
      options: UserListData?.data?.users?.map((item: any) => ({
        value: item?._id,
        label: `${item?.firstName} ${item?.lastName}`,
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
