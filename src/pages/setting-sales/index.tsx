import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import SettingSales from '@/modules/SettingSales/SettingSales';
function SettingsSalePage() {
  return (
    <div>
      <SettingSales />
    </div>
  );
}
export default SettingsSalePage;
SettingsSalePage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
