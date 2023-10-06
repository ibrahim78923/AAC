import CommonDrawer from '@/components/CommonDrawer';
import CreateTicket from '../TasksForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from '../TasksForm/TasksForm.data';
import { EditTaskDrawerI } from '../Tasks.interface';

export const EditTaskDrawer: React.FC<EditTaskDrawerI> = ({
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
        title="Edit Task"
        submitHandler={() => {
          methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
        }}
        footer={true}
        isOk={true}
        okText="Update"
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
