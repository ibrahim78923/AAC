import { Box, useTheme } from '@mui/material';
import { AccountDetailsTabs } from './AccountDetailsTabs';
import { Header } from './Header';
import useAuth from '@/hooks/useAuth';
import { useGetProfileDetailQuery } from '@/services/airServices/settings/account-settings/account-details';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const AccountDetails = () => {
  const theme = useTheme();
  const user = useAuth();
  const { data, isLoading } = useGetProfileDetailQuery(user?.user?._id);

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <Header profileDetail={data?.data} />
          <br />
          <Box
            border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
            p={2}
            borderRadius={2}
          >
            <AccountDetailsTabs profileDetail={data?.data} />
          </Box>
        </>
      )}
    </>
  );
};
