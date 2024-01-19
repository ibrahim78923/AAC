import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useDeleteDepartmentMutation,
  useLazyGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from '@/services/airServices/settings/user-management/departments';
import { PAGINATION } from '@/config';
import { useLazyGetAgentsDropdownListQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import {
  departmentFormValidation,
  departmentFormValues,
} from '../DepartmentsFormModal/DepartmentsFormModal.data';

export const useDepartmentsDetail = () => {
  const [openDelete, setOpenDelete] = useState<any>({ item: null, val: false });
  const [openEdit, setOpenEdit] = useState<any>({ item: null, val: false });
  const [openAddModal, setOpenAddModal] = useState(false);
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
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const editFormMethod = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues(openEdit?.item),
  });
  const { handleSubmit, reset } = editFormMethod;
  useEffect(() => {
    reset(openEdit?.item);
  }, [openEdit?.val]);
  const [updateDepartment, { isLoading: updateIsLoading }] =
    useUpdateDepartmentMutation();
  const submitEditForm = async (formData: any) => {
    const modifyData = {
      id: openEdit?.item?._id,
      departmenProfilePicture: formData?.departmenProfilePicture,
      name: formData?.name,
      departmentHeadId: formData?.departmentHeadId?._id,
      description: formData?.description,
      members: formData?.members?.map((i: any) => i?._id),
    };
    const response: any = await updateDepartment({
      body: modifyData,
      id: openEdit?.item?._id,
    });
    try {
      enqueueSnackbar(
        response?.data?.message && 'Department Updated Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      reset();
      setOpenEdit(false);
    } catch (error: any) {
      enqueueSnackbar(error?.error?.data?.error ?? 'An error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitForm = handleSubmit(submitEditForm);
  const handleClose = () => {
    setOpenEdit(false);
    reset(departmentFormValues(openEdit?.item));
  };
  const userList = useLazyGetAgentsDropdownListQuery();
  const [deleteDepartmentTrigger, { isLoading }] =
    useDeleteDepartmentMutation();
  const deleteParams = new URLSearchParams();
  deleteParams?.append('id', openDelete?.item?._id);
  const handleDeleteSubmit = async () => {
    try {
      const response: any = await deleteDepartmentTrigger(deleteParams);
      enqueueSnackbar(
        response?.data?.message && 'Department Delete Successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
      setOpenDelete(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'An error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const theme: any = useTheme();
  const isSmallScreen = useMediaQuery(theme?.breakpoints?.down('sm'));
  return {
    theme,
    openDelete,
    setOpenDelete,
    handleDeleteSubmit,
    handleDeleteClose,
    openEdit,
    setOpenEdit,
    submitForm,
    departmentData,
    search,
    setSearch,
    departmentMetaData,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    openAddModal,
    setOpenAddModal,
    userList,
    editFormMethod,
    handleClose,
    isSmallScreen,
    isLoading,
    updateIsLoading,
  };
};
