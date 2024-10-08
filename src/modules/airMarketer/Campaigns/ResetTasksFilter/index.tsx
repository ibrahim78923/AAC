import CommonDrawer from '@/components/CommonDrawer';
import { Button, ButtonGroup } from '@mui/material';
import useDrawerComponents from './DrawerComponents/useDrawerComponents';
import { CAMPAIGNS_CONSTANTS } from '@/constants/strings';
import useResetTasksFilter from './useResetTasksFilter';
import { ResetTasksFilterI } from './ResetTaskFilters.interface';

const ResetTasksFilter = (props: ResetTasksFilterI) => {
  const { isOpen, setIsOpen, setCurrentTabVal } = props;

  const {
    handleSubmit,
    onSubmit,
    methods,
    reset,
    taskFilters,
    setIsFilters,
    isFilters,
    setTaskFilters,
  } = useResetTasksFilter();

  const { selectedButton, handleActiveButton, setSelectedButton } =
    useDrawerComponents({
      setIsOpen,
      methods,
      setCurrentTabVal,
      taskFilters,
      reset,
      setIsFilters,
      isFilters,
      setTaskFilters,
    });

  const handleCloseDrawer = () => {
    if (isFilters) {
      setIsFilters(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      title={isFilters ? 'Filters' : 'Tasks'}
      okText={isFilters ? 'Filter' : 'Apply'}
      isOk={true}
      footer={isFilters ? true : false}
      onClose={handleCloseDrawer}
      submitHandler={handleSubmit(onSubmit)}
    >
      {!isFilters && (
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            className="small"
            color="inherit"
            disabled={selectedButton === CAMPAIGNS_CONSTANTS?.TASKS}
            onClick={() => {
              setSelectedButton(CAMPAIGNS_CONSTANTS?.TASKS);
            }}
          >
            Task
          </Button>
          <Button
            className="small"
            color="inherit"
            disabled={selectedButton === CAMPAIGNS_CONSTANTS?.COMMENTS}
            onClick={() => {
              setSelectedButton(CAMPAIGNS_CONSTANTS?.COMMENTS);
            }}
          >
            Comments
          </Button>
          <Button
            className="small"
            color="inherit"
            disabled={selectedButton === CAMPAIGNS_CONSTANTS?.CALENDAR}
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
