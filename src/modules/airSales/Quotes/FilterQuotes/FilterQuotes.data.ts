import { RHFSelect } from '@/components/ReactHookForm';
import { quoteStatus } from '@/routesConstants/paths';
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
        { value: 'DRAFT', label: quoteStatus?.draft },
        { value: 'PUBLISHED', label: quoteStatus?.published },
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
