import { Checkbox, Switch } from '@mui/material';

import { RHFTextField } from '@/components/ReactHookForm';

import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  ischecked: any,
  isGetRowValues: any,
  setEditData: any,
  updateOrganizationStatus: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?._id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          checked={isGetRowValues?.includes(info?.row?.original?._id)}
          name={info?.getValue()}
          onClick={() => {
            const isChecked = isGetRowValues?.includes(
              info?.row?.original?._id,
            );
            if (!isChecked) {
              setIsGetRowValues((prev: any) => [
                ...prev,
                info?.row?.original?._id,
              ]);
            } else {
              setIsGetRowValues((prev: any) =>
                prev.filter((id: any) => id !== info?.row?.original?._id),
              );
            }
            setEditData({ ...info?.row?.original });
            setIschecked(!isChecked);
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
      accessorFn: (row: any) => row?.accountName,
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
      accessorFn: (row: any) => row?.address?.streetName,
      id: 'address',
      isSortable: true,
      header: 'Address',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.isActive,
      id: 'isActive',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Switch
          color="primary"
          onChange={async () => {
            try {
              await updateOrganizationStatus({
                id: info?.row?.original?._id,
                isActive: !info?.row?.original?.isActive,
              }).unwrap();

              enqueueSnackbar('Status Updated Successfully', {
                variant: 'success',
              });
            } catch (error: any) {
              enqueueSnackbar('Something went wrong !', { variant: 'error' });
            }
          }}
          checked={info?.row?.original?.isActive}
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
  address: Yup?.string()?.trim()?.required('Field is Required'),
});

export const defaultValuesOrganization = {
  accountName: '',
  phoneNo: '',
  postCode: '',
  address: '',
  // unit: '',
  // buildingName: '',
  // buildingNumber: '',
  // streetName: '',
  // city: '',
  // country: '',
};

export const dataArray = [
  {
    componentProps: {
      name: 'accountName',
      label: 'Company Account Name',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'phoneNo',
      label: 'Phone No',
      fullWidth: true,
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'postCode',
      label: 'Post Code',
      fullWidth: true,
      required: true,
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
      required: true,
    },
  },
];
