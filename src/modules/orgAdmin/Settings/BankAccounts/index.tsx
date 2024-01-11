import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { bankAccountsColumns, bankAccountsData } from './BankAccounts.data';
import ActionDropDown from './ActionDropDown';

const BankAccounts = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h3" color={theme?.palette?.grey[800]}>
        Receiver Bank Accounts
      </Typography>
      <Stack direction="column" gap={2} mt={3}>
        <Stack direction="row" justifyContent="space-between">
          <Search width={260} placeholder="Search Here" />
          <Stack direction="row" gap={1}>
            <ActionDropDown />
            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
            >
              Add Bank Accounts
            </Button>
          </Stack>
        </Stack>
        <TanstackTable
          columns={bankAccountsColumns}
          data={bankAccountsData}
          isPagination
        />
      </Stack>
    </Box>
  );
};

export default BankAccounts;
