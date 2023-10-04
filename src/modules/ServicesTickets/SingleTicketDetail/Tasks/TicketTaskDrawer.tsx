import CommonDrawer from '@/components/CommonDrawer';
import CreateTicket from './TasksForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from './TasksForm/TasksForm.data';

export const TicketTaskDrawer = ({
  isDrawerOpen,
  onClose,
  id,
  detailTitle,
}: any) => {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });
  const submitCreateNewTicket = async () => {};
  return (
    <>
      {id === 'create' ? (
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
      ) : id === 'details' ? (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={() => {
            onClose(false);
          }}
          title={detailTitle}
          submitHandler={() => {}}
          footer={true}
          isOk={true}
          okText="Update"
        ></CommonDrawer>
      ) : (
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
      )}
    </>
  );
};
