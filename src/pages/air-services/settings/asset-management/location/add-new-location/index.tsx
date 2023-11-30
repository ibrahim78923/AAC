import Layout from '@/layout';
import AddNewLocation from '@/modules/airServices/Settings/AssetManagement/Location/AddNewLocation';

const AddNewLocationPage = () => {
  return <AddNewLocation />;
};

export default AddNewLocationPage;

AddNewLocationPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
