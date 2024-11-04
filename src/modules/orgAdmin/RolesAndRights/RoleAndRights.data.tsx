import { Checkbox, CircularProgress } from '@mui/material';
import { RHFAutocompleteAsync, RHFTextField } from '@/components/ReactHookForm';
import { SwitchBtn } from '@/components/SwitchButton';
import * as Yup from 'yup';
import { getSession } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/api';
import { ACTIVITY_STATUS_MENU } from '@/constants';

export const columns: any = (columnsProps: any) => {
  const { updateStatus, checkedRows, setCheckedRows, loadingState } =
    columnsProps;

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
      header: '',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      cell: (info: any) => info?.getValue() ?? 'N/A',
      header: 'Role ID',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      isSortable: true,
      header: 'Role Name',
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
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
      cell: (info: any) => capitalizeFirstLetter(info?.getValue()) ?? 'N/A',
    },

    {
      accessorFn: (row: any) => row?.Status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        const rowId = info?.row?.original?._id;
        const isLoading = loadingState[rowId] ?? false;

        return isLoading ? (
          <CircularProgress size={25} />
        ) : (
          <SwitchBtn
            handleSwitchChange={(e: any) => {
              updateStatus(rowId, e?.target?.checked);
            }}
            defaultChecked={
              info?.row?.original?.status === ACTIVITY_STATUS_MENU?.ACTIVE
            }
            checked={
              info?.row?.original?.status === ACTIVITY_STATUS_MENU?.ACTIVE
            }
          />
        );
      },
    },
  ];
};

export const addUserSchema = Yup.object().shape({
  productId: Yup?.object()?.required('Field is Required'),
  organizationCompanyAccountId: Yup?.mixed()?.nullable(),
  name: Yup?.string()?.required('Field is Required'),
});

export const addUsersArrayData = (productsData: any, companyAccounts: any) => {
  const { user }: any = getSession();

  return [
    {
      componentProps: {
        name: 'productId',
        label: 'Select Product',
        fullWidth: true,
        placeholder: 'Select product',
        apiQuery: productsData,
        getOptionLabel: (item: any) => item?.name,
      },
      component: RHFAutocompleteAsync,
      md: 5,
    },
    {
      componentProps: {
        label: 'Select Company Account',
        name: 'organizationCompanyAccountId',
        placeholder: 'Select company account',
        required: true,
        multiple: true,
        apiQuery: companyAccounts,
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: { orgId: user?.organization?._id, limit: 50 },
      },
      component: RHFAutocompleteAsync,
      md: 5,
    },
    {
      componentProps: {
        label: 'Role Name',
        name: 'name',
        placeholder: 'Enter role name',
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
        placeholder: 'Enter description..',
        multiline: true,
        rows: 3,
      },
      component: RHFTextField,
      md: 5,
    },
  ];
};
