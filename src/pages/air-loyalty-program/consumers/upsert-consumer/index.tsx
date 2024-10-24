import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { UpsertConsumer } from '@/modules/airLoyaltyProgram/Consumers/UpsertConsumer';

const UpsertConsumerPage = () => <UpsertConsumer />;

export default UpsertConsumerPage;

UpsertConsumerPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_CONSUMERS}>
      {page}
    </Layout>
  );
};
