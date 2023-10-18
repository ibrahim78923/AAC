import { MobileIcon } from '@/assets/icons';
import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { callingData } from '@/mock/modules/SocialComponents/Calling';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { columns } from './Calling.data';

const Calling = () => {
  const [callingSeatch, setCallingSeatch] = useState();
  const getColumns = columns();
  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box sx={{ padding: '16px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '19px',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Calling
          </Typography>
          <Button variant="contained">
            <MobileIcon /> &nbsp; Connect a Number
          </Button>
        </Box>
        <Box
          mt={2}
          mb={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Search
            label={'Search here'}
            searchBy={callingSeatch}
            setSearchBy={setCallingSeatch}
            width="100%"
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          ></Box>
        </Box>
      </Box>

      <TanstackTable columns={getColumns} data={callingData} />
    </Box>
  );
};

export default Calling;
