import { AlertModals } from '@/components/AlertModals';
import useCompanies from '../../useCompanies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const DeleteModal = ({
  isDeleteCompany,
  setIsDeleteCompany,
  checkedRows,
  setCheckedRows,
}: any) => {
  const { deleteCompanies } = useCompanies();

  const deleteTicket = async () => {
    try {
      await deleteCompanies({ ids: checkedRows })?.unwrap();
      successSnackbar(`Company deleted successfully`);
      setIsDeleteCompany({ deleteModal: false });
      setCheckedRows([]);
    } catch (error: any) {
      errorSnackbar(`something went wrong`);
    }
  };

  return (
    <>
      <AlertModals
        message={
          "You're about to delete a record .Deleted record can't be restored after 90days"
        }
        type={'delete'}
        submitBtnText="OK, Delete"
        open={isDeleteCompany}
        handleClose={() =>
          setIsDeleteCompany({ ...isDeleteCompany, deleteModal: false })
        }
        handleSubmitBtn={() => deleteTicket()}
      />
    </>
  );
};

export default DeleteModal;
