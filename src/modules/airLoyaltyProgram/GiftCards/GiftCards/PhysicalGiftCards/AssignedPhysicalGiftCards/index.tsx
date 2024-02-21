import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAssignedPhysicalGiftCards } from './useAssignedPhysicalGiftCards';
import { ExportModal } from '@/components/ExportModal';
import { AssignedPhysicalGiftCardsFilter } from './AssignedPhysicalGiftCardsFilter';

export const AssignedPhysicalGiftCards = () => {
  const {
    assignedPhysicalGiftCardColumns,
    data,
    setSearch,
    search,
    open,
    setOpen,
    handleClose,
    isDrawerOpen,
    setIsADrawerOpen,
    handleFileExportSubmit,
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
        <Search
          label="Search Here"
          value={search}
          onChange={(e: any) => setSearch(e?.target?.value)}
        />
        <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FilterListIcon />}
            onClick={() => setIsADrawerOpen(true)}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExportBlackIcon />}
            onClick={() => setOpen(true)}
          >
            Export
          </Button>
          <ExportModal
            open={open}
            onSubmit={(exportType: any) => handleFileExportSubmit?.(exportType)}
            handleClose={handleClose}
          />
        </Box>
      </Box>
      <br />
      <TanstackTable
        data={data}
        columns={assignedPhysicalGiftCardColumns}
        isPagination
      />
      <AssignedPhysicalGiftCardsFilter
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsADrawerOpen}
      />
    </>
  );
};
