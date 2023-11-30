import { IAVATARGROUPDATA } from '@/types/shared/AvatarGroup';

import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';
import {
  useGetPlanTypesQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/plan-mangement';

import * as Yup from 'yup';

export const avatarGroupMockData: IAVATARGROUPDATA[] = [
  {
    id: '01',
    name: 'Ahsan',
    img: 'https://images.pexels.com/photos/1549974/pexels-photo-1549974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '02',
    name: 'Shehroz',
    img: 'https://adayinourshoes.com/wp-content/uploads/strong-child.jpg',
  },
  {
    id: '03',
    name: 'Waseeem',
    img: 'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
  },
  {
    id: '04',
    name: 'Waseeem',
    img: 'https://image.cnbcfm.com/api/v1/image/107081378-1656361235570-GettyImages-1225403728_2.jpg?v=1656361293',
  },
  {
    id: '05',
    name: 'Waseeem',
    img: 'https://149405263.v2.pressablecdn.com/wp-content/uploads/2021/05/little-boy-all-alone-with-teddy-bear.jpeg',
  },
  {
    id: '06',
    name: 'Waseeem',
    img: 'https://media.istockphoto.com/id/1283599879/photo/happiness-and-wellbeing.jpg?s=612x612&w=0&k=20&c=3JSSHPtdhL0dtA1zcVu4mfNw6FVlskRC2kk_Rl9FKU8=',
  },
];

export const planManagementFilterValidationSchema = Yup?.object()?.shape({
  productId: Yup?.string()?.trim()?.required('Field is Required'),
  planTypeId: Yup.string()?.trim()?.required('Field is Required'),
  createdAt: Yup?.string()?.trim()?.required('Field is Required'),
});

export const planManagementFilterDefaultValues = {
  productId: '',
  planTypeId: '',
  createdAt: null,
};

export const planManagementFilterFiltersDataArray = () => {
  const { data } = useGetProductsQuery({});

  const productsOptions: { value: number; label: string } = data?.data?.map(
    (products: any) => {
      return {
        value: products?._id,
        label: products?.name,
      };
    },
  );
  const { data: planTypeData } = useGetPlanTypesQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  return [
    {
      componentProps: {
        name: 'productId',
        label: 'Products',
        select: true,
      },
      options: productsOptions,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'planTypeId',
        label: 'Plan',
        select: true,
      },
      options: planType,
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'createdAt',
        label: 'Created Date',
        fullWidth: true,
      },
      component: RHFSwitchableDatepicker,
      md: 12,
    },
  ];
};
