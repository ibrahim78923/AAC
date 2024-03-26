import { useConvertToAgentMutation } from '@/services/airServices/settings/user-management/requesters';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useConvertToAgent = (props: any) => {
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
      setSelectedRequesterList?.([]);
      const newPage = selectedRequesterList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getRequestersListData?.(newPage);
      closeRequesterConvertToAgentModal?.();
    } catch (error: any) {
      errorSnackbar?.();
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
