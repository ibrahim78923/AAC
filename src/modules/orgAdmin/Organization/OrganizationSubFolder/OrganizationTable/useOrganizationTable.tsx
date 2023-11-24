import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import {
  useDeleteOrganizationMutation,
  useGetOrganizationQuery,
  usePostOrganizationMutation,
  useUpdateOrganizationMutation,
} from '@/services/orgAdmin/organization';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { columns, validationSchema } from './OrganizationTable.data';
import useAuth from '@/hooks/useAuth';
const useOrganizationTable = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [isGetRowValues, setIsGetRowValues] = useState<any>([]);
  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
    setEditData,
  );
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isToggled, toggle] = useToggle(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [value, setValue] = useState('search here');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();
  const [postOrganization] = usePostOrganizationMutation();
  const [updateOrganizationCompany] = useUpdateOrganizationMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [imageHandler, setImageHandler] = useState(false);
  const { user }: any = useAuth();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetOrganizationQuery({ organizationId: user?.organization?._id });

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

  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      return {
        accountName: editData?.accountName ?? '',
        phoneNo: editData?.phoneNo ?? '',
        postCode: editData?.postCode ?? '',
      };
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const organizationData = {
      ...data,
      logoUrl: data?.logoUrl?.path,
      organizationId: user?.organization?._id,
      products: [],
      status: 'Active',
    };
    try {
      await postOrganization({ body: organizationData }).unwrap();
      enqueueSnackbar('Company Created Successfully', {
        variant: 'success',
      });
      reset(validationSchema);
      setIsOpenDrawer(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const onSubmitEdit = async (data: any) => {
    const organizationData = {
      ...data,
      organizationId: user?.organization?._id,
      products: [],
      status: 'Active',
    };

    try {
      await updateOrganizationCompany({
        body: organizationData,
        id: isGetRowValues,
      }).unwrap();
      enqueueSnackbar('Company Update Successfully', {
        variant: 'success',
      });
      setIsOpenDrawer(false);
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

  return {
    tableRow: data?.data?.organizationcompanyaccounts,
    tablePagination: data?.meta?.pages,
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
    onSubmitEdit,
    imageHandler,
    setImageHandler,
  };
};

export default useOrganizationTable;
