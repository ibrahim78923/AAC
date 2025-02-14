import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { usePostCustomerPortalRequestForAgentMutation } from '@/services/airCustomerPortal';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { getSession } from '@/utils';
import { RequestForAgentI } from './RequestForAgent.interface';

export const useRequestForAgent = (props: RequestForAgentI) => {
  const { openRequestAgentModal, setOpenRequestAgentModal } = props;
  const { user }: any = getSession();
  const [requestForAgentTrigger, { isLoading: requestAgentLoading }] =
    usePostCustomerPortalRequestForAgentMutation();
  const handleClose = () => {
    setOpenRequestAgentModal(false);
  };
  const handleRequestAgent = async () => {
    const queryParams = {
      userId: [user?._id],
    };
    try {
      await requestForAgentTrigger(queryParams)?.unwrap();
      successSnackbar('Request for agent has been sent successfully');
      handleClose();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  return {
    handleRequestAgent,
    requestAgentLoading,
    openRequestAgentModal,
    handleClose,
  };
};
