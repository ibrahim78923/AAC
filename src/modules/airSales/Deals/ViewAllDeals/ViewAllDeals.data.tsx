import { RHFMultiCheckbox } from '@/components/ReactHookForm';
import { indexNumbers } from '@/constants';
import { capitalizeFirstLetter } from '@/utils/api';

export const viewDealsDeafultValues: any = {
  viewDeals: [],
};

export const viewDealsData: any = (newDealViewsData: any) => [
  {
    componentProps: {
      name: 'viewDeals',
      GridView: 12,
      options: newDealViewsData?.map((item: any) => ({
        value: item?._id,
        label: capitalizeFirstLetter(item?.name) ?? 'N/A',
        disabled: item?._id === indexNumbers?.ONE ? true : false,
      })),
    },
    component: RHFMultiCheckbox,
    md: 12,
  },
];
