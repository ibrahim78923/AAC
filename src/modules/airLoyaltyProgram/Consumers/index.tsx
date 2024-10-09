import ConsumersIcon from '@/assets/icons/modules/loyaltyProgram/Consumers/consumers-icon';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export const Consumers = () => {
  const [search, setSearch] = useState('');
  return (
    <Box>
      <PageTitledHeader title={'Consumers'} />
      <Box display={'flex'} justifyContent={'space-between'}>
        <Search
          label="Search Here"
          width={'16.25rem'}
          size="small"
          setSearchBy={setSearch}
          searchBy={search}
        />
        <Button
          className="small"
          variant="outlined"
          startIcon={<ConsumersIcon />}
        >
          Customize
        </Button>
      </Box>
    </Box>
  );
};
