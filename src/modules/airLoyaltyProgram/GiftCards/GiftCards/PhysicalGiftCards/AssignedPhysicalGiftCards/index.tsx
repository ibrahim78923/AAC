import { Box, Button } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAssignedPhysicalGiftCards } from './useAssignedPhysicalGiftCards';

export const AssignedPhysicalGiftCards = () => {
  const { assignedPhysicalGiftCardColumns, data, setSearch, search } =
    useAssignedPhysicalGiftCards();

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
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExportBlackIcon />}
          >
            Export
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        data={data}
        columns={assignedPhysicalGiftCardColumns}
        isPagination
      />
    </>
  );
};
