import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import CreateAd from '@/modules/airMarketer/PaidAds/CreateAd';

const CreateAdPage = () => {
  return <CreateAd />;
};

export default CreateAdPage;

CreateAdPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={Permissions?.AIR_MARKETER_PAID_ADS_CREATE_ADS_PERMISSIONS}
    >
      {page}
    </Layout>
  );
};
