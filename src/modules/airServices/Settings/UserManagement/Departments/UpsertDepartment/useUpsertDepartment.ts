import { useForm } from 'react-hook-form';
import {
  departmentFormValidation,
  departmentFormValues,
} from './UpsertDepartment.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostDepartmentMutation,
  useUpdateDepartmentMutation,
} from '@/services/airServices/settings/user-management/departments';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';

export const useUpsertDepartment = (props: any) => {
  const { setOpenUpsertModal } = props;
  const [postDepartmentTrigger, postDepartmentStatus] =
    usePostDepartmentMutation();
  const [updateDepartmentTrigger, updateDepartmentStatus] =
    useUpdateDepartmentMutation();
  const method = useForm({
    resolver: yupResolver(departmentFormValidation),
    defaultValues: departmentFormValues(null),
  });
  const { handleSubmit, reset } = method;

  const submitUpsertDepartment = async (formData: any) => {
    const departmentFormData = new FormData();
    departmentFormData?.append('name', formData?.name);
    departmentFormData?.append('description', formData?.description);
    departmentFormData?.append(
      'departmentHeadId',
      formData?.departmentHeadDetails?._id,
    );
    formData?.fileUrl !== null &&
      departmentFormData?.append('fileUrl', formData?.fileUrl);
    !!formData?.membersListDetails?.length &&
      departmentFormData?.append(
        'members',
        formData?.membersListDetails?.map((value: any) => value?._id),
      );
    if (true) {
      submitEditForm(departmentFormData);
      return;
    }
    const postDepartmentApiParameters = {
      body: departmentFormData,
    };
    try {
      await postDepartmentTrigger(postDepartmentApiParameters);
      successSnackbar('Department Added Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitEditForm = async (departmentFormData: any) => {
    departmentFormData?.append('id', '');
    const updateDepartmentParameter = {
      body: departmentFormData,
    };
    await updateDepartmentTrigger(updateDepartmentParameter);
    try {
      successSnackbar('Department Updated Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setOpenUpsertModal?.(false);
    reset();
  };

  const userList = useLazyGetUsersDropdownListQuery();

  return {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    userList,
    method,
    updateDepartmentStatus,
  };
};
