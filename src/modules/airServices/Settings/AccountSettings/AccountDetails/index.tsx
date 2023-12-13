import { Box, useTheme } from '@mui/material';
import { AccountDetailsTabs } from './AccountDetailsTabs';
import { Header } from './Header';

export const AccountDetails = () => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <br />
      <Box
        border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
        p={2}
        borderRadius={2}
      >
        <AccountDetailsTabs />
      </Box>
    </>
  );
};
