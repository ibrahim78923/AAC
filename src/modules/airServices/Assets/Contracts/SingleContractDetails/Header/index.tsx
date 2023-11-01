import { Typography, Box, Button } from '@mui/material';
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
          <Typography variant="h5">Microsoft Office License</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button variant="outlined" color="secondary">
            Submit For Approval
          </Button>
          <Button variant="outlined" color="secondary">
            approve
          </Button>
          <Button variant="outlined" color="secondary">
            Reject
          </Button>

          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
    </>
  );
};
