import { Permissions } from '@/constants/permissions';
import SuperAdminLayout from '../../../layout';
import SettingSales from '@/modules/airSales/SettingSales';
const SettingsSalePage = () => {
  return <SettingSales />;
};
export default SettingsSalePage;
SettingsSalePage.getLayout = function getLayout(page: any) {
  return (
    <SuperAdminLayout permissions={Permissions?.AIR_SALES_SETTINGS}>
      {page}
    </SuperAdminLayout>
  );
};
