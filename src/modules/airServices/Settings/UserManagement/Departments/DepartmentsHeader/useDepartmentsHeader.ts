import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AIR_SERVICES } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetUsersDropdownListQuery,
  usePostDepartmentMutation,
} from '@/services/airServices/settings/user-management/departments';
import {
  departmentFormValidation,
  departmentFormValues,
} from '../DepartmentsFormModal/DepartmentsFormModal.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDepartmentsHeader = (props: any) => {
  const { openAddModal, setOpenAddModal } = props;
  const { USER_MANAGEMENT } = AIR_SERVICES;
  const { push } = useRouter();
  const backArrowClick = () => {
    push({ pathname: USER_MANAGEMENT });
  };
  const [postDepartment, { isLoading }] = usePostDepartmentMutation();
  const addFormMethod = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues(null),
  });
  const { handleSubmit, reset } = addFormMethod;
  const submitAddForm = async (formData: any) => {
    const modifyData = {
      departmenProfilePicture: formData?.departmenProfilePicture,
      name: formData?.name,
      description: formData?.description,
      departmentHeadId: formData?.departmentHeadDetails?._id,
      members: formData?.membersListDetails?.map((value: any) => value?._id),
    };
    try {
      const response: any = await postDepartment({
        body: modifyData,
      });
      successSnackbar(
        response?.data?.message && 'Department Added Successfully',
      );
      reset();
      setOpenAddModal(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.error ?? 'An error');
    }
  };
  const handleClose = () => {
    setOpenAddModal(false);
    reset();
  };
  const userList = useLazyGetUsersDropdownListQuery();
  const formSubmit = handleSubmit(submitAddForm);
  return {
    backArrowClick,
    openAddModal,
    setOpenAddModal,
    formSubmit,
    userList,
    handleClose,
    addFormMethod,
    isLoading,
  };
};
