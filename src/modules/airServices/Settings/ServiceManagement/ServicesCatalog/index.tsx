import { Divider } from '@mui/material';
import React from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import useServicesCatalog from './useServicesCatalog';
import Header from './Header';
import CategoriesSection from './CategoriesSection';
import ServiceSection from './ServicesSection';

const ServicesCatalog = () => {
  const {
    results,
    selectedCheckboxes,
    setSelectedCheckboxes,
    isAnyCheckboxSelected,
    open,
    setOpen,
    handleClickOpen,
    categories,
    setPageLimit,
    setPage,
    handlePageChange,
    paginationData,
    categoriesIsLoading,
    categoriesIsFetching,
    isLoading,
    isFetching,
  } = useServicesCatalog();

  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_SERVICES_CATALOG,
      ]}
    >
      <Header categories={categories} />

      <CategoriesSection
        categoriesIsLoading={categoriesIsLoading}
        categoriesIsFetching={categoriesIsFetching}
        handleClickOpen={handleClickOpen}
        categories={categories}
        paginationData={paginationData}
        setPage={setPage}
        setPageLimit={setPageLimit}
        handlePageChange={handlePageChange}
        open={open}
        setOpen={setOpen}
      />

      <Divider sx={{ my: 2 }} />

      <ServiceSection
        isLoading={isLoading}
        isFetching={isFetching}
        selectedCheckboxes={selectedCheckboxes}
        setSelectedCheckboxes={setSelectedCheckboxes}
        results={results}
        isAnyCheckboxSelected={isAnyCheckboxSelected}
      />
    </PermissionsGuard>
  );
};

export default ServicesCatalog;
