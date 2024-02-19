import { Checkbox } from '@mui/material';

import RHFSelect from '@/components/ReactHookForm/RHFSelect';

import { RHFSwitch, RHFTextField } from '@/components/ReactHookForm';

import { SwitchBtn } from '@/components/SwitchButton';

import * as Yup from 'yup';

import { CommonAPIS } from '@/services/common-APIs';
import { convertIdToShortNumber, getSession } from '@/utils';

export const columns: any = (columnsProps: any) => {
  const { updateStatus, checkedRows, setCheckedRows } = columnsProps;

  const handleCheckboxChange = (val: any, rowId: string) => {
    val?.target?.checked ? setCheckedRows(rowId) : setCheckedRows();
  };

  return [
    {
      accessorFn: (row: any) => row?.organizationId,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={info?.getValue()}
          defaultChecked={checkedRows === info?.row?.original?._id}
          onChange={(e: any) =>
            handleCheckboxChange(e, info?.row?.original?._id)
          }
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => convertIdToShortNumber(info?.getValue()) ?? 'N/A',
      header: 'Role ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Role Name',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.productDetails?.name,
      id: 'products',
      isSortable: true,
      header: 'Products',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.companyAccountDetails?.name,
      id: 'companyAccount',
      isSortable: true,
      header: 'Company Accounts',
      cell: (info: any) => info?.getValue() ?? 'N/A',
    },
    {
      accessorFn: (row: any) => row?.Status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <SwitchBtn
          defaultChecked={
            info?.row?.original?.status === 'ACTIVE' ? true : false
          }
          handleSwitchChange={(e: any) =>
            updateStatus(info?.row?.original?._id, e)
          }
        />
      ),
    },
  ];
};

export const addUserSchema = Yup.object().shape({
  productId: Yup?.string()?.required('Field is Required'),
  organizationCompanyAccountId: Yup?.string()?.required('Field is Required'),
  name: Yup?.string()?.required('Field is Required'),
});

export const addUsersArrayData = () => {
  const { user } = getSession();
  const { useGetCompanyAccountsQuery } = CommonAPIS;

  const { data: companyAccounts } = useGetCompanyAccountsQuery({
    orgId: user?.organization?._id,
  });

  return [
    {
      componentProps: {
        label: 'Select Product',
        name: 'productId',
        fullWidth: true,
        required: true,
        select: true,
      },
      options: user?.products?.map((item: any) => ({
        value: item?._id,
        label: item?.name,
      })),
      component: RHFSelect,
      md: 5,
    },
    {
      componentProps: {
        label: 'Select Company Account',
        name: 'organizationCompanyAccountId',
        fullWidth: true,
        required: true,
        select: true,
      },
      options: companyAccounts?.data?.organizationcompanyaccounts?.map(
        (item: any) => ({
          value: item?._id,
          label: item?.accountName,
        }),
      ),
      component: RHFSelect,
      md: 5,
    },
    {
      componentProps: {
        label: 'Role Name',
        name: 'name',
        placeholder: 'Role Name',
        fullWidth: true,
        required: true,
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        label: 'Description',
        name: 'description',
        fullWidth: true,
        placeholder: 'Description',
        multiline: true,
        rows: 3,
      },
      component: RHFTextField,
      md: 5,
    },
    {
      componentProps: {
        label: 'Default User',
        name: 'status',
        fullWidth: true,
      },
      component: RHFSwitch,
      md: 5,
    },
  ];
};
