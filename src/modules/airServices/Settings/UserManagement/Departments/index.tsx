import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentsHeader } from './DepartmentsHeader';
import { useDepartments } from './useDepartments';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { Grid } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';

export const Departments = () => {
  const { setSearch, setPageLimit, setPage, lazyGetDepartmentStatus } =
    useDepartments();
  return (
    <>
      <DepartmentsHeader setSearch={setSearch} />
      <br />
      {lazyGetDepartmentStatus?.isLoading ||
      lazyGetDepartmentStatus?.isFetching ? (
        <SkeletonForm />
      ) : lazyGetDepartmentStatus?.isError ? (
        <ApiErrorState />
      ) : !!lazyGetDepartmentStatus?.data?.data?.departments?.length ? (
        <Grid container spacing={2}>
          {lazyGetDepartmentStatus?.data?.data?.departments?.map(
            (department: any) => (
              <Grid item xs={12} md={4} key={department?._id}>
                <DepartmentCard item={department} />
              </Grid>
            ),
          )}
          <CustomPagination setPageLimit={setPageLimit} setPage={setPage} />
        </Grid>
      ) : (
        <NoData />
      )}
    </>
  );
};
