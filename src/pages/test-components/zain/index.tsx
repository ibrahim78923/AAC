import SuperAdminLayout from '@/layout/index';

const TestComponentsZainPage = () => {
  return <></>;
};
TestComponentsZainPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentsZainPage;
