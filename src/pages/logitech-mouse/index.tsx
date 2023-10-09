import Layout from '@/layout';
import LogitechMouse from '@/modules/LogitechMouse';

function LogitechMousePage() {
  return (
    <>
      <LogitechMouse />
    </>
  );
}
export default LogitechMousePage;

LogitechMousePage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
