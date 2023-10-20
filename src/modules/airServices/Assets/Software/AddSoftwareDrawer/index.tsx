import CommonDrawer from '@/components/CommonDrawer';
import {
  AddSoftwareDefaultValues,
  AddSoftwareValidationSchema,
} from './AddSoftwareForm/AddSoftware.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import AddSoftwareForm from './AddSoftwareForm';

export const AddSoftwareDrawer = ({ isDrawerOpen, onClose }: any) => {
  const methodsAddSoftwareForm = useForm({
    resolver: yupResolver(AddSoftwareValidationSchema),
    defaultValues: AddSoftwareDefaultValues,
  });
  const submitAddSoftwareForm = async () => {
    onClose(false);
    enqueueSnackbar('Information Created Successfully', {
      variant: 'success',
      autoHideDuration: 1000,
    });
  };
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose(false)}
        isOk
        okText="Save"
        footer
        title="New Software"
        submitHandler={() => {
          methodsAddSoftwareForm.handleSubmit(submitAddSoftwareForm)();
        }}
      >
        <AddSoftwareForm
          submitCreateNewTicket={submitAddSoftwareForm}
          methods={methodsAddSoftwareForm}
          handleSubmit={methodsAddSoftwareForm.handleSubmit}
        />
      </CommonDrawer>
    </div>
  );
};
