import { AlertModals } from '@/components/AlertModals';

const RestoreAssignModalBox = ({ open, onClose, handleAssignModal }: any) => {
  return (
    <>
      <AlertModals
        message="You’re about to delete Contacts. Deleted Contacts can’t be resorted after 90 days."
        type="delete"
        open={open}
        handleClose={onClose}
        handleSubmit={() => {
          handleAssignModal;
        }}
      />
    </>
  );
};

export default RestoreAssignModalBox;
