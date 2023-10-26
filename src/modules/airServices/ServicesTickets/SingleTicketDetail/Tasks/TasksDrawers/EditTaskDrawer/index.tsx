import CommonDrawer from '@/components/CommonDrawer';
import { TasksDrawersForm } from '../TasksDrawersForm';
import { EditTaskDrawerI } from './EditTaskDrawer.interface';
import { useEditTaskDrawer } from './useEditTaskDrawer';
export const EditTaskDrawer: React.FC<EditTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
}) => {
  const { drawerSubmitHandler, methodsEditTicketForm, submitEditTicket } =
    useEditTaskDrawer();
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
      >
        <TasksDrawersForm
          submitTicket={submitEditTicket}
          methods={methodsEditTicketForm}
          handleSubmit={methodsEditTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};
