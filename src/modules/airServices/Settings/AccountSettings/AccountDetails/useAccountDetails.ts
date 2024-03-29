import useAuth from '@/hooks/useAuth';
import { useGetProfileDetailQuery } from '@/services/airServices/settings/account-settings/account-details';
import { useTheme } from '@mui/material';

export const useAccountDetails = () => {
  const theme = useTheme();
  const user: any = useAuth();
  const { data, isLoading, isFetching } = useGetProfileDetailQuery(
    user?.user?._id,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!user?.user?._id,
    },
  );
  return {
    theme,
    data,
    isLoading,
    isFetching,
  };
};
