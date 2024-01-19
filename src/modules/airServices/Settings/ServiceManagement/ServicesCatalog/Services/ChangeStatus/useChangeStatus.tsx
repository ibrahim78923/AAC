import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  changeStatusDefaultValues,
  changeStatusValidationSchema,
} from './ChangeStatus.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

import { usePatchServiceCatalogMutation } from '@/services/airServices/settings/service-management/service-catalog';

const useChangeStatus = (prop: any) => {
  const { openStatus, setOpenStatus, id } = prop;

  const [patchServiceCatalogTrigger] = usePatchServiceCatalogMutation();
  const methodChangeStatus = useForm({
    resolver: yupResolver(changeStatusValidationSchema),
    defaultValues: changeStatusDefaultValues,
  });
  const { handleSubmit } = methodChangeStatus;
  const onSubmit = async (data: any) => {
    const moveToCategoryData = new FormData();

    moveToCategoryData.append('id', id?.selectedCheckboxes?.[0]);
    moveToCategoryData.append('status', data?.status);

    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      const response = await patchServiceCatalogTrigger(
        patchServiceCatalogParameter,
      )?.unwrap();

      enqueueSnackbar(response?.data?.message ?? 'Service Status Updated ', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }

    setOpenStatus(false);
  };

  return {
    methodChangeStatus,
    handleSubmit,
    onSubmit,
    openStatus,
    setOpenStatus,
  };
};
export default useChangeStatus;
