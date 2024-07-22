import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import ContractType from '@/modules/airServices/Settings/AssetManagement/ContractType';

const ContractTypePage = () => {
  return <ContractType />;
};

export default ContractTypePage;

ContractTypePage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions?.AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_CONTRACT_TYPE
      }
    >
      {page}
    </Layout>
  );
};
