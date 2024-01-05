import { useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  departmentFormValidation,
  departmentFormValues,
} from '../DepartmentsFormModal/DepartmentsFormModal.data';
import { useGetDepartmentQuery } from '@/services/airServices/settings/user-management/departments';

export const useDepartmentsDetail = () => {
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const { data } = useGetDepartmentQuery(null);
  const departmentData = data?.data?.departments;

  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const handleDeleteSubmit = () => {
    enqueueSnackbar('Department Deleted', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setOpenDelete(false);
    setActionPop(null);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setActionPop(null);
  };
  const editFormMethod = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues,
  });
  const { handleSubmit, reset } = editFormMethod;
  const submitEditForm = async () => {
    enqueueSnackbar('Department Edit Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const formProps = { editFormMethod, submitEditForm, handleSubmit };
  const theme: any = useTheme();
  return {
    theme,
    actionPop,
    handleActionClick,
    handleActionClose,
    openAction,
    openDelete,
    setOpenDelete,
    handleDeleteSubmit,
    handleDeleteClose,
    openEdit,
    setOpenEdit,
    formProps,
    departmentData,
  };
};
