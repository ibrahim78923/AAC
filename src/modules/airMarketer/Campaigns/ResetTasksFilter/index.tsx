import CommonDrawer from '@/components/CommonDrawer';
import { Button, ButtonGroup } from '@mui/material';
import useDrawerComponents from './DrawerComponents/useDrawerComponents';
import { CAMPAIGNS_CONSTANTS } from '@/constants/strings';
import useResetTasksFilter from './useResetTasksFilter';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setCurrentTabVal: (value: number) => void;
}

const ResetTasksFilter = (props: Props) => {
  const { isOpen, setIsOpen, setCurrentTabVal } = props;
  const { handleSubmit, onSubmit, methods } = useResetTasksFilter();
  const {
    selectedButton,
    handleActiveButton,
    setSelectedButton,
    isFilters,
    setIsFilters,
  } = useDrawerComponents({ setIsOpen, methods, setCurrentTabVal });

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
