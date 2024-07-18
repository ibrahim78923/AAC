import CommonDrawer from '@/components/CommonDrawer';
import { Button, ButtonGroup } from '@mui/material';
import useDrawerComponents from './DrawerComponents/useDrawerComponents';
import { CAMPAIGNS_CONSTANTS } from '@/constants/strings';
import useResetTasksFilter from './useResetTasksFilter';

interface TaskFilters {
  campaignId: string;
}
interface Props {
  setTaskFilters: (value: TaskFilters) => void;
  setIsFiltersOpen: (value: boolean) => void;
  setCurrentTabVal: (value: number) => void;
  setIsOpen: (value: boolean) => void;
  taskFilters: TaskFilters;
  isFilterOpen: boolean;
  reset: () => void;
  isOpen: boolean;
}

const ResetTasksFilter = (props: Props) => {
  const {
    isOpen,
    setIsOpen,
    setCurrentTabVal,
    setTaskFilters,
    taskFilters,
    reset,
    setIsFiltersOpen,
    isFilterOpen,
  } = props;
  const { handleSubmit, onSubmit, methods } = useResetTasksFilter(
    setTaskFilters,
    setIsFiltersOpen,
  );
  const { selectedButton, handleActiveButton, setSelectedButton } =
    useDrawerComponents({
      setIsOpen,
      methods,
      setCurrentTabVal,
      taskFilters,
      reset,
      setIsFiltersOpen,
      isFilterOpen,
    });

  const handleCloseDrawer = () => {
    if (isFilterOpen) {
      setIsFiltersOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      title={isFilterOpen ? 'Filters' : 'Tasks'}
      okText={isFilterOpen ? 'Filter' : 'Apply'}
      isOk={true}
      footer={isFilterOpen ? true : false}
      onClose={handleCloseDrawer}
      submitHandler={handleSubmit(onSubmit)}
    >
      {!isFilterOpen && (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            className="small"
            color="inherit"
            onClick={() => {
              setSelectedButton(CAMPAIGNS_CONSTANTS?.TASKS);
            }}
          >
            Task
          </Button>
          <Button
            className="small"
            color="inherit"
            onClick={() => {
              setSelectedButton(CAMPAIGNS_CONSTANTS?.COMMENTS);
            }}
          >
            Comments
          </Button>
          <Button
            className="small"
            color="inherit"
            onClick={() => {
              setSelectedButton(CAMPAIGNS_CONSTANTS?.CALENDAR);
            }}
          >
            Calendar
          </Button>
        </ButtonGroup>
      )}
      {handleActiveButton(selectedButton)}
    </CommonDrawer>
  );
};

export default ResetTasksFilter;
