import { Header } from './Header';
import { useSingleInventoryDetail } from './useSingleInventoryDetail';
import { AlertModals } from '@/components/AlertModals';
import { SingleInventoryDetailsTabs } from './SingleInventoryDetailTabs';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const SingleInventoryDetail = () => {
  const {
    singleInventoryDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    submitDeleteHandler,
  }: any = useSingleInventoryDetail();

  return (
    <>
      <Header dropdownOptions={singleInventoryDetailActionDropdown} />
      <br />

      <SingleInventoryDetailsTabs />

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          handleSubmitBtn={submitDeleteHandler}
          message="Are you sure want to delete this Inventory?"
        />
      )}
    </>
  );
};
