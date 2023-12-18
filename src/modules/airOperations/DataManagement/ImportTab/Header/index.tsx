import { Box, Button } from '@mui/material';
import { DownloadLargeIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Filter } from '../../ExportTab/Filter';
import ImportModal from '../ImportModal';

export const Header = () => {
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Search label="Search Here" searchBy="" setSearchBy={''} />
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <ImportModal />
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DownloadLargeIcon />}
          >
            Download
          </Button>
          <Filter />
        </Box>
      </Box>
      <br />
    </>
  );
};
