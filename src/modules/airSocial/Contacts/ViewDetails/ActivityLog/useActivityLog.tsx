import { useGetContactSubActivityLogQuery } from '@/services/commonFeatures/contacts/activity-log';
import { useTheme } from '@mui/material';

const useActivityLog = (contactId: string) => {
  const theme = useTheme();
  const filterPayloadValues = {
    recordId: contactId,
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetContactSubActivityLogQuery({
      params: { ...filterPayloadValues },
    });

  return {
    theme,
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
};

export default useActivityLog;
