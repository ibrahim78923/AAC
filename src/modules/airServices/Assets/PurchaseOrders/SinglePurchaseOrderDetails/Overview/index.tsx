import { Avatar, Box, Typography } from '@mui/material';
import { overviewTableColumns } from './Overview.data';
import OverviewModel from './OverviewModal';
import OverviewBilling from './OverviewBilling';
import TanstackTable from '@/components/Table/TanstackTable';
import { useOverview } from './useOverview';
import { isValidElement } from 'react';
import { DYNAMIC_FORM_FIELDS_TYPES, isValidDate } from '@/utils/dynamic-forms';
import { getImageByType } from '@/utils/avatarUtils';
import { uiDateFormat } from '@/lib/date-time';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const Overview = () => {
  const {
    openOverviewModal,
    setOpenOverviewModal,
    theme,
    purchaseOrderData,
    purchaseOrderDetailData,
    orderStatus,
    handleDownload,
    uniqueNumber,
    isLoading,
    isFetching,
    handleRowClick,
    isError,
    overviewData,
    refetch,
  } = useOverview();

  return (
    <>
      <Typography variant="h5" py={'0.625rem'}>
        Inventory Details
      </Typography>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <Box bgcolor={'primary.lighter'} borderRadius={2}>
          {Object?.entries(overviewData)?.map(([key, value]: any) => (
            <Box key={key} display={'flex'}>
              <Typography
                variant={'body2'}
                fontWeight={500}
                p={2}
                color={'grey.600'}
                minWidth={'25%'}
              >
                {key}:
              </Typography>
              <Typography
                variant={'body2'}
                p={2}
                color={'grey.900'}
                fontWeight={500}
              >
                {isValidElement(value) ? (
                  value
                ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                  value !== null &&
                  DYNAMIC_FORM_FIELDS_TYPES?.LABEL in value ? (
                  value?.label
                ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                  value !== null &&
                  DYNAMIC_FORM_FIELDS_TYPES?.FILE_URL in value ? (
                  <Avatar
                    src={getImageByType(value?.fileType, value?.fileUrl)}
                    alt="file-preview"
                    sx={{ width: 45, height: 45 }}
                    variant={'rounded'}
                  />
                ) : isValidDate(value) ? (
                  uiDateFormat(value)
                ) : (
                  value?.toString()
                )}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box mt={'1rem'}>
          <Typography variant="h5" py={'0.625rem'}>
            Items Details
          </Typography>
          <TanstackTable
            data={purchaseOrderDetailData}
            columns={overviewTableColumns(handleRowClick, theme, orderStatus)}
          />
        </Box>
        <Box m={'1rem 3rem 0 0'}>
          <OverviewBilling
            purchaseOrderDetailData={purchaseOrderDetailData}
            purchaseOrderData={purchaseOrderData}
          />
        </Box>
      </ApiRequestFlow>
      {openOverviewModal && (
        <OverviewModel
          openOverviewModal={openOverviewModal}
          setOpenOverviewModal={setOpenOverviewModal}
          purchaseOrderDetailData={purchaseOrderDetailData}
          purchaseOrderData={purchaseOrderData}
          theme={theme}
          orderStatus={orderStatus}
          handleDownload={handleDownload}
          uniqueNumber={uniqueNumber}
        />
      )}
    </>
  );
};
