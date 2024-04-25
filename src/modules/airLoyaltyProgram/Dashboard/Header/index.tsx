import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Divider, Popover, Typography } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useHeader } from './useHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

const Header = () => {
  const {
    theme,
    handleSelect,
    idDate,
    openDate,
    handleCloseDate,
    handleClickDate,
    anchorElDate,
    selectionRange,
  } = useHeader();
  return (
    <>
      <PermissionsGuard
        permissions={[AIR_LOYALTY_PROGRAM_DASHBOARD_PERMISSIONS?.APPLY_FILTERS]}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'row'}
        >
          <Typography variant="h3">Dashboard</Typography>
          <Button
            sx={{
              background: 'white',
              color: theme?.palette?.custom?.main,
              '&:hover': {
                background: theme?.palette?.grey[700],
              },
            }}
            onClick={handleClickDate}
          >
            This Month
            <ArrowDropDownIcon />
          </Button>
        </Box>

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
          <Divider flexItem />
          <Box justifyContent={'end'} display={'flex'} mb={2} mr={2} mt={1}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mr: '0.5rem' }}
              onClick={handleCloseDate}
            >
              Cancel
            </Button>
            <Button variant="contained">Apply</Button>
          </Box>
        </Popover>
      </PermissionsGuard>
    </>
  );
};

export default Header;
