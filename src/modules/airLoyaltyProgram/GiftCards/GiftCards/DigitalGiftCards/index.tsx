import { Box, Button } from '@mui/material';
import { useDigitalGiftCards } from './useDigitalGiftCards';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';

import { ExportModal } from '@/components/ExportModal';
import { DigitalGiftCardFilter } from './DigitalGiftCardFilter';
import { AddDigitalGiftCard } from './AddDigitalGiftCard';

export const DigitalGiftCards = (props: any) => {
  const { setShowButtons }: { setShowButtons: (value: boolean) => void } =
    props;
  const {
    theme,
    digitalGiftCardColumns,
    data,
    setSearch,
    handleFileExportSubmit,
    open,
    setOpen,
    handleClose,
    openFilter,
    setOpenFilter,
    addDigitalCard,
    setAddDigitalCard,
  } = useDigitalGiftCards(setShowButtons);

  return (
    <>
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
          <Search label="Search Here" setSearchBy={setSearch} />
          <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FilterListIcon />}
              onClick={() => setOpenFilter(true)}
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
              onSubmit={(exportType: any) =>
                handleFileExportSubmit?.(exportType)
              }
              handleClose={handleClose}
            />
            <Button
              variant="contained"
              startIcon={<AddWhiteBgIcon />}
              onClick={() => setAddDigitalCard(true)}
            >
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
      <DigitalGiftCardFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
      />
      <AddDigitalGiftCard
        addDigitalCard={addDigitalCard}
        setAddDigitalCard={setAddDigitalCard}
      />
    </>
  );
};
