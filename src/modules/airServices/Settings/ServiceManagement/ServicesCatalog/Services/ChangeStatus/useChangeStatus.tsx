import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  changeStatusDefaultValues,
  changeStatusValidationSchema,
} from './ChangeStatus.data';

import { usePatchServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

const useChangeStatus = (prop: any) => {
  const { openStatus, setOpenStatus, id } = prop;

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchServiceCatalogMutation();
  const methodChangeStatus = useForm({
    resolver: yupResolver(changeStatusValidationSchema),
    defaultValues: changeStatusDefaultValues,
  });
  const { handleSubmit } = methodChangeStatus;
  const onSubmit = async (data: any) => {
    const moveToCategoryData = {
      status: data?.status,
      ids: id?.selectedCheckboxes,
    };

    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();

      successSnackbar('Service Status Updated ');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }

    setOpenStatus(false);
  };

  return {
    methodChangeStatus,
    handleSubmit,
    onSubmit,
    openStatus,
    setOpenStatus,
    patchServiceCatalogTriggerStatus,
  };
};
export default useChangeStatus;
