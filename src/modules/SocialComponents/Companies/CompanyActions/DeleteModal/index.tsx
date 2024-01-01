import React from 'react';

import { AlertModals } from '@/components/AlertModals';
import useCompanies from '../../useCompanies';

const DeleteModal = ({ isDeleteCompany, setIsDeleteCompany }: any) => {
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
          deleteCompanies({});
        }}
      />
    </>
  );
};

export default DeleteModal;
