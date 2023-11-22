import Layout from '@/layout';
import { Vendor } from '@/modules/airServices/Settings/AssetManagement/Vendor';

const VendorPage = () => {
  return <Vendor />;
};

export default VendorPage;

VendorPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
