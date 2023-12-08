import { Header } from '@/modules/airServices/Settings/ServiceManagement/ServicesCatalog/Header';

import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { MoveToCategory } from '../MoveToCategory';
import { ChangeStatus } from '../ChangeStatus';
import { useServicesAction } from './useServicesAction';

export const ServicesAction = () => {
  const {
    ServicesActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    open,
    setOpen,
    openStatus,
    setOpenStatus,
  } = useServicesAction();
  return (
    <>
      <Header dropdownOptions={ServicesActionDropdown} />
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
      {open && <MoveToCategory open={open} setOpen={setOpen} />}
      {openStatus && (
        <ChangeStatus openStatus={openStatus} setOpenStatus={setOpenStatus} />
      )}
    </>
  );
};
