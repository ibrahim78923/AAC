import Layout from '@/layout';
import { SingleVendorDetail } from '@/modules/airServices/Settings/AssetManagement/Vendor/SingleVendorDetail';

const VendorDetailsPage = () => {
  return <SingleVendorDetail />;
};

export default VendorDetailsPage;

VendorDetailsPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
