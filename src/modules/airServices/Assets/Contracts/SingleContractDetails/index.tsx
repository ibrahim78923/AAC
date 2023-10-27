import { AlertModals } from '@/components/AlertModals';
import { Header } from './Header';
import { useSingleContractDetails } from './useSingleContractDetails';
import { enqueueSnackbar } from 'notistack';
import { SingleContractDetailsTabs } from './SingleContractDetailsTabs';

export const SingleContractDetails = () => {
  const {
    singleContractDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    terminateModalOpen,
    setTerminateModalOpen,
  } = useSingleContractDetails();
  return (
    <>
      <Header dropdownOptions={singleContractDetailsActionDropdown} />
      <br />
      <SingleContractDetailsTabs />
      <></>
      {terminateModalOpen && (
        <AlertModals
          type="delete"
          open={terminateModalOpen}
          handleClose={() => setTerminateModalOpen(false)}
          handleSubmitBtn={() => {
            setTerminateModalOpen(false);
            enqueueSnackbar('Contract Terminate Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure  want to Terminate this Contract ?"
        />
      )}
      {deleteModalOpen && (
        <AlertModals
          type="delete"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={() => {
            setDeleteModalOpen(false);
            enqueueSnackbar('Contract deleted Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure  want to delete this Contract ?"
        />
      )}
    </>
  );
};
