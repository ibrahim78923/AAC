import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import {
  bankAccountsColumns,
  // bankAccountsData
} from './BankAccounts.data';
import ActionDropDown from './ActionDropDown';
import useBankAccounts from './useBankAccounts';
import AddBankAccounts from './AddBankAccounts';

const BankAccounts = () => {
  const theme = useTheme();
  const {
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    searchBy,
    setSearchBy,
    receiversData,
    checkedRows,
    setCheckedRows,
  } = useBankAccounts();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
  };

  return (
    <Box>
      <Typography variant="h3" color={theme?.palette?.grey[800]}>
        Receiver Bank Accounts
      </Typography>
      <Stack direction="column" gap={2} mt={3}>
        <Stack direction="row" justifyContent="space-between">
          <Search
            width={260}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            placeholder="Search Here"
          />
          <Stack direction="row" gap={1}>
            <ActionDropDown
              setIsOpenAddAccountDrawer={setIsOpenAddAccountDrawer}
              checkedRows={checkedRows}
            />
            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
              onClick={() => setIsOpenAddAccountDrawer(true)}
            >
              Add Bank Accounts
            </Button>
          </Stack>
        </Stack>
        <TanstackTable
          columns={bankAccountsColumns(columnsProps)}
          data={receiversData}
          isPagination
        />
      </Stack>

      <AddBankAccounts
        isOpenAddAccountDrawer={isOpenAddAccountDrawer}
        setIsOpenAddAccountDrawer={setIsOpenAddAccountDrawer}
      />
    </Box>
  );
};

export default BankAccounts;
