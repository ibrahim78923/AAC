import { useGetTasksQuery } from '@/services/airSales/task';
import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setTaskDataArray } from '@/redux/slices/taskManagement/taskManagementSlice';

export const useTask = () => {
  const dispatch: any = useAppDispatch();

  const filtersData = useAppSelector((state: any) => state?.task?.filtersData);

  const [searchTask, setSearchTask] = useState('');
  const [toggler, setToggler] = useState<string>('listView');
  const handleToggler = (value: string) => setToggler(value);
  const [activeStep, setActiveStep] = useState(0);

  const [tabsValue, setTabsValue] = useState('');
  const [assignTo, setAssignTo] = useState('');

  const handleNextStep = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBackStep = () =>
    setActiveStep((prevActiveStep) =>
      prevActiveStep - activeStep > 0 ? 1 : prevActiveStep,
    );

  const [counter, setCounter] = useState(0);
  const handleInsightsBtnClick = () => setCounter(0);
  const handleFeedBtnClick = () => setCounter(1);

  const [actionType, setActionType] = useState('');
  const handleActionBtn = (val: any) => {
    setActionType(val);
  };

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const {
    data: taskData,
    isLoading,
    status,
  } = useGetTasksQuery({
    params: {
      page: page,
      limit: pageLimit,
      status: tabsValue || filtersData?.status,
      assignTo: assignTo || filtersData?.assignTo,
      priority: filtersData?.priority,
      dueDate: filtersData?.dueDate && filtersData?.dueDate?.toISOString(),
      search: searchTask,
    },
  });

  useEffect(() => {
    dispatch(setTaskDataArray(taskData));
  }, [taskData]);

  return {
    toggler,
    handleToggler,
    handleNextStep,
    handleBackStep,
    activeStep,
    counter,
    handleInsightsBtnClick,
    handleFeedBtnClick,

    actionType,
    handleActionBtn,
    taskData,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    isLoading,

    setTabsValue,
    setAssignTo,
    status,

    setSearchTask,
    searchTask,
  };
};
