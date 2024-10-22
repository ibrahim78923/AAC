import { useConvertToAgentMutation } from '@/services/airServices/settings/user-management/requesters';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IRequestersProps } from '../Requesters.interface';

export const useConvertToAgent = (props: IRequestersProps) => {
  const {
    selectedRequesterList,
    setSelectedRequesterList,
    getRequestersListData,
    page,
    setIsAgentConvert,
    setPage,
    totalRecords,
  } = props;

  const [convertToAgentTrigger, convertToAgentStatus] =
    useConvertToAgentMutation();

  const ConvertToAgentRequester = async () => {
    const ConvertToAgentArticlesParameter = {
      body: {
        userId: selectedRequesterList?.map((requester: any) => requester?._id),
      },
    };

    try {
      await convertToAgentTrigger(ConvertToAgentArticlesParameter)?.unwrap();
      successSnackbar('Requester converted to agent successfully');
      closeRequesterConvertToAgentModal?.();
      setSelectedRequesterList?.([]);
      const newPage = selectedRequesterList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getRequestersListData?.(newPage);
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const closeRequesterConvertToAgentModal = () => {
    setIsAgentConvert?.(false);
    setSelectedRequesterList?.([]);
  };

  return {
    ConvertToAgentRequester,
    closeRequesterConvertToAgentModal,
    convertToAgentStatus,
  };
};
