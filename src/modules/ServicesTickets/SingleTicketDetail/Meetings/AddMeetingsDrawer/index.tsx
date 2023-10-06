import { useForm } from 'react-hook-form';
import CommonDrawer from '@/components/CommonDrawer';
import { AddMeetingsDrawerPropsI } from './AddMeetingsDrawer.interface';
import { AddMeetingForm } from './AddMeetingForm';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addMeetingDefaultValues,
  addMeetingValidationSchema,
} from './AddMeetingForm/AddMeetingForm.data';

export const AddMeetingsDrawer = ({
  open,
  setDrawerOpen,
}: AddMeetingsDrawerPropsI) => {
  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(addMeetingValidationSchema),
    defaultValues: addMeetingDefaultValues,
  });
  const submitCreateNewTicket = async () => {};
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Add Meeting"
        submitHandler={() => {
          methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
        }}
        isOk={true}
        footer={true}
        okText="Save"
      >
        <AddMeetingForm
          submitCreateNewTicket={submitCreateNewTicket}
          methods={methodsCreateNewTicketForm}
          handleSubmit={methodsCreateNewTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </div>
  );
};
