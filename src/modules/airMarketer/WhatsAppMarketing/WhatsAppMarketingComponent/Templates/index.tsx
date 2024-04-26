import TanstackTable from '@/components/Table/TanstackTable';
import React, { useState } from 'react';
import { columns, templateWhatsAppMarketing } from './Template.data';
import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import { PlusIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';

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
          <PermissionsGuard
            permissions={[AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS.SEARCH]}
          >
            <Search
              size="small"
              label="Search here"
              setSearchBy={setSearchBy}
            />
          </PermissionsGuard>

          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS.CREATE_TEMPLATE,
            ]}
          >
            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              className="small"
              onClick={() => {
                handelSwitch(false);
                setIsCreateTemplate(true);
                setTemplateType('Create');
              }}
            >
              Create Template
            </Button>
          </PermissionsGuard>
        </Box>

        <Box sx={{ mt: 2 }}>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS.TEMPLATES_LIST_VIEW,
            ]}
          >
            <TanstackTable
              data={templateWhatsAppMarketing}
              columns={getColumns}
              isPagination
            />
          </PermissionsGuard>

          {isDeleteTemplate && (
            <AlertModals
              message={'Are you sure you want to delete this template ?'}
              type="delete"
              open={isDeleteTemplate}
              handleClose={() => setIsDeleteTemplate(false)}
              handleSubmitBtn={() => setIsDeleteTemplate(false)}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Templates;
