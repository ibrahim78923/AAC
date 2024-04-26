import CommonDrawer from '@/components/CommonDrawer';
import { TasksDrawersForm } from '../TasksDrawersForm';
import { useAddTaskDrawer } from './useAddTaskDrawer';

export const AddTaskDrawer = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    drawerSubmitHandler,
    methodsCreateNewTicketForm,
    departmentDropdown,
    userDropdown,
    handleClose,
    isLoading,
  } = useAddTaskDrawer(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleClose}
        title="Add New Task"
        submitHandler={drawerSubmitHandler}
        footer={true}
        isOk={true}
        okText="Add Task"
        isLoading={isLoading}
      >
        <TasksDrawersForm
          methods={methodsCreateNewTicketForm}
          handleSubmit={drawerSubmitHandler}
          departmentDropdown={departmentDropdown}
          userDropdown={userDropdown}
        />
      </CommonDrawer>
    </>
  );
};
