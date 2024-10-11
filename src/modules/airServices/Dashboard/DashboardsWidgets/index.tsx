import { REPORT_TYPES } from '@/constants/strings';
import { Fragment } from 'react';
import { ReportsWidgets } from '../ReportsWidgets';
import { StaticDashboardWidgets } from '../StaticDashboardWidgets';

const { STATIC, DYNAMIC } = REPORT_TYPES ?? {};

export const DashboardWidgets = (props: any) => {
  const {
    isPreviewMode,
    ticketType,
    setTicketType,
    departmentId,
    setDepartmentId,
    apiData,
    reportsList,
    refetchApi,
  } = props;

  const staticReports = reportsList?.filter(
    (report: any) => report?.type === STATIC,
  );

  const dynamicReports = reportsList
    ?.map((report: any, index: any) =>
      report?.type === DYNAMIC
        ? { reportId: report?.reportId, type: report?.type, index: index }
        : undefined,
    )
    ?.filter((report: any) => !!report);

  return (
    <>
      <StaticDashboardWidgets
        widgets={staticReports}
        NoDataMessage=""
        NoDataImage=""
        NoDataHeight=""
        componentProps={{
          data: apiData,
          ticketType,
          setTicketType,
          departmentId,
          setDepartmentId,
          isPreviewMode: isPreviewMode,
          getSingleDashboardData: refetchApi,
        }}
      />
      {!!!dynamicReports?.length ? (
        <></>
      ) : (
        dynamicReports?.map((item: any) => (
          <Fragment key={item?.reportId}>
            <ReportsWidgets
              reportWidgets={apiData?.[`genericReports${item?.index}`]}
              reportResults={apiData?.[`genericReportsResult${item?.index}`]}
            />
          </Fragment>
        ))
      )}
    </>
  );
};
