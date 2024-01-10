import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  departmentFormValidation,
  departmentFormValues,
} from '../DepartmentsFormModal/DepartmentsFormModal.data';
import { useLazyGetDepartmentQuery } from '@/services/airServices/settings/user-management/departments';
import { PAGINATION } from '@/config';

export const useDepartmentsDetail = () => {
  const [actionPop, setActionPop] = useState<HTMLElement | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setActionPop(event?.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const getDepartmentParam = new URLSearchParams();
  getDepartmentParam?.append('page', page + '');
  getDepartmentParam?.append('limit', pageLimit + '');
  getDepartmentParam?.append('search', search);
  const getDepartmentParameter = {
    queryParams: getDepartmentParam,
  };
  const [lazyGetDepartmentTrigger, lazyGetDepartmentData] =
    useLazyGetDepartmentQuery();
  const departmentData = lazyGetDepartmentData?.data?.data?.departments;
  const departmentMetaData = lazyGetDepartmentData?.data?.data?.meta;
  const getDepartmentListData = async () => {
    try {
      await lazyGetDepartmentTrigger(getDepartmentParameter)?.unwrap();
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    getDepartmentListData();
  }, [search, page, pageLimit]);
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
    search,
    setSearch,
    departmentMetaData,
    pageLimit,
    setPageLimit,
    page,
    setPage,
  };
};
