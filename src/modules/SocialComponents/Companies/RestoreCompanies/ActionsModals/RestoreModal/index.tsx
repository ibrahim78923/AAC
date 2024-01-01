import { AlertModals } from '@/components/AlertModals';
import { AssignCommonIcon } from '@/assets/icons';
import { useRestoreCompaniesMutation } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const RestoreModal = ({
  isRestoreItem,
  setIsRestoreItem,
  checkedRows,
}: any) => {
  const [restoreCompanies] = useRestoreCompaniesMutation();

  return (
    <>
      <AlertModals
        typeImage={<AssignCommonIcon />}
        message="You are about to restore a record."
        type="Restore Company"
        open={isRestoreItem}
        cancelBtnText="Cancel"
        submitBtnText="Restore"
        handleClose={() => setIsRestoreItem({ isOpen: false })}
        handleSubmitBtn={() => {
          restoreCompanies({
            id: checkedRows,
            body: { action: isRestoreItem?.type },
          });
          setIsRestoreItem({ isOpen: false });
          enqueueSnackbar(`Company restored successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
        }}
      />
    </>
  );
};

export default RestoreModal;
