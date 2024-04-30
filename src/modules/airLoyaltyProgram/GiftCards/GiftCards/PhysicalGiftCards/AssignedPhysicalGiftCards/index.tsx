import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAssignedPhysicalGiftCards } from './useAssignedPhysicalGiftCards';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';

export const AssignedPhysicalGiftCards = () => {
  const {
    assignedPhysicalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetAssignedPhysicalGiftCardListStatus,
    setPage,
    setPageLimit,
  } = useAssignedPhysicalGiftCards();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.SEARCH_GIFT_CARD_DETAILS,
          ]}
        >
          <Search label="Search Here" setSearchBy={setSearch} />
        </PermissionsGuard>
        <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.ADD_GIFT_CARD,
            ]}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FilterListIcon />}
              onClick={() => setIsPortalOpen({ isOpen: true, isFilter: true })}
            >
              Filter
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.EXPORT,
            ]}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ExportBlackIcon />}
              onClick={() => setIsPortalOpen({ isOpen: true, isExport: true })}
            >
              Export
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS?.VIEW_GIFT_CARD_DETAILS,
        ]}
      >
        <TanstackTable
          columns={assignedPhysicalGiftCardColumns}
          data={lazyGetAssignedPhysicalGiftCardListStatus?.data?.data}
          isLoading={lazyGetAssignedPhysicalGiftCardListStatus?.isLoading}
          currentPage={
            lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.page
          }
          count={
            lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.pages
          }
          pageLimit={
            lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.limit
          }
          totalRecords={
            lazyGetAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetAssignedPhysicalGiftCardListStatus?.isFetching}
          isError={lazyGetAssignedPhysicalGiftCardListStatus?.isError}
          isSuccess={lazyGetAssignedPhysicalGiftCardListStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </PermissionsGuard>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
