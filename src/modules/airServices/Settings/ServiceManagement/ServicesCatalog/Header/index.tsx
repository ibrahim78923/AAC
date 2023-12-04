import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box } from '@mui/material';
import React from 'react';

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
        <Box
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={2}
        ></Box>
        <Box>
          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
    </>
  );
};
