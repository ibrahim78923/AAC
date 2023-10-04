import SuperAdminLayout from '../../layout';
import SettingSales from '@/modules/SettingSales';
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
