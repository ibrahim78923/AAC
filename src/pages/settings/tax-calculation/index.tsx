import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import TaxCalculation from '@/modules/settings/TaxCalculations';
function TaxCalculationPage() {
  return <TaxCalculation />;
}
export default TaxCalculationPage;
TaxCalculationPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
