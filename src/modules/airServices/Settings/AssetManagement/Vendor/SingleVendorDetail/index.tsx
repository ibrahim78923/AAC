import { AlertModals } from '@/components/AlertModals';
import { Header } from './Header';
import { SingleContractDetailsTabs } from './SingleVendorDetailTabs';
import { useSingleVendorDetails } from './useSingleVendorDetails';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const SingleVendorDetail = () => {
  const {
    singleVendorDetailsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
  } = useSingleVendorDetails();
  return (
    <>
      <Header dropdownOptions={singleVendorDetailsActionDropdown} />
      <br />
      <SingleContractDetailsTabs />

      {deleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={handleDeleteBtn}
          message="Are you sure you want to delete this Vendor?"
        />
      )}
    </>
  );
};
