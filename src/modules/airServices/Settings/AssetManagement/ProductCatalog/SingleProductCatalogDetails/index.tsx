import { Fragment } from 'react';
import { Header } from './Header';
import { useSingleProductCatalogDetails } from './useSingleProductCatalogDetails';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { SingleProductCatalogDetailsTabs } from './SingleProductCatalogDetailTabs';

export const SingleProductCatalogDetails = () => {
  const {
    singleProductDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
  } = useSingleProductCatalogDetails();

  return (
    <Fragment>
      <Header
        dropdownOptions={singleProductDetailActionDropdown}
        title={'Apple MacBook Air 13'}
      />

      <br />

      <SingleProductCatalogDetailsTabs />

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen?.(false)}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Product Catalog?"
        />
      )}
    </Fragment>
  );
};
