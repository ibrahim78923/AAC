import CommonDrawer from '@/components/CommonDrawer';
import { Button, ButtonGroup } from '@mui/material';
import useDrawerComponents from './DrawerComponents/useDrawerComponents';

const ResetTasksFilter = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const { selectedButton, handleActiveButton, setSelectedButton } =
    useDrawerComponents();

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      title="Tasks"
      okText="Apply"
      // submitHandler={()=>{}}
      isOk={true}
      footer={false}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button
          className="small"
          color="inherit"
          onClick={() => {
            setSelectedButton('tasks');
          }}
        >
          Task
        </Button>
        <Button
          className="small"
          color="inherit"
          onClick={() => {
            setSelectedButton('comments');
          }}
        >
          Comments
        </Button>
        <Button
          className="small"
          color="inherit"
          onClick={() => {
            setSelectedButton('calander');
          }}
        >
          Calendar
        </Button>
      </ButtonGroup>
      {handleActiveButton(selectedButton)}
    </CommonDrawer>
  );
};

export default ResetTasksFilter;
