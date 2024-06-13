import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useLazyGetTaskByIdQuery } from '@/services/airServices/tickets/single-ticket-details/tasks';
import { PAGINATION } from '@/config';
import {
  actionsForTicketTasksListsDynamic,
  ticketsTasksListsColumnsDynamic,
} from './Tasks.data';
import { buildQueryParams } from '@/utils/api';
import { useRouter } from 'next/router';
import { DetailTaskDrawer } from './DetailTaskDrawer';
import { DeleteTask } from './DeleteTask';
import { UpsertTasks } from './UpsertTasks';

export const useTasks = () => {
  const theme = useTheme();
  const router = useRouter();
  const { ticketId } = router?.query;
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [selectedTasksList, setSelectedTasksLists] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [lazyGetTicketsTasksTrigger, lazyGetTicketsTasksStatus] =
    useLazyGetTaskByIdQuery();

  const getTaskListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['meta', true + ''],
      ['ticketId', ticketId],
    ];

    const getTicketTasksParam: any = buildQueryParams(additionalParams);

    const apiDataParameter = {
      queryParams: getTicketTasksParam,
    };

    try {
      await lazyGetTicketsTasksTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getTaskListData();
  }, [page, pageLimit]);

  const portalComponentProps = {
    isPortalOpen,
    setIsPortalOpen,
    selectedTasksList,
    setSelectedTasksLists,
    setPage,
    page,
    getTaskListData,
    totalRecords: lazyGetTicketsTasksStatus?.data?.data?.tasks,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isDelete) {
      return <DeleteTask {...portalComponentProps} />;
    }
    if (isPortalOpen?.isUpsert) {
      return <UpsertTasks {...portalComponentProps} />;
    }
    if (isPortalOpen?.isView) {
      return <DetailTaskDrawer {...portalComponentProps} />;
    }
    return <></>;
  };

  const ticketsTasksListsColumns = ticketsTasksListsColumnsDynamic(
    selectedTasksList,
    setSelectedTasksLists,
    lazyGetTicketsTasksStatus?.data?.data?.tasks,
    setIsPortalOpen,
    theme,
  );

  const actionsForTicketTasksLists = actionsForTicketTasksListsDynamic?.(
    setIsPortalOpen,
    selectedTasksList,
  );

  return {
    ticketsTasksListsColumns,
    lazyGetTicketsTasksStatus,
    setPage,
    setPageLimit,
    isPortalOpen,
    setIsPortalOpen,
    selectedTasksList,
    renderPortalComponent,
    actionsForTicketTasksLists,
  };
};
