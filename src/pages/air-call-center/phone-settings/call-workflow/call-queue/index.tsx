import Layout from '@/layout';
import CallQueue from '@/modules/airCallCenter/PhoneSettings/CallWorkFlow/CallQueue';

const AirCallCenterPage = () => {
  return (
    <>
      <CallQueue />
    </>
  );
};
export default AirCallCenterPage;
AirCallCenterPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
