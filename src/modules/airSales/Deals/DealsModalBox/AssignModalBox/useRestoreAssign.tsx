import { usePatchDealsMutation } from '@/services/airSales/deals';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useGetDealsActionPreviewQuery } from '@/services/airSales/deals';
import { useEffect } from 'react';

const useRestoreAssign = (
  seletedId: string[],
  onClose: () => void,
  setSelectedRows: (rows: string[]) => void,
) => {
  const [updatedAssignDeal, { isLoading: loadingUpdateOwner }] =
    usePatchDealsMutation();

  const { data: dealsDetailsData, isLoading }: any =
    useGetDealsActionPreviewQuery(
      {
        id: seletedId,
      },
      { skip: !seletedId },
    );

  const methods: any = useForm({
    defaultValues: {
      ownerId: null,
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (dealsDetailsData?.data) {
      reset({ ownerId: dealsDetailsData?.data?.dealOwner });
    }
  }, [dealsDetailsData?.data, reset]);

  const onSubmit = async (values: any) => {
    try {
      await updatedAssignDeal({
        id: seletedId,
        body: { ownerId: [values?.ownerId?._id] },
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
    isLoading,
    loadingUpdateOwner,
  };
};

export default useRestoreAssign;
