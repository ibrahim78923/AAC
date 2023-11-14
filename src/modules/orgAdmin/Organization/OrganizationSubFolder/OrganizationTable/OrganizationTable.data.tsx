import { Checkbox, Switch } from '@mui/material';

import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={
            info?.cell?.row?.original?._id ===
              isGetRowValues?.cell?.row?.original?._id && ischecked
          }
          name={info?.getValue()}
          onClick={() => {
            setIsGetRowValues(info), setIschecked(!ischecked);
          }}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.accountName,
      id: 'accountName',
      cell: (info: any) => info?.getValue(),
      header: 'Company Account',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.products,
      id: 'products',
      isSortable: true,
      header: 'Products',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.phoneNo,
      id: 'phoneNo',
      isSortable: true,
      header: 'Phone No',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.address,
      id: 'address',
      isSortable: true,
      header: 'Address',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Switch
          color="primary"
          checked={info?.getValue() === 'Active' ? true : false}
          name={info?.getValue()}
        />
      ),
    },
  ];
};

export const validationSchema = Yup?.object()?.shape({
  accountName: Yup?.string()?.required('Field is Required'),
  phoneNo: Yup?.string()?.trim()?.required('Field is Required'),
  postCode: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesOrganization = {
  accountName: '',
  phoneNo: '',
  postCode: '',
  address: '',
  unit: '',
  buildingName: '',
  buildingNumber: '',
  streetName: '',
  city: '',
  country: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'accountName',
      label: 'Company Account Name',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone No',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
      select: false,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    md: 12,
    component: RHFTextField,
    componentProps: {
      name: 'address',
      fullWidth: true,
      label: 'Address',
      multiline: true,
      rows: 3,
    },
  },
];
