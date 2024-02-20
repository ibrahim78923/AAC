import Layout from '@/layout';
import CallWorkFlow from '@/modules/airCallCenter/PhoneSettings/CallWorkFlow';

const AirCallCenterPage = () => {
  return (
    <>
      <CallWorkFlow />
    </>
  );
};
export default AirCallCenterPage;
AirCallCenterPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
