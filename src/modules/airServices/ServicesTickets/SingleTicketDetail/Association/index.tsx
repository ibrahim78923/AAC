import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Stack } from '@mui/material';
import Assets from './Assets';
import Deals from './Deals';
import Contacts from './Contacts';
import Companies from './Companies';
import { drawerInitialState, getDropdownOptions } from './Association.data';
import { useState } from 'react';

export default function Association({ ticketType }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState({ ...drawerInitialState });

  const dropdownOptions = getDropdownOptions({ setIsDrawerOpen });

  return (
    <Stack direction={'column'} spacing={2}>
      <Box textAlign={'end'}>
        <SingleDropdownButton
          dropdownName={'Associate'}
          btnVariant={'contained'}
          color={'primary'}
          dropdownOptions={dropdownOptions}
        />
      </Box>
      <Assets
        ticketType={ticketType}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <Deals isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Contacts isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      {isDrawerOpen?.company && <Companies />}
    </Stack>
  );
}
