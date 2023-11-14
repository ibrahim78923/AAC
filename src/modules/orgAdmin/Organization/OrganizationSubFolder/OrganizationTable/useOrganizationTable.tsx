import React, { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import {
  useGetOrganizationQuery,
  usePostOrganizationMutation,
} from '@/services/orgAdmin/organization';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  columns,
  defaultValuesOrganization,
  validationSchema,
} from './OrganizationTable.data';
const useOrganizationTable = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');

  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
  );
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isToggled, toggle] = useToggle(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [value, setValue] = useState('search here');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();
  const [postOrganization] = usePostOrganizationMutation();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetOrganizationQuery({ organizationId: '6521d0f76ae13b72f9ad4915' });

  const deleteOrganizationCompany = async () => {
    const payload = {
      id: '',
    };
    try {
      await postOrganization({ id: payload?.id }).unwrap();
      enqueueSnackbar('User Deleted Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValuesOrganization,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const organizationData = {
      ...data,
      organizationId: '6521d0f76ae13b72f9ad4915',
      products: [],
      logo: 'https://example.com/logo.png',
      status: 'Active',
    };
    try {
      await postOrganization({ body: organizationData }).unwrap();
      enqueueSnackbar('Company Created Successfully', {
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
  };
};

export default useOrganizationTable;
