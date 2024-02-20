import Layout from '@/layout';
import AgentExtension from '@/modules/airCallCenter/PhoneSettings/CallWorkFlow/AgentExtension';

const AirCallCenterPage = () => {
  return (
    <>
      <AgentExtension />
    </>
  );
};

export default AirCallCenterPage;
AirCallCenterPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
