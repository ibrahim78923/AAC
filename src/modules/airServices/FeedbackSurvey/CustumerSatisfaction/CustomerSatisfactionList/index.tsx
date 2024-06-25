import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import {
  customerSupportListColumn,
  feedbackDropdown,
} from './CustomerSatisfactionList.data';
import { AIR_SERVICES } from '@/constants';
import { useCustomerSatisfactionList } from './useCustomerSatisfactionList';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const CustomerSatisfactionList = (props: any) => {
  const {
    search,
    setSearch,
    activeCheck,
    setActiveCheck,
    page,
    setPage,
    limit,
    setLimit,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    router,
    feedbackTableData,
    meta,
    handleDeleteSurvey,
    openModal,
    setOpenModal,
    deleteLoading,
  } = useCustomerSatisfactionList(props);
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Search label="Search here" searchBy={search} setSearchBy={setSearch} />
        <Box display="flex" gap={1}>
          <SingleDropdownButton
            dropdownOptions={feedbackDropdown(activeCheck, setOpenModal)}
            disabled={!!!activeCheck?.length}
          />
          <Button
            startIcon={<PlusIcon />}
            variant="contained"
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
                query: { type: 'customer-satisfaction' },
              })
            }
          >
            Create Survey
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        columns={customerSupportListColumn(
          activeCheck,
          setActiveCheck,
          feedbackTableData,
        )}
        data={feedbackTableData}
        isPagination
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        count={meta?.pages}
        pageLimit={limit}
        currentPage={page}
        totalRecords={meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setLimit}
      />
      {openModal && (
        <AlertModals
          open={openModal}
          handleClose={() => setOpenModal(false)}
          handleSubmitBtn={handleDeleteSurvey}
          loading={deleteLoading}
          disableCancelBtn={deleteLoading}
          type={ALERT_MODALS_TYPE?.DELETE}
          message="Are you sure you want to delete this survey?"
        />
      )}
    </>
  );
};
