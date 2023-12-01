import TanstackTable from '@/components/Table/TanstackTable';
import React, { useState } from 'react';
import { columns, templateWhatsAppMarketing } from './Template.data';
import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { PlusIcon } from '@/assets/icons';

const Templates = ({ handelSwitch, setIsCreateTemplate }: any) => {
  const getColumns = columns();

  const [setSearchBy] = useState('');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '10px',
          '@media (max-width:581px)': {
            flexDirection: 'column-reverse',
          },
        }}
      >
        <Search label="Search here" setSearchBy={setSearchBy} />
        <Button
          variant="contained"
          sx={{
            width: '169px',
            border: '1.5px solid #e7e7e9',
            whiteSpace: 'nowrap',
            '@media (max-width:581px)': {
              width: '100%',
            },
          }}
          className="small"
          onClick={() => {
            handelSwitch(false);
            setIsCreateTemplate(true);
          }}
        >
          <PlusIcon /> &nbsp; Create Template
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TanstackTable
          data={templateWhatsAppMarketing}
          columns={getColumns}
          isPagination
        />
      </Box>
    </>
  );
};

export default Templates;
