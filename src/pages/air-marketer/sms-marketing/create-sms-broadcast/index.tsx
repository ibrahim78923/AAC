import Layout from '@/layout';
import CreateSMSBroadcast from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/CreateSMSBroadcast';

const AirMarketerCreateSmsBroadcastPage = () => {
  return <CreateSMSBroadcast />;
};

export default AirMarketerCreateSmsBroadcastPage;

AirMarketerCreateSmsBroadcastPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
