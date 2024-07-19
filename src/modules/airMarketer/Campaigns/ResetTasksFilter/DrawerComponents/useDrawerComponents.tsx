import { useState } from 'react';
import { useTheme } from '@mui/material';
import Task from './Task';
import Comments from './Comments';
import Calander from './Calendar';
import { PAGINATION } from '@/config';
import {
  useDeleteCampaignTasksMutation,
  useGetCampaignsTasksQuery,
} from '@/services/airMarketer/campaigns';
import {
  CAMPAIGNS_CONSTANTS,
  NOTISTACK_VARIANTS,
  REPORT_TYPE,
} from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

const useDrawerComponents = ({
  setCurrentTabVal,
  setIsOpen,
  methods,
  taskFilters,
  reset,
  setIsFiltersOpen,
  isFilterOpen,
  setTaskFilters,
}: any) => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState(
    CAMPAIGNS_CONSTANTS?.TASKS,
  );

  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [isOpenDeleteDrawer, setIsOpenDeleteDrawer] = useState({
    isToggled: false,
    id: '',
  });
  const [isEditDrawer, setIsEditDrawer] = useState({
    isToggled: false,
    id: '',
    type: '',
  });

  const taskParams = {
    page: page,
    limit: pageLimit,
    campaignId: taskFilters?.campaignId ? taskFilters?.campaignId : undefined,
    assignedTo: taskFilters?.assignedTo ? taskFilters?.assignedTo : undefined,
    status:
      taskFilters?.status === REPORT_TYPE?.ALL
        ? undefined
        : taskFilters?.status,
    taskType: taskFilters?.taskType ? taskFilters?.taskType : undefined,
  };

  const { data: getCampaignsTasks, isLoading } =
    useGetCampaignsTasksQuery(taskParams);

  const compaignsTasksData = getCampaignsTasks?.data?.campaigntasks;

  const [deleteTasks, { isLoading: deleteTaskLoading }] =
    useDeleteCampaignTasksMutation();

  const handleDeleteModal = async (id: any) => {
    try {
      await deleteTasks({ ids: id })?.unwrap();
      enqueueSnackbar('Task Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setIsOpenDeleteDrawer({ ...isOpenDeleteDrawer, isToggled: false });
  };

  const handleActiveButton = (active: string) => {
    switch (active) {
      case CAMPAIGNS_CONSTANTS?.COMMENTS:
        return <Comments />;
      case CAMPAIGNS_CONSTANTS?.CALENDAR:
        return (
          <Calander
            setCurrentTabVal={setCurrentTabVal}
            setTaskFilters={setTaskFilters}
            taskFilters={taskFilters}
            setIsOpen={setIsOpen}
          />
        );
      default:
        return (
          <Task
            setIsOpenDeleteDrawer={setIsOpenDeleteDrawer}
            isOpenDeleteDrawer={isOpenDeleteDrawer}
            deleteTaskLoading={deleteTaskLoading}
            handleDeleteModal={handleDeleteModal}
            setCurrentTabVal={setCurrentTabVal}
            setIsFilters={setIsFiltersOpen}
            data={compaignsTasksData}
            setIsOpen={setIsOpen}
            isFilters={isFilterOpen}
            loading={isLoading}
            methods={methods}
            setIsEditDrawer={setIsEditDrawer}
            isEditDrawer={isEditDrawer}
            reset={reset}
          />
        );
    }
  };

  return {
    handleActiveButton,
    setSelectedButton,
    selectedButton,
    setPageLimit,
    setPage,
    theme,
  };
};
export default useDrawerComponents;
