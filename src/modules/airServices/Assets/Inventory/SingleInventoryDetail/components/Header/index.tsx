import { Typography, Box } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';

import { SingleDropdownButton } from '@/modules/airServices/common/Buttons/SingleDropdownButton';
export const Header = (props: any) => {
  const { dropdownOptions } = props;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <ViewDetailBackArrowIcon />
          <Typography variant="h5">Logitech Mouse</Typography>
        </Box>
        <Box>
          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
    </>
  );
};
