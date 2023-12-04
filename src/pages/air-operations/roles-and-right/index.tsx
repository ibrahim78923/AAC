import Layout from '@/layout';
import { RolesAndRight } from '@/modules/airOperations/RolesAndRight';

const RolesAndRightPage = () => {
  return <RolesAndRight />;
};

export default RolesAndRightPage;

RolesAndRightPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
