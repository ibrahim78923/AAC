import { Box } from '@mui/material';
import { AccountDetailsTabs } from './AccountDetailsTabs';
import { Header } from './Header';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useAccountDetails } from './useAccountDetails';

export const AccountDetails = () => {
  const { theme, data, isLoading, isFetching } = useAccountDetails();
  if (isFetching || isLoading) return <SkeletonTable />;

  return (
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
  );
};
