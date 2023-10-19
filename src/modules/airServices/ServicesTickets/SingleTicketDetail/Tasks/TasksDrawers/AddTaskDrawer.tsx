import CommonDrawer from '@/components/CommonDrawer';
import TasksForm from '../TasksForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from '../TasksForm/TasksForm.data';
import { AddTaskDrawerI } from '../Tasks.interface';

export const AddTaskDrawer: React.FC<AddTaskDrawerI> = ({
  isDrawerOpen,
  onClose,
}) => {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });
  const submitCreateNewTicket = async () => {};
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          onClose(false);
        }}
        title="Add New Task"
        submitHandler={() => {
          methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
        }}
        footer={true}
        isOk={true}
        okText="Add Task"
      >
        <TasksForm
          submitCreateNewTicket={submitCreateNewTicket}
          methods={methodsCreateNewTicketForm}
          handleSubmit={methodsCreateNewTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};
