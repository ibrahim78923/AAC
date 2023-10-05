import CommonDrawer from '@/components/CommonDrawer';
import CreateTicket from '../TasksForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from '../TasksForm/TasksForm.data';

export const AddTaskDrawer = ({ isDrawerOpen, onClose }: any) => {
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
        <CreateTicket
          submitCreateNewTicket={submitCreateNewTicket}
          methods={methodsCreateNewTicketForm}
          handleSubmit={methodsCreateNewTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};
