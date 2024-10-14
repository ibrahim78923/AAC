import { Box, Button, Divider, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DateRangePicker } from 'react-date-range';
import { useHeader } from './useHeader';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const Header = (props: any) => {
  const { selectionRange, anchorElDate, handleCloseDate, handleApplyDate } =
    props;

  const { theme, handleClickDate, dateLabel, idDate, openDate, handleSelect } =
    useHeader(props);

  return (
    <PageTitledHeader title={'Dashboard'}>
      <Button
        variant={'outlined'}
        color={'inherit'}
        className={'small'}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClickDate}
      >
        {dateLabel}
      </Button>

      <Popover
        id={idDate}
        open={openDate}
        anchorEl={anchorElDate}
        onClose={handleCloseDate}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          rangeColors={[theme?.palette?.primary?.main]}
          color={theme?.palette?.primary?.main}
          ranges={[selectionRange]}
          onChange={(ranges) => handleSelect(ranges)}
          inputRanges={[]}
        />

        <Divider />

        <Box justifyContent={'end'} gap={1} display={'flex'} p={2}>
          <Button
            variant={'outlined'}
            color={'secondary'}
            className={'small'}
            onClick={handleCloseDate}
          >
            Cancel
          </Button>
          <Button
            variant={'contained'}
            className={'small'}
            onClick={handleApplyDate}
          >
            Apply
          </Button>
        </Box>
      </Popover>
    </PageTitledHeader>
  );
};
