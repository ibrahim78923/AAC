import {
  departmentFormValidation,
  departmentFormValues,
} from './UpsertDepartment.data';
import {
  usePostDepartmentMutation,
  useUpdateDepartmentMutation,
} from '@/services/airServices/settings/user-management/departments';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { useEffect } from 'react';
import { filteredEmptyValues } from '@/utils/api';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

export const useUpsertDepartment = (props: any) => {
  const { setOpenUpsertModal, selectedDepartment, setSelectedDepartment } =
    props;

  const [postDepartmentTrigger, postDepartmentStatus] =
    usePostDepartmentMutation();
  const [updateDepartmentTrigger, updateDepartmentStatus] =
    useUpdateDepartmentMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_DEPARTMENT,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const upsertDepartmentMethodProps = {
    validationSchema: departmentFormValidation?.(form),
    defaultValues: departmentFormValues(selectedDepartment, form),
  };

  const { handleSubmit, reset, methods } = useFormLib(
    upsertDepartmentMethodProps,
  );

  useEffect(() => {
    reset(() => departmentFormValues(selectedDepartment, form));
  }, [selectedDepartment, reset, form]);

  const submitUpsertDepartment = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    try {
      const { body }: any = await handleUploadAttachments?.(
        data,
        filteredEmptyData,
      );

      const departmentFormData = new FormData();
      departmentFormData?.append('name', data?.name);
      departmentFormData?.append('description', data?.description);
      departmentFormData?.append(
        'departmentHeadId',
        data?.departmentHeadDetails?._id ?? '',
      );
      if (data?.fileUrl !== null) {
        departmentFormData?.append('fileUrl', data?.fileUrl);
      }
      departmentFormData?.append(
        'members',
        data?.membersListDetails?.map((value: any) => value?._id),
      );

      if (body?.customFields) {
        departmentFormData?.append(
          'customFields',
          JSON?.stringify(body?.customFields),
        );
      }

      if (selectedDepartment?._id) {
        await submitEditForm(departmentFormData);
        return;
      }

      const postDepartmentApiParameters = {
        body: departmentFormData,
      };

      await postDepartmentTrigger(postDepartmentApiParameters)?.unwrap();
      successSnackbar('Department Added Successfully');
      handleClose?.();
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const submitEditForm = async (departmentFormData: any) => {
    departmentFormData?.append('id', selectedDepartment?._id);
    const updateDepartmentParameter = {
      body: departmentFormData,
    };

    try {
      await updateDepartmentTrigger(updateDepartmentParameter)?.unwrap();
      successSnackbar('Department Updated Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setOpenUpsertModal?.(false);
    setSelectedDepartment?.('');
    reset();
  };

  const apiCallInProgress =
    postDepartmentStatus?.isLoading ||
    updateDepartmentStatus?.isLoading ||
    attachmentsApiCallInProgress;

  return {
    handleClose,
    handleSubmit,
    submitUpsertDepartment,
    postDepartmentStatus,
    methods,
    updateDepartmentStatus,
    selectedDepartment,
    form,
    apiCallInProgress,
    isDynamicFormLoading,
    hasDynamicFormError,
    getDynamicFormData,
  };
};
