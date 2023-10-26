import { Typography, Box, Button } from '@mui/material';
import ViewDetailBackArrowIcon from '@/assets/icons/modules/view-detail-Icon/view-detail-back-arrow-icon';
import React from 'react';
import { SingleDropdownButton } from '@/modules/airServices/common/Buttons/SingleDropdownButton';

export const Header = (props: any) => {
  const {
    dropdownOptions,
    // handleAddToInventory,
    handleReceived,
  } = props;

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <ViewDetailBackArrowIcon />
          <Typography variant="h5">Dell Purchase Order Details</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => handleReceived?.()}
          >
            Received item
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            // onClick={() => handleAddToInventory?.()}
          >
            Add to Inventory
          </Button>
          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
      <br />
    </>
  );
};
