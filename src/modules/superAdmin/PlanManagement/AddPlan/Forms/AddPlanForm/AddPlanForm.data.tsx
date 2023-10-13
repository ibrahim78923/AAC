import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';

export const defaultValues = {
  category: '',
  product: '',
  planType: '',
  description: '',
  defaultUsers: '',
  defaultStorage: '',
  planPrice: '',
  allowAdditionalUsers: '',
  additionalPricePerUser: '',
  allowAdditionalStorage: '',
  additionalStoragePrice: '',
};

export const gpDetailsInfoFormSchema: any = Yup.object().shape({
  category: Yup.string().required('Required field'),
  product: Yup.string().required('Required field'),
  planType: Yup.string().required('Required field'),
  description: Yup.string()
    .trim()
    .required('Required field')
    .min(1, 'Mininum 1 characters')
    .max(400, 'Maximum 400 characters'),
  defaultUsers: Yup.string()
    .trim()
    .required('Required field')
    .matches(/^[A-Za-z\s]*$/, 'only Aplhabets are allowed')
    .min(1, 'Mininum 1 characters')
    .max(30, 'Maximum 50 characters'),
  defaultStorage: Yup.string()
    .trim()
    .required('Required field')
    .min(1, 'Mininum 1 characters')
    .max(50, 'Maximum 50 characters'),
  planPrice: Yup.string()
    .matches(/^[0-9]*$/, 'must be a number')
    .required('Required field')
    .min(12, 'Mininum 1 characters')
    .max(12, 'max is 12'),
  allowAdditionalUsers: Yup.string().required('Required field'),
  additionalPricePerUser: Yup.string()
    .matches(/^[0-9]*$/, 'must be a number')
    .required('Required field')
    .min(12, 'Mininum 1 characters')
    .max(12, 'max is 12'),
  allowAdditionalStorage: Yup.string().required('Required field'),
  additionalStoragePrice: Yup.string()
    .matches(/^[0-9]*$/, 'must be a number')
    .required('Required field')
    .min(12, 'Mininum 1 characters')
    .max(12, 'max is 12'),
});

export const defaultValuesFunction = (data: any = defaultValues) => {
  const {
    category,
    product,
    planType,
    description,
    defaultUsers,
    defaultStorage,
    planPrice,
    allowAdditionalUsers,
    additionalPricePerUser,
    allowAdditionalStorage,
    additionalStoragePrice,
  } = data;
  return {
    category,
    product,
    planType,
    description,
    defaultUsers,
    defaultStorage,
    planPrice,
    allowAdditionalUsers,
    additionalPricePerUser,
    allowAdditionalStorage,
    additionalStoragePrice,
  };
};

export const dataArray = (isFieldDisable = false) => [
  {
    id: 1,
    componentProps: {
      fullWidth: true,
      name: 'product',
      label: 'Product',
      select: true,
      disabled: isFieldDisable,
    },
    options: [{ value: 'Products', label: 'Products' }],
    gridLength: 6,
    component: RHFSelect,
    md: 6,
  },
  {
    id: 2,
    componentProps: {
      fullWidth: true,
      name: 'planType',
      label: 'Plan Type',
      select: true,
      // disabled: isFieldDisable,
    },
    options: [{ value: 'Plan Type', label: 'Plan Type' }],
    // gridLength: 6,
    component: RHFSelect,
    md: 6,
  },
  {
    id: 3,
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
    },
    component: RHFTextField,
    gridLength: 6,
    md: 6,
  },
  {
    id: 4,
    componentProps: {
      name: 'defaultUsers',
      label: 'Default Users',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 5,
    componentProps: {
      name: 'defaultStorage',
      label: 'Default Storage',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 6,
    componentProps: {
      name: 'planPrice',
      label: 'Plan Price',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 7,
    componentProps: {
      name: 'allowAdditionalUsers',
      label: 'Allow Additional Users',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    options: [{ value: 'User', label: 'User' }],
    md: 6,
  },
  {
    id: 8,
    componentProps: {
      name: 'additionalPricePerUser',
      label: 'Additional Per User Price',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
  {
    id: 9,
    componentProps: {
      name: 'allowAdditionalStorage',
      label: 'Allow Additional Storage',
      fullWidth: true,
      select: true,
    },
    component: RHFSelect,
    options: [{ value: 'Storage', label: 'Storage' }],
    md: 6,
  },
  {
    id: 10,
    componentProps: {
      name: 'additionalStoragePrice',
      label: 'Additional Storage Price (Per GB)',
      fullWidth: true,
    },
    component: RHFTextField,
    md: 6,
  },
];
