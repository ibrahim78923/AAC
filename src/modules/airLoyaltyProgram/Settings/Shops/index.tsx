import { Grid } from '@mui/material';
import CheckboxCard from './CheckboxCard';
import { Header } from './Header';
import NoData from '@/components/NoData';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { useShops } from './useShops';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import CustomPagination from '@/components/CustomPagination';

const Shops = () => {
  const {
    search,
    setSearch,
    selectedShopsList,
    setSelectedShopsList,
    lazyGetShopListStatus,
    isPortalOpen,
    renderPortalComponent,
    setIsPortalOpen,
    selectAllShops,
    toggleShopSelection,
    setPageLimit,
    setPage,
  } = useShops();

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        setIsPortalOpen={setIsPortalOpen}
        selectedShopsList={selectedShopsList}
        setSelectedShopsList={setSelectedShopsList}
        handleSelectAll={selectAllShops}
      />
      <br />
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.VIEW_SHOP_DETAILS,
        ]}
      >
        {lazyGetShopListStatus?.isLoading ||
        lazyGetShopListStatus?.isFetching ? (
          <SkeletonForm />
        ) : !!lazyGetShopListStatus?.data?.data?.shops?.length ? (
          <>
            <Grid container spacing={2}>
              {lazyGetShopListStatus?.data?.data?.shops?.map?.((item: any) => (
                <Grid item xs={12} md={6} lg={4} key={item?._id}>
                  <CheckboxCard
                    data={item}
                    setIsPortalOpen={setIsPortalOpen}
                    selectedShopsList={selectedShopsList}
                    handleSelect={toggleShopSelection}
                  />
                </Grid>
              ))}
            </Grid>
            <br />
            <CustomPagination
              count={lazyGetShopListStatus?.data?.data?.meta?.pages}
              pageLimit={lazyGetShopListStatus?.data?.data?.meta?.limit}
              currentPage={lazyGetShopListStatus?.data?.data?.meta?.page}
              totalRecords={lazyGetShopListStatus?.data?.data?.meta?.total}
              onPageChange={(page: any) => setPage?.(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </>
        ) : (
          <NoData message={'No Shops found'} />
        )}
      </PermissionsGuard>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};

export default Shops;
