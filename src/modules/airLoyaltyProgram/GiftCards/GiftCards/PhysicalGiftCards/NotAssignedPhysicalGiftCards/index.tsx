import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { ExportBlackIcon } from '@/assets/icons';
import { useNotAssignedPhysicalGiftCards } from './useNotAssignedPhysicalGiftCards';
import { ExportModal } from '@/components/ExportModal';
import { AssignedPhysicalGiftCard } from './AssignedPhysicalGiftCard';

export const NotAssignedPhysicalGiftCards = () => {
  const {
    notAssignedPhysicalGiftCardColumns,
    data,
    setSearch,
    search,
    handleFileExportSubmit,
    open,
    setOpen,
    handleClose,
    assignedTo,
    setAssignedTo,
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
        <Search
          label="Search Here"
          value={search}
          onChange={(e: any) => setSearch(e?.target?.value)}
        />
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ExportBlackIcon />}
          onClick={() => setOpen(true)}
        >
          Export
        </Button>
      </Box>
      <br />
      <TanstackTable
        data={data}
        columns={notAssignedPhysicalGiftCardColumns}
        isPagination
      />
      <ExportModal
        open={open}
        onSubmit={(exportType: any) => handleFileExportSubmit?.(exportType)}
        handleClose={handleClose}
      />
      <AssignedPhysicalGiftCard
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
      />
    </>
  );
};
