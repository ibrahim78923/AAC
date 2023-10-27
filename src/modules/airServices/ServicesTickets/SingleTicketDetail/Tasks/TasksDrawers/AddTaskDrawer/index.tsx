import CommonDrawer from '@/components/CommonDrawer';
import { TasksDrawersForm } from '../TasksDrawersForm';
import { AddTaskDrawerI } from './AddTaskDrawer.interface';
import { useAddTaskDrawer } from './useAddTaskDrawer';

export const AddTaskDrawer: React.FC<AddTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
}) => {
  const {
    drawerSubmitHandler,
    methodsCreateNewTicketForm,
    submitCreateNewTicket,
  } = useAddTaskDrawer();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          onClose(false);
        }}
        title="Add New Task"
        submitHandler={drawerSubmitHandler}
        footer={true}
        isOk={true}
        okText="Add Task"
      >
        <TasksDrawersForm
          submitTicket={submitCreateNewTicket}
          methods={methodsCreateNewTicketForm}
          handleSubmit={methodsCreateNewTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};
