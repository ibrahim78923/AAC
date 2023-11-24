import { Typography, Box } from '@mui/material';
import React from 'react';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { ViewDetailBackArrowIcon } from '@/assets/icons';

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
          <Typography variant="h5">Single Vendor Detail</Typography>
        </Box>
        <Box>
          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
    </>
  );
};
