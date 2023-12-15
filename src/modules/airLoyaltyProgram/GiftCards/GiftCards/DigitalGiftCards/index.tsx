import { Box, Button } from '@mui/material';
import { useDigitalGiftCards } from './useDigitalGiftCards';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';

import { ExportModal } from '@/components/ExportModal';

export const DigitalGiftCards = (props: any) => {
  const { setShowButtons }: { setShowButtons: (value: boolean) => void } =
    props;
  const {
    theme,
    digitalGiftCardColumns,
    data,
    search,
    setSearch,
    handleClick,
    onSubmit,
    open,
    setOpen,
    handleClose,
  } = useDigitalGiftCards(setShowButtons);

  return (
    <Box
      border={`.1rem solid ${theme?.palette?.grey?.[700]}`}
      borderRadius={2}
      p={1.5}
    >
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
            onClick={handleClick}
          >
            Export
          </Button>
          <ExportModal
            open={open}
            setOpen={setOpen}
            onSubmit={onSubmit}
            handleClose={handleClose}
          />
          <Button variant="contained" startIcon={<AddWhiteBgIcon />}>
            Add
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable
        data={data}
        columns={digitalGiftCardColumns}
        isPagination
      />
    </Box>
  );
};
