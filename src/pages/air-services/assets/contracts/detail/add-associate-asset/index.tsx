import Layout from '@/layout';
import { AddAssociateAsset } from '@/modules/airServices/Assets/Contracts/SingleContractDetails/AssetsAssociate/AddAssociateAsset';

const AddAssociateAssetPage = () => {
  return <AddAssociateAsset />;
};

AddAssociateAssetPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AddAssociateAssetPage;
