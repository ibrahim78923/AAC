import { AlertModals } from '@/components/AlertModals';
import useCompanies from '../../useCompanies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

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
      enqueueSnackbar(`Company deleted successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDeleteCompany({ deleteModal: false });
      setCheckedRows([]);
    } catch (error: any) {
      enqueueSnackbar(`something went wrong`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
