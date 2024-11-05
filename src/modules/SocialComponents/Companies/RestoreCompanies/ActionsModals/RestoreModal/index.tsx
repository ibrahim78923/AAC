import { AlertModals } from '@/components/AlertModals';
import { AssignCommonIcon } from '@/assets/icons';
import { useRestoreCompaniesMutation } from '@/services/commonFeatures/companies';
import { successSnackbar } from '@/lib/snackbar';

const RestoreModal = ({
  isRestoreItem,
  setIsRestoreItem,
  checkedRows,
  setCheckedRows,
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
          setCheckedRows([]);
          setIsRestoreItem({ isOpen: false });
          successSnackbar(`Company restored successfully`);
        }}
      />
    </>
  );
};

export default RestoreModal;
