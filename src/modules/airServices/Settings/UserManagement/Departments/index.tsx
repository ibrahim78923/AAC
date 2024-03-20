import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { DepartmentCard } from './DepartmentCard';
import { DepartmentsHeader } from './DepartmentsHeader';
import { useDepartments } from './useDepartments';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { Grid } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import { DeleteDepartment } from './DeleteDepartment';
import { UpsertDepartment } from './UpsertDepartment';

export const Departments = () => {
  const {
    setSearch,
    setPageLimit,
    setPage,
    lazyGetDepartmentStatus,
    openDeleteModal,
    setOpenDeleteModal,
    openUpsertModal,
    setOpenUpsertModal,
    selectedDepartment,
    setSelectedDepartment,
    actionDropdownData,
    handleAddMember,
    page,
    getDepartmentListData,
  } = useDepartments();
  return (
    <>
      <DepartmentsHeader
        setSearch={setSearch}
        setOpenUpsertModal={setOpenUpsertModal}
        setSelectedDepartment={setSelectedDepartment}
      />

      <br />
      {lazyGetDepartmentStatus?.isLoading ||
      lazyGetDepartmentStatus?.isFetching ? (
        <SkeletonForm />
      ) : lazyGetDepartmentStatus?.isError ? (
        <ApiErrorState />
      ) : !!lazyGetDepartmentStatus?.data?.data?.departments?.length ? (
        <>
          <Grid container spacing={2}>
            {lazyGetDepartmentStatus?.data?.data?.departments?.map(
              (department: any) => (
                <Grid item xs={12} md={4} key={department?._id}>
                  <DepartmentCard
                    item={department}
                    setOpenUpsertModal={setOpenUpsertModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    departmentActionDropdown={actionDropdownData}
                    handleAddMember={(item: any) => handleAddMember?.(item)}
                  />
                </Grid>
              ),
            )}
          </Grid>
          <br />
          <CustomPagination
            count={lazyGetDepartmentStatus?.data?.data?.meta?.pages}
            pageLimit={lazyGetDepartmentStatus?.data?.data?.meta?.limit}
            currentPage={lazyGetDepartmentStatus?.data?.data?.meta?.page}
            totalRecords={lazyGetDepartmentStatus?.data?.data?.meta?.total}
            onPageChange={(page: any) => setPage?.(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      ) : (
        <NoData message="No department found" />
      )}
      {openDeleteModal && (
        <DeleteDepartment
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          setPage={setPage}
          page={page}
          getDepartmentListData={getDepartmentListData}
          totalRecords={
            lazyGetDepartmentStatus?.data?.data?.departments?.length
          }
        />
      )}
      {openUpsertModal && (
        <UpsertDepartment
          openUpsertModal={openUpsertModal}
          setOpenUpsertModal={setOpenUpsertModal}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
        />
      )}
    </>
  );
};
