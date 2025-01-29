import Layout from '@/layout';
import Delegates from '@/modules/orgAdmin/Delegates';

function DelegatesPage() {
  return (
    <>
      <Delegates />
    </>
  );
}
export default DelegatesPage;
DelegatesPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'customer-portal'}>{page}</Layout>;
};
