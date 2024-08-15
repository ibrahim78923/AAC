import { Box, Grid, Skeleton, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FolderLargePrimaryIcon, FolderLargeYellowIcon } from '@/assets/icons';
import { CreateNewFolder } from './CreateNewFolder';
import Search from '@/components/Search';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { useCannedResponses } from './useCannedResponses';
import CustomPagination from '@/components/CustomPagination';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { LockedIcon } from '@/assets/icons';
import { MoreHoriz } from '@mui/icons-material';
import { getCannedResponseDropdownOptions } from './CannedResponses.data';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import ApiErrorState from '@/components/ApiErrorState';

export const CannedResponses = () => {
  const {
    router,
    convertToHyphenCase,
    setOpenModal,
    openModal,
    setSearch,
    cannedResponses,
    lazyGetCannedResponsesStatus,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    cannedResponsesMetaData,
    deleteCannedResponse,
    isLoading,
    getCannedResponsesListData,
  } = useCannedResponses();

  return (
    <>
      <Box mb={2}>
        <PageTitledHeader
          title="Canned Responses"
          canMovedBack
          moveBack={() =>
            router?.push(AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS)
          }
        />
      </Box>
      <Box mb={2}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
          ]}
        >
          <Search size="small" label="Search Here" setSearchBy={setSearch} />
        </PermissionsGuard>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={4} sm={6} xs={12}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.ADD_CANNED_RESPONSES_FOLDERS,
            ]}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap=".7rem"
              height="12rem"
              border="0.06rem solid"
              borderColor="grey.700"
              borderRadius=".5rem"
              sx={{ cursor: 'pointer' }}
              onClick={() =>
                setOpenModal({ create: true, delete: false, editData: null })
              }
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="2.1rem"
                height="2.1rem"
                bgcolor="custom.light_lavender_gray"
                borderRadius="50%"
              >
                <AddRoundedIcon
                  sx={{
                    color: 'blue.dull_blue',
                  }}
                />
              </Box>
              <Typography fontWeight={600} color="blue.dull_blue">
                Add New
              </Typography>
            </Box>
          </PermissionsGuard>
        </Grid>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_DEFAULT_CANNED_RESPONSES_FOLDERS,
          ]}
        >
          {lazyGetCannedResponsesStatus?.isError ? (
            <Grid item xs={12}>
              <ApiErrorState
                canRefresh
                refresh={() => getCannedResponsesListData?.()}
              />
            </Grid>
          ) : lazyGetCannedResponsesStatus?.isLoading ||
            lazyGetCannedResponsesStatus?.isFetching ? (
            [1, 2, 3, 4, 5]?.map((item: number) => (
              <Grid item lg={4} sm={6} xs={12} key={item}>
                <Skeleton height="12rem" variant="rectangular" />
              </Grid>
            ))
          ) : (
            cannedResponses?.map((response: any) => (
              <Grid item lg={4} sm={6} xs={12} key={response?._id}>
                <Box
                  height="12rem"
                  border="0.06rem solid"
                  overflow="hidden"
                  borderColor="grey.700"
                  borderRadius=".5rem"
                  sx={{ cursor: 'pointer' }}
                  position={'relative'}
                >
                  <Box
                    display="flex"
                    justifyContent="end"
                    p={1}
                    position={'absolute'}
                    right={0}
                  >
                    {response?.perDefine ? (
                      <LockedIcon />
                    ) : (
                      <SingleDropdownButton
                        dropdownOptions={getCannedResponseDropdownOptions(
                          setOpenModal,
                          response,
                        )}
                        dropdownName={
                          <MoreHoriz
                            sx={{ color: 'secondary.lighter' }}
                            fontSize="medium"
                          />
                        }
                        hasEndIcon={false}
                        btnVariant="text"
                      />
                    )}
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    p={{ sm: 2, xs: 1 }}
                    flexDirection="column"
                    component={Link}
                    href={`${AIR_SERVICES?.CANNED_RESPONSE_SETTINGS}/${convertToHyphenCase(
                      response?.folderName,
                    )}?id=${response?._id}`}
                  >
                    <Box>
                      {!response?.isDeletedAble ? (
                        <FolderLargePrimaryIcon />
                      ) : (
                        <FolderLargeYellowIcon />
                      )}
                    </Box>
                    <Typography fontWeight={700} color="blue.dark" mt={1}>
                      {response?.folderName}
                    </Typography>
                    <Typography
                      fontWeight={500}
                      variant="body2"
                      color="custom.main"
                      sx={{
                        textOverflow: 'break-all',
                        wordBreak: 'break-all',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {response?.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          )}
        </PermissionsGuard>

        {cannedResponsesMetaData && cannedResponsesMetaData?.total > 5 && (
          <Grid item xs={12}>
            <CustomPagination
              currentPage={page}
              count={cannedResponsesMetaData?.pages}
              pageLimit={pageLimit}
              totalRecords={cannedResponsesMetaData?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </Grid>
        )}
      </Grid>

      {openModal?.create && (
        <CreateNewFolder
          openCreateNewFolderModal={openModal}
          closeCreateNewFolderModal={() =>
            setOpenModal({ open: false, delete: false, editData: null })
          }
        />
      )}

      {openModal?.delete && (
        <AlertModals
          message={'Are you sure you want to delete this Folder?'}
          type={ALERT_MODALS_TYPE?.DELETE}
          open={openModal?.delete}
          loading={isLoading}
          handleClose={() =>
            setOpenModal({ open: false, delete: false, editData: null })
          }
          handleSubmitBtn={deleteCannedResponse}
        />
      )}
    </>
  );
};
