import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import {
  customerSupportListColumn,
  surveyDataTypes,
} from './CustomerSatisfactionList.data';
import { AIR_SERVICES } from '@/constants';
import { useCustomerSatisfactionList } from './useCustomerSatisfactionList';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS } from '@/constants/permission-keys';

export const CustomerSatisfactionList = (props: any) => {
  const {
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
    feedbackDropdownOption,
    handleTitleClick,
    handleDefaultSurvey,
    patchLoading,
    defaultLoading,
  } = useCustomerSatisfactionList(props);
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Search label="Search here" setSearchBy={setSearch} />
        <Box display="flex" gap={1}>
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_CUSTOMER_SATISFACTION_FEEDBACK_SURVEY_ACTIONS
            }
          >
            <SingleDropdownButton
              dropdownOptions={feedbackDropdownOption}
              disabled={!!!activeCheck?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_ADD,
            ]}
          >
            <Button
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={() =>
                router?.push({
                  pathname: AIR_SERVICES?.UPSERT_FEEDBACK_SURVEY,
                  query: { type: surveyDataTypes?.customerSatisfaction },
                })
              }
            >
              Create Survey
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_FEEDBACK_SURVEY_PERMISSIONS?.CUSTOMER_SATISFACTION_SURVEY_LIST_VIEW,
        ]}
      >
        <TanstackTable
          columns={customerSupportListColumn(
            activeCheck,
            setActiveCheck,
            feedbackTableData,
            handleTitleClick,
            handleDefaultSurvey,
            patchLoading,
            defaultLoading,
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
      </PermissionsGuard>
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
