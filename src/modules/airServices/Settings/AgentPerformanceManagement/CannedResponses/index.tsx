import { Box, Grid } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { CreateNewFolder } from './CreateNewFolder';
import Search from '@/components/Search';
import { AIR_SERVICES } from '@/constants/routes';
import { useCannedResponses } from './useCannedResponses';
import CustomPagination from '@/components/CustomPagination';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { getCannedResponseDropdownOptions } from './CannedResponses.data';
import { DeleteCannedResponse } from './DeleteCannedResponse';
import { AddNewCard } from '@/components/Cards/AddNewCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { SemiInteractiveInfoCard } from '@/components/Cards/SemiInteractiveInfoCard';

export const CannedResponses = () => {
  const {
    router,
    convertToHyphenCase,
    setOpenModal,
    openModal,
    handleSearch,
    cannedResponses,
    lazyGetCannedResponsesStatus,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    cannedResponsesMetaData,
    getCannedResponsesListData,
  } = useCannedResponses();

  return (
    <>
      <PageTitledHeader
        title={'Canned Responses'}
        canMovedBack
        moveBack={() =>
          router?.push(AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS)
        }
      />

      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
        ]}
      >
        <Box my={1}>
          <Search label={'Search Here'} setSearchBy={handleSearch} />
        </Box>
      </PermissionsGuard>

      <ApiRequestFlow
        showSkeleton={
          lazyGetCannedResponsesStatus?.isLoading ||
          lazyGetCannedResponsesStatus?.isFetching
        }
        hasError={lazyGetCannedResponsesStatus?.isError}
        refreshApi={getCannedResponsesListData}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD}
      >
        <Grid container spacing={3} mt={1}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.ADD_CANNED_RESPONSES_FOLDERS,
            ]}
          >
            <Grid item lg={4} sm={6} xs={12}>
              <AddNewCard
                title="Add New"
                iconBackgroundColor="custom.light_lavender_gray"
                iconColor="blue.dull_blue"
                onClick={() =>
                  setOpenModal({ create: true, delete: false, editData: null })
                }
              />
            </Grid>
          </PermissionsGuard>

          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_DEFAULT_CANNED_RESPONSES_FOLDERS,
            ]}
          >
            {cannedResponses
              ?.filter((item: any) => item?.perDefine)
              ?.map((response: any) => (
                <Grid item lg={4} sm={6} xs={12} key={response?._id}>
                  <SemiInteractiveInfoCard
                    onClick={() =>
                      router?.push({
                        pathname: `${AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}/${convertToHyphenCase(
                          response?.folderName,
                        )}`,
                        query: { id: response?._id },
                      })
                    }
                    isLocked={response?.perDefine}
                    name={response?.folderName}
                    description={response?.description ?? 'No Description'}
                    dropdownOptions={getCannedResponseDropdownOptions(
                      setOpenModal,
                      response,
                    )}
                  />
                </Grid>
              ))}
          </PermissionsGuard>

          {cannedResponses
            ?.filter((item: any) => !item?.perDefine)
            ?.map((response: any) => (
              <Grid item lg={4} sm={6} xs={12} key={response?._id}>
                <SemiInteractiveInfoCard
                  onClick={() =>
                    router?.push({
                      pathname: `${AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}/${convertToHyphenCase(
                        response?.folderName,
                      )}`,
                      query: { id: response?._id },
                    })
                  }
                  isLocked={response?.perDefine}
                  name={response?.folderName}
                  description={response?.description ?? 'No Description'}
                  dropdownOptions={getCannedResponseDropdownOptions(
                    setOpenModal,
                    response,
                  )}
                  hasNoDropdownPermission={false}
                  dropdownPermissions={[
                    AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_CUSTOM_FOLDERS,
                  ]}
                />
              </Grid>
            ))}
          <Grid item xs={12}>
            <CustomPagination
              currentPage={page}
              count={cannedResponsesMetaData?.pages}
              pageLimit={pageLimit}
              totalRecords={cannedResponsesMetaData?.total}
              onPageChange={(page: number) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </Grid>
        </Grid>
      </ApiRequestFlow>

      {openModal?.create && (
        <CreateNewFolder
          isPortalOpen={openModal}
          setIsPortalOpen={setOpenModal}
        />
      )}

      {openModal?.delete && (
        <DeleteCannedResponse
          isPortalOpen={openModal}
          setIsPortalOpen={setOpenModal}
        />
      )}
    </>
  );
};
