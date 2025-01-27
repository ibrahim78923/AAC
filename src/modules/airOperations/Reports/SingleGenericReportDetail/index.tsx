import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSingleGenericReportDetail } from './useSingleGenericReportDetail';
import { Box } from '@mui/material';
import { createElement } from 'react';
import { MUI_GRID_LENGTH } from '@/constants/strings';
import {
  REPORTS_WIDGET_COMPONENT,
  REPORTS_WIDGETS,
} from './SingleGenericReportDetail.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { DOWNLOAD_FILE_TYPE } from '@/constants/file';
import { DownloadButton } from '@/components/Buttons/DownloadButton';

export const SingleGenericReportDetail = () => {
  const {
    reportWidgets = {},
    reportResults = {},
    reportRef,
    singleReportApi,
    moveBack,
    showLoader,
  } = useSingleGenericReportDetail?.();

  return (
    <Box ref={reportRef}>
      <PageTitledHeader
        title={reportWidgets?.name}
        canMovedBack
        moveBack={moveBack}
      >
        <DownloadButton
          hasStyles={false}
          variant="contained"
          color="primary"
          disabled={showLoader}
          downloadRef={reportRef}
          downloadFileType={DOWNLOAD_FILE_TYPE?.PDF}
        >
          Download PDF
        </DownloadButton>
      </PageTitledHeader>
      <br />
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={singleReportApi?.isError}
        refreshApi={singleReportApi?.refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD}
      >
        <ContainerGrid>
          {reportWidgets?.widgets?.map((item: any, index: any) => (
            <CustomGrid
              key={item?._id}
              lg={
                item?.type === REPORTS_WIDGETS?.TEMPLATE_TEXT
                  ? MUI_GRID_LENGTH?.SIX
                  : MUI_GRID_LENGTH?.TWELVE
              }
            >
              {REPORTS_WIDGET_COMPONENT?.[item?.type] &&
                createElement(REPORTS_WIDGET_COMPONENT?.[item?.type], {
                  data: reportResults?.[index],
                  title: item?.title,
                  description: item?.text?.description,
                  isDateFilter: item?.isDateFilter,
                  tableColumns: item?.table?.fields,
                  barChart: item?.barChart,
                  pieChart: item?.genericChart,
                  donutChart: item?.genericChart,
                  filterQuery: item?.filterQuery,
                  results: reportResults,
                })}
            </CustomGrid>
          ))}
        </ContainerGrid>
      </ApiRequestFlow>
    </Box>
  );
};
