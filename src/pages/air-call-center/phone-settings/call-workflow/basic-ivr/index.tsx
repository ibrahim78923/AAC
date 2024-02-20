import Layout from '@/layout';
import BasicIVR from '@/modules/airCallCenter/PhoneSettings/CallWorkFlow/BasicIVR';

const AirCallCenterPage = () => {
  return (
    <>
      <BasicIVR />
    </>
  );
};

export default AirCallCenterPage;
AirCallCenterPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
