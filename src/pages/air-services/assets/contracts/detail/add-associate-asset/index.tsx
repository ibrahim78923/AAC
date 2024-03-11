import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { AddAssociateAsset } from '@/modules/airServices/Assets/Contracts/SingleContractDetails/AssetsAssociate/AddAssociateAsset';

const AddAssociateAssetPage = () => {
  return <AddAssociateAsset />;
};

AddAssociateAssetPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[
        AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
      ]}
    >
      {page}
    </Layout>
  );
};

export default AddAssociateAssetPage;
