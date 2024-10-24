import { usePatchDealsMutation } from '@/services/airSales/deals';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useRestoreAssign = (
  seletedId: string[],
  onClose: () => void,
  setSelectedRows: (rows: string[]) => void,
) => {
  const [updatedAssignDeal, { isLoading: loadingUpdateOwner }] =
    usePatchDealsMutation();
  const router = useRouter();

  const { dealOwnerId } = router.query;

  const methods: any = useForm({
    defaultValues: {
      ownerId: dealOwnerId ?? '',
    },
  });
  const { handleSubmit } = methods;
  const onSubmit = async (values: any) => {
    try {
      await updatedAssignDeal({
        id: seletedId,
        body: { ownerId: values?.ownerId },
      });

      enqueueSnackbar('Re-assign Updated ', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      onClose();
      setSelectedRows([]);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
    dealOwnerId,
    loadingUpdateOwner,
  };
};

export default useRestoreAssign;
