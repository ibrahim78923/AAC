import React from 'react';

import { AlertModals } from '@/components/AlertModals';
import useCompanies from '../../useCompanies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const DeleteModal = ({
  isDeleteCompany,
  setIsDeleteCompany,
  checkedRows,
}: any) => {
  const { deleteCompanies } = useCompanies();
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
        handleSubmitBtn={() => {
          deleteCompanies({ ids: checkedRows });
          setIsDeleteCompany({ deleteModal: false });
          enqueueSnackbar(`Company deleted successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
        }}
      />
    </>
  );
};

export default DeleteModal;
