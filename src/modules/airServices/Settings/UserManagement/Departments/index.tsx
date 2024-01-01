import { DepartmentsDetail } from './DepartmentsDetail';
import { DepartmentsHeader } from './DepartmentsHeader';
import { useDepartments } from './useDepartments';

export const Departments = () => {
  const { searchBy, setSearchBy } = useDepartments();
  return (
    <>
      <DepartmentsHeader searchBy={searchBy} setSearchBy={setSearchBy} />
      <br />
      <br />
      <DepartmentsDetail />
    </>
  );
};
