import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { bankAccountsColumns } from './BankAccounts.data';
import ActionDropDown from './ActionDropDown';
import useBankAccounts from './useBankAccounts';
import AddBankAccounts from './AddBankAccounts';

const BankAccounts = () => {
  const theme = useTheme();
  const {
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    filterValues,
    setFilterValues,
    receiversData,
    checkedRows,
    setCheckedRows,
    isLoading,
    isSuccess,
    setPageLimit,
    setPage,
  } = useBankAccounts();

  const columnsProps = {
    checkedRows: checkedRows,
    setCheckedRows: setCheckedRows,
    receiversData: receiversData,
  };

  return (
    <Box>
      <Typography variant="h3" color={theme?.palette?.grey[800]}>
        Receiver Bank Accounts
      </Typography>
      <Stack direction="column" gap={2} mt={3}>
        <Stack direction={{ md: 'row' }} justifyContent="space-between" gap={1}>
          <Search
            onChange={(e: any) => {
              setFilterValues({ ...filterValues, search: e?.target?.value });
            }}
            placeholder="Search Here"
            size="small"
          />
          <Stack direction={{ sm: 'row' }} gap={1}>
            <ActionDropDown
              checkedRows={checkedRows}
              setIsOpenAddAccountDrawer={setIsOpenAddAccountDrawer}
              isOpenAddAccountDrawer={isOpenAddAccountDrawer}
              setCheckedRows={setCheckedRows}
            />
            <Button
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
              onClick={() =>
                setIsOpenAddAccountDrawer({
                  ...isOpenAddAccountDrawer,
                  isToggle: true,
                  type: 'add',
                })
              }
            >
              Add Bank Accounts
            </Button>
          </Stack>
        </Stack>
        <TanstackTable
          columns={bankAccountsColumns(columnsProps)}
          data={receiversData?.data?.receiverbankaccounts}
          totalRecords={receiversData?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          count={receiversData?.data?.meta?.pages}
          isPagination
          pageLimit={receiversData?.data?.meta?.limit}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Stack>

      {isOpenAddAccountDrawer?.isToggle && (
        <AddBankAccounts
          setCheckedRows={setCheckedRows}
          isOpenAddAccountDrawer={isOpenAddAccountDrawer}
          setIsOpenAddAccountDrawer={setIsOpenAddAccountDrawer}
        />
      )}
    </Box>
  );
};

export default BankAccounts;
