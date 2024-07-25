import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  useDeleteDynamicFieldsMutation,
  usePutDynamicFieldsMutation,
} from '@/services/dynamic-fields';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import {
  dynamicFormMapFormToBackendFormat,
  isValidMongoId,
} from '@/utils/dynamic-forms';

export default function useDroppableArea({
  form,
  setForm,
  getBackendData,
  moduleType,
  productType,
  successPath,
  section,
  sectionType,
}: any) {
  const router: any = useRouter();
  const methods: any = useForm({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>({
    open: false,
    id: '',
  });

  const [putDynamicFieldsTrigger, putDynamicFieldsStatus] =
    usePutDynamicFieldsMutation();

  const params = {
    productType,
    moduleType,
    section,
    sectionType,
  };

  const handleFormCreation = async () => {
    const fields = dynamicFormMapFormToBackendFormat(form);

    const putDynamicFieldsParameters = {
      params,
      body: {
        fields,
      },
    };

    try {
      await putDynamicFieldsTrigger({ putDynamicFieldsParameters })?.unwrap();
      successSnackbar('Field(s) Updated Successfully');
      getBackendData();
      setForm([]);
      router?.push({
        pathname: successPath,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const [deleteDynamicFieldsTrigger, deleteDynamicFieldsStatus] =
    useDeleteDynamicFieldsMutation();

  const handleDelete = async () => {
    if (!isValidMongoId(isDeleteModalOpen?.id)) {
      setForm(
        (prevForm: any) =>
          prevForm?.filter((item: any) => item?.id !== isDeleteModalOpen?.id),
      );
      successSnackbar('Field Deleted Successfully!');
      setIsDeleteModalOpen({ open: false, id: '' });
      return;
    }
    const deleteDynamicFieldsParameters = {
      params: { ...params, ids: [isDeleteModalOpen?.id] },
    };

    try {
      await deleteDynamicFieldsTrigger({
        deleteDynamicFieldsParameters,
      })?.unwrap();
      setIsDeleteModalOpen?.({ open: false, id: '' });
      successSnackbar('Field Deleted Successfully!');
      getBackendData();
      setForm([]);
    } catch (error: any) {
      setIsDeleteModalOpen?.({ open: false, id: '' });
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    router,
    methods,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleFormCreation,
    putDynamicFieldsStatus,
    handleDelete,
    deleteDynamicFieldsStatus,
  };
}
