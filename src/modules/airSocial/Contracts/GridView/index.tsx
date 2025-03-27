import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { contractsColumns } from './GridView.data';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { CustomTooltip } from '@/components/CustomTooltip';
import { SentIcon, SignedIcon, ViewedIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import DefaultUserIcon from '@/assets/icons/shared/default-user';
import useGridView from './useGridView';
import { ENUM_CONTRACT_STATUS } from '@/utils/contracts';

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
    <div>
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
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: 2 }}>
            --
          </Typography>

          {viewMoreData?.signees?.map((ele: any) => {
            return (
              <Box
                display="flex"
                alignItems="flex-start"
                gap="10px"
                key={uuidv4()}
              >
                <Box sx={{ display: 'flex', gap: '5px', minWidth: '80px' }}>
                  {ele?.signatureStatus === ENUM_CONTRACT_STATUS?.SIGNED && (
                    <CustomTooltip title="Signed">
                      <Box>
                        <SignedIcon />
                      </Box>
                    </CustomTooltip>
                  )}

                  {ele?.signatureStatus === ENUM_CONTRACT_STATUS?.REJECTED && (
                    <CustomTooltip title="Rejected">
                      <Box>
                        <SignedIcon color={theme?.palette?.error?.main} />
                      </Box>
                    </CustomTooltip>
                  )}

                  {(ele?.signatureStatus === ENUM_CONTRACT_STATUS?.SIGNED ||
                    ele?.signatureStatus ===
                      ENUM_CONTRACT_STATUS?.REJECTED) && (
                    <CustomTooltip title="Viewed">
                      <Box>
                        <ViewedIcon />
                      </Box>
                    </CustomTooltip>
                  )}

                  {ele?.emailSent && (
                    <CustomTooltip title="Sent">
                      <Box>
                        <SentIcon />
                      </Box>
                    </CustomTooltip>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                    {ele?.party?.moduleData?.name ?? '--'}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
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
                        {ele?.personalTitle} {ele?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '13.74px',
                          color: theme?.palette?.custom?.light,
                        }}
                      ></Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ContractsGrid;
