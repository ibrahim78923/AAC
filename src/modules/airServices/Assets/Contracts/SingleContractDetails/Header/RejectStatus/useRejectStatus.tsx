import { CONTRACT_STATUS } from '@/constants/strings';
import { usePatchContractRejectMutation } from '@/services/airServices/assets/contracts';
import { errorSnackbar, successSnackbar } from '@/utils/api';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './RejectStatus.data';

export const useRejectStatus = (props: any) => {
  const { open, handleClose, data } = props;
  const router = useRouter();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;
  const { contractId } = router?.query;

  const [patchContractRejectTrigger, patchContractRejectStatus] =
    usePatchContractRejectMutation();
  const upDateStatusAndReason = (reason: any) => {
    const upDateRejectStatusData = { ...data };
    const upDateRejectedStatusData = { ...upDateRejectStatusData };
    const newData = {
      ...upDateRejectedStatusData?.data,
      status: CONTRACT_STATUS?.REJECTED,
      reasons: reason,
    };
    upDateRejectedStatusData.data = newData;
    return upDateRejectedStatusData;
  };
  const onSubmit = async (data: any) => {
    const reason = data?.reason;
    const upDateRejectedStatusData = upDateStatusAndReason?.(reason);
    const putContractSubmitReject = {
      pathParam: { contractId },
      body: upDateRejectedStatusData,
    };
    try {
      await patchContractRejectTrigger(putContractSubmitReject)?.unwrap();
      successSnackbar('Contract was  Rejected');
    } catch (error) {
      errorSnackbar();
    }
    handleClose?.();
  };
  return {
    handleClose,
    open,
    handleSubmit,
    onSubmit,
    methods,
    patchContractRejectStatus,
  };
};
