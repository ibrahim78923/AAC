import CommonDrawer from '@/components/CommonDrawer';
import { TasksDrawersForm } from '../TasksDrawersForm';
import { useEditTaskDrawer } from './useEditTaskDrawer';
export const EditTaskDrawer = (props: any) => {
  const { isDrawerOpen, onClose } = props;
  const {
    drawerSubmitHandler,
    methodsEditTicketForm,
    departmentDropdown,
    userDropdown,
    isLoading,
  } = useEditTaskDrawer(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          onClose(false);
        }}
        title="Edit Task"
        submitHandler={drawerSubmitHandler}
        footer={true}
        isOk={true}
        okText="Update"
        isLoading={isLoading}
      >
        <TasksDrawersForm
          methods={methodsEditTicketForm}
          handleSubmit={drawerSubmitHandler}
          departmentDropdown={departmentDropdown}
          userDropdown={userDropdown}
        />
      </CommonDrawer>
    </>
  );
};
