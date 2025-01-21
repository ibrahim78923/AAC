import { Divider } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import Header from './Header';
import { CategoriesList } from './CategoriesList';
import { ServicesList } from './ServicesList';

const ServicesCatalog = () => {
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_SERVICES_CATALOG,
      ]}
    >
      <Header />

      <CategoriesList />

      <Divider sx={{ my: 2 }} />

      <ServicesList />
    </PermissionsGuard>
  );
};

export default ServicesCatalog;
