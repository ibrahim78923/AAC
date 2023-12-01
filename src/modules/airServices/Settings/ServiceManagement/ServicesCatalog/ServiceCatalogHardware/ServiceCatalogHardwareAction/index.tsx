import { Header } from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog/Header';
import { useServiceCatalogHardwareAction } from './useServiceCatalogHardware';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const ServiceCatalogHardwareAction = () => {
  const {
    ServiceCatalogHardwareActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
  } = useServiceCatalogHardwareAction();
  return (
    <>
      <Header dropdownOptions={ServiceCatalogHardwareActionDropdown} />
      <br />
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
