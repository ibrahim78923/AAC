import React, { useState, useEffect } from 'react';
import { Theme, useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import {
  useDeleteOrganizationMutation,
  useGetOrganizationQuery,
  usePostOrganizationMutation,
  useUpdateOrganizationMutation,
  useUpdateOrganizationStatusMutation,
} from '@/services/orgAdmin/organization';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  columns,
  defaultValuesOrganization,
  validationSchema,
} from './OrganizationTable.data';
import useAuth from '@/hooks/useAuth';
import { isNullOrEmpty } from '@/utils';
import { PAGINATION } from '@/config';
const useOrganizationTable = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [drawerHeading, setDrawerHeading] = useState('Create Company');
  const [isGetRowValues, setIsGetRowValues] = useState<any>([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isToggled, toggle] = useToggle(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();
  const [postOrganization, { isLoading: loadingAddCompanyAccount }] =
    usePostOrganizationMutation();
  const [updateOrganizationCompany] = useUpdateOrganizationMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [updateOrganizationStatus] = useUpdateOrganizationStatusMutation();
  const [imageHandler, setImageHandler] = useState(false);
  const { user }: any = useAuth();

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetOrganizationQuery({
      organizationId: user?.organization?._id,
      search: value,
      pages: page,
      limit: pageLimit,
    });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const deleteOrganizationCompany = async () => {
    try {
      await deleteOrganization({
        body: { accountIds: isGetRowValues },
      }).unwrap();
      enqueueSnackbar('Company Deleted Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      if (editData) {
        const { accountName, phoneNo, postCode, address } = editData;
        if (!isNullOrEmpty(Object?.keys(editData))) {
          return {
            accountName,
            phoneNo,
            postCode,
            address,
          };
        }
      }
      return defaultValuesOrganization;
    },
  });

  useEffect(() => {
    if (editData) {
      const { accountName, phoneNo, address, postCode } = editData;
      let parsedAddress;
      try {
        parsedAddress = JSON.parse(address);
      } catch (_: any) {
        parsedAddress = null;
      }
      methods.setValue('accountName', accountName);
      methods.setValue('phoneNo', phoneNo);
      methods.setValue('postCode', postCode);
      methods.setValue(
        'address',
        parsedAddress === null
          ? address?.composite ?? address
          : parsedAddress?.composite ?? parsedAddress,
      );
    }
  }, [editData, methods]);

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const products: any = [];
    user?.products.forEach((product: any) => {
      if (data[product?._id]) products.push(product?._id);
    });
    const address = {
      flatNumber: data?.unit,
      buildingName: data?.buildingName,
      buildingNumber: data?.buildingNumber,
      streetName: data?.streetName,
      city: data?.city,
      country: data?.country,
      composite: data?.address,
    };

    const formData = new FormData();
    formData.append('image', data?.image);
    formData.append('products', products);
    formData.append('accountName', data?.accountName);
    formData.append('phoneNo', data?.phoneNo);
    formData.append('postCode', data?.postCode);
    formData.append('address', JSON.stringify(address));
    formData.append('postCode', data?.postCode);
    formData.append('organizationId', user?.organization?._id);
    formData.append('isActive', 'true');

    try {
      if (Object?.keys(editData)[0]) {
        await updateOrganizationCompany({
          body: formData,
          id: editData?._id,
        }).unwrap();
        enqueueSnackbar('Company Updated Successfully', {
          variant: 'success',
        });
        setIsOpenDrawer(false);
      } else {
        await postOrganization({ body: formData }).unwrap();
        enqueueSnackbar('Company Created Successfully', {
          variant: 'success',
        });
        reset(validationSchema);
        setIsOpenDrawer(false);
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenEditDrawer(true);
  };

  const tableRowData = data?.data?.organizationcompanyaccounts ?? [];
  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isGetRowValues,
    setEditData,
    updateOrganizationStatus,
    tableRowData,
  );

  return {
    tableRow: data?.data?.organizationcompanyaccounts ?? [],
    tableInfo: data?.data?.meta,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenDelete,
    setIsOpenDelete,
    openEditDrawer,
    setOpenEditDrawer,
    value,
    setValue,
    anchorEl,
    setAnchorEl,
    open,
    theme,
    isToggled,
    toggle,
    handleClick,
    handleClose,
    deleteOrganizationCompany,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    onSubmit,
    handleSubmit,
    methods,
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
    getRowValues,
    setEditData,
    imageHandler,
    setImageHandler,
    editData,
    drawerHeading,
    setDrawerHeading,
    loadingAddCompanyAccount,
    setPageLimit,
    setPage,
    handlePageChange,
  };
};

export default useOrganizationTable;
