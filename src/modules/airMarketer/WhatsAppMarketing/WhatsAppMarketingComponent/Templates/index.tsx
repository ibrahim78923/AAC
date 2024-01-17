import TanstackTable from '@/components/Table/TanstackTable';
import React, { useState } from 'react';
import { columns, templateWhatsAppMarketing } from './Template.data';
import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { PlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';

const Templates = ({
  handelSwitch,
  setIsCreateTemplate,
  setTemplateType,
}: any) => {
  const [isDeleteTemplate, setIsDeleteTemplate] = useState(false);

  const getColumns = columns({
    handelSwitch,
    setIsCreateTemplate,
    setTemplateType,
    setIsDeleteTemplate,
  });
  const [setSearchBy] = useState('');

  return (
    <>
      <Box sx={{ padding: '20px' }}>
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
              setTemplateType('Create');
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
          <AlertModals
            message={'Are you sure you want to delete this template ?'}
            type="delete"
            open={isDeleteTemplate}
            handleClose={() => setIsDeleteTemplate(false)}
            handleSubmitBtn={() => setIsDeleteTemplate(false)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Templates;
