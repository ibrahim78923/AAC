import { Checkbox } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import RHFDatePicker from '@/components/ReactHookForm/RHFDatePicker';

import { RHFSwitch, RHFTextField } from '@/components/ReactHookForm';

import { SwitchBtn } from '@/components/SwitchButton';

import { ExpandMore } from '@mui/icons-material';

import * as Yup from 'yup';
import { CommonAPIS } from '@/services/common-APIs';

export const columns: any = (columnsProps: any) => {
  const { checkedRows, setCheckedRows } = columnsProps;
  const handleCheckboxChange = (rowId: string) => {
    setCheckedRows(rowId);
  };

  return [
    {
      accessorFn: (row: any) => row?.organizationId,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.original?.organizationId}
          onChange={() =>
            handleCheckboxChange(info?.row?.original?.organizationId)
          }
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => info?.getValue(),
      header: 'Role ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Role Name',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.Products,
      id: 'products',
      isSortable: true,
      header: 'Products',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.CompanyAccount,
      id: 'companyAccount',
      isSortable: true,
      header: 'Company Accounts',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <SwitchBtn defaultValue={info?.row?.status} defaultChecked />
      ),
    },
  ];
};
export const rolesValidationSchema = Yup.object().shape({
  roleName: Yup.string().required('Field is Required'),
  product: Yup.string().required('Field is Required'),
  status: Yup.string().required('Field is Required'),
  createdDate: Yup.date().required('Field is Required'),
});

export const rolesDefaultValues = {
  roleName: '',
  product: '',
  status: '',
  createdDate: new Date(),
};

export const rolesFiltersArray = [
  {
    componentProps: {
      name: 'roleName',
      label: 'Role Name',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'CompanyOwner', label: 'Company Owner' },
      { value: 'SuperAdmin', label: 'Super Admin' },
    ],
    component: RHFSelect,
    md: 12,
  },
  {
    componentProps: {
      name: 'product',
      label: 'Product',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'sales', label: 'Sales' },
      { value: 'services', label: 'Services' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'loyaltyProgram', label: 'Loyalty Progrma' },
    ],
    component: RHFSelect,
    md: 12,
  },

  {
    componentProps: {
      name: 'status',
      label: 'Status',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
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
    component: RHFDatePicker,
    md: 12,
  },
];

export const addUserSchema = Yup.object().shape({
  productType: Yup.string().required('Field is Required'),
  companyAccount: Yup.string().required('Field is Required'),
  roleName: Yup.string().required('Field is Required'),
  defaultUser: Yup.string().required('Field is Required'),
  desc: Yup.string().required('Field is Required'),
});

export const addUserDefault = {
  productType: '',
  companyAccount: '',
  roleName: '',
  defaultUser: '',
  desc: '',
  dashboardAcord: [],
  dealsAcordList: [],
  dealsAcordDetails: [],
};

export const addUsersArrayData = () => {
  const { useGetProductsQuery } = CommonAPIS;
  const { data: products } = useGetProductsQuery({});
  return [
    {
      title: 'Select Product',
      componentProps: {
        name: 'productId',
        fullWidth: true,
        select: true,
      },
      options: products?.data?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 5,
    },
    {
      title: 'Select Company Account',
      componentProps: {
        name: 'companyAccount',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'orcalo', label: 'Orcalo LTD' },
        { value: 'acceron', label: 'Acceron LTD' },
      ],
      component: RHFSelect,
      md: 5,
    },
    {
      title: 'Role Name',
      componentProps: {
        name: 'roleName',
        placeholder: 'Role Name',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 5,
    },
    {
      title: 'Description',
      componentProps: {
        name: 'desc',
        placeholder: 'Description',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        label: 'Default User',
        name: 'defaultUser',
        fullWidth: true,
      },
      component: RHFSwitch,
      md: 5,
    },
  ];
};
export const accData = [
  {
    title: 'Dashboard',
    hasSwitch: true,
    content: 'Dashboard content here',
    endIcon: <ExpandMore />,
  },
  {
    title: 'Deals',
    hasSwitch: true,
    content: 'Deals content here',
    endIcon: <ExpandMore />,
  },
];
