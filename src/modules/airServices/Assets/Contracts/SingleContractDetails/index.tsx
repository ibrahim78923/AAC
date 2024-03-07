import { AlertModals } from '@/components/AlertModals';
import { Header } from './Header';
import { useSingleContractDetails } from './useSingleContractDetails';
import { SingleContractDetailsTabs } from './SingleContractDetailsTabs';

export const SingleContractDetails = () => {
  const {
    singleContractDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    terminateModalOpen,
    setTerminateModalOpen,
    handleDeleteBtn,
    handleSubmitForTerminated,
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
          handleSubmitBtn={handleSubmitForTerminated}
          message="Are you sure  want to Terminate this Contract ?"
        />
      )}
      {deleteModalOpen && (
        <AlertModals
          type="delete"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={handleDeleteBtn}
          message="Are you sure  want to delete this Contract ?"
        />
      )}
    </>
  );
};
