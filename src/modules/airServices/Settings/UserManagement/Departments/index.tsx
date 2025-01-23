import { DepartmentsHeader } from './DepartmentsHeader';
import { useDepartments } from './useDepartments';
import CustomPagination from '@/components/CustomPagination';
import { DeleteDepartment } from './DeleteDepartment';
import { UpsertDepartment } from './UpsertDepartment';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ListGrid } from '@/components/Grids/ListGrid';
import { InteractiveInfoCard } from '@/components/Cards/InteractiveInfoCard';
import { Permissions } from '@/constants/permissions';

export const Departments = () => {
  const {
    handleSearch,
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
        handleSearch={handleSearch}
        setOpenUpsertModal={setOpenUpsertModal}
        setSelectedDepartment={setSelectedDepartment}
      />

      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.VIEW_DEPARTMENTS,
        ]}
      >
        {
          <ApiRequestFlow
            showSkeleton={
              lazyGetDepartmentStatus?.isLoading ||
              lazyGetDepartmentStatus?.isFetching
            }
            hasError={lazyGetDepartmentStatus?.isError}
            hasNoData={
              !!!lazyGetDepartmentStatus?.data?.data?.departments?.length
            }
            noDataMessage="No department found"
            refreshApi={() => getDepartmentListData?.(page)}
            skeletonType={SKELETON_TYPES?.BASIC_CARD}
            cardSkeletonType={
              SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD
            }
          >
            <ListGrid
              md={4}
              list={lazyGetDepartmentStatus?.data?.data?.departments}
              render={(department: any) => (
                <InteractiveInfoCard
                  hasUsersList
                  isShadowCard
                  hasAvatar
                  avatarSrc={department?.attachment?.fileUrl}
                  name={department?.name}
                  description={department?.description}
                  dropdownOptions={actionDropdownData?.(department)}
                  handleAddUser={() => handleAddMember?.(department)}
                  usersList={department?.membersListDetails}
                  showCount={false}
                  addUserPermissions={[
                    AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_MEMBERS_IN_DEPARTMENTS,
                  ]}
                  dropdownPermissions={
                    Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_EDIT_DELETE_DEPARTMENTS
                  }
                />
              )}
            />
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
          </ApiRequestFlow>
        }
      </PermissionsGuard>
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
