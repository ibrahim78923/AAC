import CommonDrawer from '@/components/CommonDrawer';
import TasksForm from '../TasksForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TaskTicketFormDefaultValues,
  TaskTicketFormValidationSchema,
} from '../TasksForm/TasksForm.data';
import { EditTaskDrawerI } from '../Tasks.interface';

export const EditTaskDrawer: React.FC<EditTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
}) => {
  const methodsEditTicketForm = useForm({
    resolver: yupResolver(TaskTicketFormValidationSchema),
    defaultValues: TaskTicketFormDefaultValues,
  });
  const submitEditTicket = async () => {};
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          onClose(false);
        }}
        title="Edit Task"
        submitHandler={() => {
          methodsEditTicketForm.handleSubmit(submitEditTicket)();
        }}
        footer={true}
        isOk={true}
        okText="Update"
      >
        <TasksForm
          submitCreateNewTicket={submitEditTicket}
          methods={methodsEditTicketForm}
          handleSubmit={methodsEditTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};
