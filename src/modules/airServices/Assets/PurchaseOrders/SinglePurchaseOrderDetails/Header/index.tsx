import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { useHeader } from './useHeader';
import { PURCHASE_ORDER_STATUS } from '@/constants/strings';

export const Header = (props: any) => {
  const {
    dropdownOptions,
    handleAddToInventory,
    handleReceived,
    statusDropdownOptions,
    currentStatus,
  } = props;
  const { push, statusData } = useHeader();
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
          <Box
            onClick={() => push(AIR_SERVICES?.PURCHASE_ORDER)}
            sx={{ cursor: 'pointer' }}
          >
            <ViewDetailBackArrowIcon />
          </Box>
          <Typography variant="h5">Dell Purchase Order Details</Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => {
              handleReceived?.();
            }}
            disabled={statusData !== PURCHASE_ORDER_STATUS?.ORDERED}
          >
            Received item
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => handleAddToInventory?.()}
            disabled={statusData !== PURCHASE_ORDER_STATUS?.ORDERED}
          >
            Add to Inventory
          </Button>
          <SingleDropdownButton
            dropdownOptions={statusDropdownOptions}
            dropdownName={currentStatus}
          />

          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
      <br />
    </>
  );
};
