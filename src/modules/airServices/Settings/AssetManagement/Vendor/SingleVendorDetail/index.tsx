import { AlertModals } from '@/components/AlertModals';
import { Header } from './Header';
import { SingleContractDetailsTabs } from './SingleVendorDetailTabs';
import { useSingleVendorDetails } from './useSingleVendorDetails';
import { enqueueSnackbar } from 'notistack';

export const SingleVendorDetail = () => {
  const {
    singleVendorDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useSingleVendorDetails();
  return (
    <>
      <Header dropdownOptions={singleVendorDetailsActionDropdown} />
      <br />
      <SingleContractDetailsTabs />

      {deleteModalOpen && (
        <AlertModals
          type="delete"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={() => {
            setDeleteModalOpen(false);
            enqueueSnackbar('Vendor deleted Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure you want to delete this Vendor?"
        />
      )}
    </>
  );
};
