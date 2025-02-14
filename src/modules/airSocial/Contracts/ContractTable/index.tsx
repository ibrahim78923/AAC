import CommonTabs from '@/components/Tabs';
import { Box, Button, Typography, useTheme } from '@mui/material';
import useContractTable from './useContractTable';

const ContractTable = (props: any) => {
  const { contractName } = props;
  const theme = useTheme();
  const { activeTab, setActiveTab } = useContractTable();
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="body1"
            fontWeight={500}
            color={theme?.palette?.grey[800]}
          >
            {contractName}
          </Typography>
          <Typography variant="body2" color={theme?.palette?.custom?.light}>
            Simplifying document management with smart organisation,
            collaboration, and secure storage.
          </Typography>
        </Box>
        <Button variant="contained" className="small">
          New Contract
        </Button>
      </Box>
      {/* Table tabs will be here */}
      <Box>
        <CommonTabs
          defaultValue={activeTab}
          getTabVal={(val: number) => setActiveTab(val)}
          tabsArray={[
            'All Contracts',
            'Draft',
            'Pending',
            'Signed',
            'Rejected',
          ]}
        >
          {/* <TanstackTable
            columns={companyColumns}
            data={userAccounts?.data?.usercompanyaccounts}
            isPagination
            onPageChange={(page) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
            count={userAccounts?.data?.meta?.pages}
            pageLimit={userAccounts?.data?.meta?.limit}
            totalRecords={userAccounts?.data?.meta?.total}
            isLoading={isLoading}
            isSuccess={isSuccess}
            currentPage={userAccounts?.data?.meta?.page}
          /> */}
        </CommonTabs>
      </Box>
    </>
  );
};

export default ContractTable;
