import { IAVATARGROUPDATA } from '@/types/shared/AvatarGroup';

import { RHFSelect, RHFSwitchableDatepicker } from '@/components/ReactHookForm';

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
  products: Yup?.string()?.trim()?.required('Field is Required'),
  plan: Yup.string()?.trim()?.required('Field is Required'),
  createdDate: Yup?.string()?.trim()?.required('Field is Required'),
});

export const planManagementFilterDefaultValues = {
  products: '',
  plan: '',
  createdDate: null,
};

export const planManagementFilterFiltersDataArray = [
  {
    componentProps: {
      name: 'products',
      label: 'Products',
      select: true,
    },
    options: [
      { value: 'Sales', label: 'Sales' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Service', label: 'Service' },
      { value: 'Operations', label: 'Operations' },
      { value: 'Loyalty Program', label: 'Loyalty Program' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'plan',
      label: 'Plan',
      select: true,
    },
    options: [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'William', label: 'William' },
      { value: 'Andrew', label: 'Andrew' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'createdDate',
      label: 'Created Date',
      fullWidth: true,
    },
    component: RHFSwitchableDatepicker,
    md: 12,
  },
];
