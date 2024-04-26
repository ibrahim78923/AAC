import React from 'react';

import { AlertModals } from '@/components/AlertModals';

import { AlertModalDeleteIcon } from '@/assets/icons';
import { useRestoreCompaniesMutation } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const DeleteModal = ({
  isRestoreDelete,
  setIsRestoreDelete,
  checkedRows,
  setCheckedRows,
}: any) => {
  const [restoreCompanies] = useRestoreCompaniesMutation();
  return (
    <>
      <AlertModals
        typeImage={<AlertModalDeleteIcon />}
        message={
          "You're about to delete a Record Permanently. This action can't ne undo?"
        }
        type="Permanantly Delete"
        open={isRestoreDelete}
        cancelBtnText="Cancel"
        submitBtnText="Delete"
        handleClose={() => setIsRestoreDelete({ isOpen: false })}
        handleSubmitBtn={() => {
          restoreCompanies({
            id: checkedRows,
            body: { action: isRestoreDelete?.type },
          });
          setIsRestoreDelete({ isOpen: false });
          setCheckedRows([]);
          enqueueSnackbar(`Company deleted successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
        }}
      />
    </>
  );
};

export default DeleteModal;
