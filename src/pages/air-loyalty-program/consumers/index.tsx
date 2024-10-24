import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Consumers } from '@/modules/airLoyaltyProgram/Consumers';

const ConsumerPage = () => <Consumers />;

export default ConsumerPage;

ConsumerPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_CONSUMERS}>
      {page}
    </Layout>
  );
};
