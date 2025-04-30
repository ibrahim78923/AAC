import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { contractsColumns } from './GridView.data';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { CustomTooltip } from '@/components/CustomTooltip';
import { SentIcon, SignedIcon, ViewedIcon } from '@/assets/icons';
import DefaultUserIcon from '@/assets/icons/shared/default-user';
import useGridView from './useGridView';
import { ENUM_CONTRACT_STATUS, getPartyName } from '@/utils/contracts';

const ContractsGrid = ({
  activeFolder,
  selectedRecords,
  setSelectedRecords,
  tabValue,
  filterParams,
}: any) => {
  const {
    isViewAllActivityDrawerOpen,
    setIsViewAllActivityDrawerOpen,
    data,
    isSuccess,
    isError,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
    theme,
  } = useGridView({ tabValue, activeFolder, filterParams });

  const [viewMoreData, setViewMoreData] = useState<any>([]);

  return (
    <>
      <TanstackTable
        columns={contractsColumns({
          setIsViewAllActivityDrawerOpen,
          setSelectedRecords,
          selectedRecords,
          data: data?.data?.commoncontract,
          setViewMoreData,
        })}
        data={data?.data?.commoncontract ?? []}
        isPagination
        isSuccess={isSuccess}
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        currentPage={data?.data?.meta?.page}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />

      <CommonDrawer
        footer
        isDrawerOpen={isViewAllActivityDrawerOpen}
        onClose={() => setIsViewAllActivityDrawerOpen(false)}
        title="Signees"
        okText="Send Reminder"
        cancelText="cancel"
        isOk
      >
        {viewMoreData?.signees?.map((signee: any) => {
          return (
            <Box
              key={signee?._id}
              sx={{
                mt: '32px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {viewMoreData?.status !== ENUM_CONTRACT_STATUS?.DRAFT && (
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    <CustomTooltip
                      title={signee?.emailSent ? 'Sent' : 'Not sent'}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          color: signee?.emailSent ? 'primary.main' : 'inherit',
                        }}
                      >
                        <SentIcon />
                      </Box>
                    </CustomTooltip>

                    <CustomTooltip
                      title={signee?.isViewed ? 'Viewed' : 'Not viewed'}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          color: signee?.isViewed ? 'primary.main' : 'inherit',
                        }}
                      >
                        <ViewedIcon />
                      </Box>
                    </CustomTooltip>

                    <CustomTooltip
                      title={
                        !signee?.isViewed
                          ? 'Not viewed'
                          : signee?.signatureStatus ===
                              ENUM_CONTRACT_STATUS?.SIGNED
                            ? 'Signed'
                            : signee?.signatureStatus ===
                                ENUM_CONTRACT_STATUS?.REJECTED
                              ? 'Rejected'
                              : signee?.signatureStatus ===
                                  ENUM_CONTRACT_STATUS?.PENDING
                                ? 'Pending'
                                : signee?.signatureStatus ===
                                    ENUM_CONTRACT_STATUS?.CHANGE_REQUEST
                                  ? 'Change Request'
                                  : 'Not signed'
                      }
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          color: !signee?.isViewed
                            ? 'inherit'
                            : signee?.signatureStatus ===
                                ENUM_CONTRACT_STATUS?.SIGNED
                              ? 'primary.main'
                              : signee?.signatureStatus ===
                                  ENUM_CONTRACT_STATUS?.REJECTED
                                ? 'error.main'
                                : signee?.signatureStatus ===
                                    ENUM_CONTRACT_STATUS?.PENDING
                                  ? 'error.main'
                                  : signee?.signatureStatus ===
                                      ENUM_CONTRACT_STATUS?.CHANGE_REQUEST
                                    ? 'error.main'
                                    : 'inherit',
                        }}
                      >
                        <SignedIcon />
                      </Box>
                    </CustomTooltip>
                  </Box>
                )}
                <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                  {getPartyName(signee?.moduleData)}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  mt: '16px',
                  pl: '32px',
                }}
              >
                <Box
                  sx={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <DefaultUserIcon />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '13.74px' }}>
                    {signee?.personalTitle} {signee?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '13.74px',
                      color: theme?.palette?.custom?.light,
                    }}
                  >
                    {signee?.email}
                  </Typography>
                </Box>
              </Box>
              {signee?.signatureMessage && (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '13.74px',
                    color: theme?.palette?.custom?.light,
                    pl: '32px',
                    mt: '8px',
                  }}
                >
                  {signee?.signatureMessage}
                </Typography>
              )}
            </Box>
          );
        })}
      </CommonDrawer>
    </>
  );
};

export default ContractsGrid;
