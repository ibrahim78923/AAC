import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import { useNotAssignedPhysicalGiftCards } from './useNotAssignedPhysicalGiftCards';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_PHYSICAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';

export const NotAssignedPhysicalGiftCards = () => {
  const {
    notAssignedPhysicalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetUnAssignedPhysicalGiftCardListStatus,
    setPage,
    setPageLimit,
  } = useNotAssignedPhysicalGiftCards();

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
              variant="contained"
              startIcon={<AddWhiteBgIcon />}
              onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
            >
              Add
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
          columns={notAssignedPhysicalGiftCardColumns}
          data={lazyGetUnAssignedPhysicalGiftCardListStatus?.data?.data}
          isLoading={lazyGetUnAssignedPhysicalGiftCardListStatus?.isLoading}
          currentPage={
            lazyGetUnAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.page
          }
          count={
            lazyGetUnAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.pages
          }
          pageLimit={
            lazyGetUnAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.limit
          }
          totalRecords={
            lazyGetUnAssignedPhysicalGiftCardListStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetUnAssignedPhysicalGiftCardListStatus?.isFetching}
          isError={lazyGetUnAssignedPhysicalGiftCardListStatus?.isError}
          isSuccess={lazyGetUnAssignedPhysicalGiftCardListStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </PermissionsGuard>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
