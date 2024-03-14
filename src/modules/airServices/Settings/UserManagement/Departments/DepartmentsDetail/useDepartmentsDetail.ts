import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { PAGINATION } from '@/config';
import {
  useDeleteDepartmentMutation,
  useLazyGetDepartmentQuery,
  useLazyGetUsersDropdownListQuery,
  useUpdateDepartmentMutation,
} from '@/services/airServices/settings/user-management/departments';
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
  const [lazyGetDepartmentTrigger, lazyGetDepartmentData]: any =
    useLazyGetDepartmentQuery();
  const departmentData = lazyGetDepartmentData?.data?.data?.departments;
  const departmentMetaData = lazyGetDepartmentData?.data?.data?.meta;
  const getDepartmentListData = async () => {
    await lazyGetDepartmentTrigger(getDepartmentParameter)?.unwrap();
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
      members: formData?.membersListDetails?.map((i: any) => i?._id),
    };
    const response: any = await updateDepartment({
      body: modifyData,
      id: openEdit?.item?._id,
    });
    try {
      successSnackbar(
        response?.data?.message && 'Department Updated Successfully',
      );
      reset();
      setOpenEdit(false);
    } catch (error: any) {
      errorSnackbar(error?.error?.data?.error ?? 'An error');
    }
  };
  const submitForm = handleSubmit(submitEditForm);
  const handleClose = () => {
    setOpenEdit(false);
    reset(departmentFormValues(openEdit?.item));
  };
  const userList = useLazyGetUsersDropdownListQuery();
  const [deleteDepartmentTrigger, { isLoading }] =
    useDeleteDepartmentMutation();
  const deleteParams = new URLSearchParams();
  deleteParams?.append('id', openDelete?.item?._id);
  const handleDeleteSubmit = async () => {
    try {
      const response: any = await deleteDepartmentTrigger(deleteParams);
      successSnackbar(
        response?.data?.message && 'Department Delete Successfully',
      );
      setOpenDelete(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? 'An error occurred');
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
    lazyGetDepartmentData,
  };
};
