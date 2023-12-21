import { RHFTextField } from '@/components/ReactHookForm';

import useDealSaleSite from '../../useDealSaleSite';

export const defaultValues = {
  dealOwnerId: 'select',
};
export const RestoreModalData = () => {
  const { DealsUserListData } = useDealSaleSite();

  return [
    {
      componentProps: {
        name: 'dealOwnerId',
        label: 'Deal Owner',
        select: true,
        defaultValues: 'Select',
      },
      options: DealsUserListData?.data?.useros?.map((item: any) => {
        return {
          value: item?._id,
          label: `${item?.firstName} ${item?.lastName}`,
        };
      }) ?? [{ label: 'Select', value: 'Select' }],
      component: RHFTextField,
    },
  ];
};
