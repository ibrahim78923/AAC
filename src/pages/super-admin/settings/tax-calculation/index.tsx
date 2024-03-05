import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import TaxCalculation from '@/modules/superAdmin/settings/TaxCalculations';
const TaxCalculationPage = () => {
  return <TaxCalculation />;
};
export default TaxCalculationPage;
TaxCalculationPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.SETTING_TAX_CALCULATION}>{page}</Layout>
  );
};
