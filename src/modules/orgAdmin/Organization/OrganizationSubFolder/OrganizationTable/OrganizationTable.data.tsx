import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Switch,
  useTheme,
} from '@mui/material';

import { RHFTextField } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export const columns = (
  setIsGetRowValues: any,
  setIschecked: any,
  isGetRowValues: any,
  setEditData: any,
  updateOrganizationStatus: any,
  tableRowData: any,
) => {
  const theme = useTheme();
  const [selectAllRows, setSelectAllRows] = useState(false);

  const handleSelectAllRows = () => {
    if (!selectAllRows) {
      const allIds = tableRowData?.map((row: any) => row?._id);
      setIsGetRowValues(allIds);
    } else {
      setIsGetRowValues([]);
    }
    setSelectAllRows(!selectAllRows);
  };

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
      header: (
        <Checkbox
          checked={tableRowData.length === isGetRowValues?.length}
          color="primary"
          name="Id"
          onChange={handleSelectAllRows}
        />
      ),
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
      cell: (info: any) => (
        <>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            {info?.row?.original?.products?.length ? (
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatar-root': {
                    background: theme?.palette?.primary?.main,
                    height: '32px',
                    width: '32px',
                    fontSize: '12px',
                    borderRadius: '12px',
                  },
                }}
              >
                {info?.row?.original?.products?.map((item: any) => (
                  <Avatar
                    key={uuidv4()}
                    alt="recipient_avatar"
                    src={`${process?.env?.NEXT_PUBLIC_IMG_URL}${item?.logo?.url}`}
                  />
                ))}
              </AvatarGroup>
            ) : (
              '-'
            )}
          </Box>
        </>
      ),
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
      cell: (info: any) => {
        let parsedAddress;
        try {
          parsedAddress = JSON.parse(info?.row?.original?.address);
        } catch (_: any) {
          parsedAddress = null;
        }
        return (
          <>
            {info?.row?.original?.address?.city ? (
              info?.row?.original?.address?.city
            ) : (
              <>
                {parsedAddress === null
                  ? info?.row?.original?.address?.composite ??
                    info?.row?.original?.address
                  : parsedAddress?.composite ?? parsedAddress}
              </>
            )}
          </>
        );
      },
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
                isActive: typeof !info?.row?.original?.isActive,
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

export const dataArray = ({ drawerHeading, isToggled }: any) => {
  const isViewMode = drawerHeading === 'Company Account';
  return [
    {
      componentProps: {
        name: 'accountName',
        label: 'Company Account Name',
        fullWidth: true,
        required: true,
        disabled: isViewMode,
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
        disabled: isViewMode,
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
        disabled: isViewMode,
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
        disabled: isViewMode || isToggled,
      },
    },
  ];
};
