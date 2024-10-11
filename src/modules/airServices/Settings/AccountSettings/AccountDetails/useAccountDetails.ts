import useAuth from '@/hooks/useAuth';
import { useGetServiceAccountDetailProfileDetailQuery } from '@/services/airServices/settings/account-settings/account-details';
import { useTheme } from '@mui/material';
import { IAuth } from './AccountDetails.interface';

export const useAccountDetails = () => {
  const theme = useTheme();
  const user: IAuth | any = useAuth();
  const { data, isLoading, isFetching } =
    useGetServiceAccountDetailProfileDetailQuery(user?.user?._id, {
      refetchOnMountOrArgChange: true,
      skip: !!!user?.user?._id,
    });
  return {
    theme,
    data,
    isLoading,
    isFetching,
  };
};
