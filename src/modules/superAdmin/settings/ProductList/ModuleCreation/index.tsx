import React, { useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import TanstackTable from '@/components/Tabel/TanstackTable';

import {
  moduleCreationColumns,
  rightsColumns,
  subModuleColumns,
} from './ModuleCreation.data';

import { moduleCreationData } from '@/mock/modules/superAdmin/Settings/ProductList/ModuleCreation';

import { styles } from './ModuleCreation.style';

const ModuleCreation = () => {
  const [subModuleData, setSubModuleData] = useState();
  const [rightsData, setRightsData] = useState();

  const theme = useTheme();

  const getModuleCreationColumns = moduleCreationColumns(setSubModuleData);
  const getSubModuleColumns = subModuleColumns(setRightsData);
  const getRightsColumns = rightsColumns();
  return (
    <Box>
      <Box sx={styles.moduleCreationMain(theme)}>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Typography variant="h3" color={theme.palette.grey[800]}>
            Module creation
          </Typography>
          <Typography
            variant="h6"
            mt={2}
            color={theme.palette.custom.grayish_blue}
            fontWeight={600}
          >
            Modules
          </Typography>
        </Box>
        <TanstackTable
          columns={getModuleCreationColumns}
          data={moduleCreationData}
        />
      </Box>

      <Box
        mt={2}
        sx={{
          border: `1px solid ${theme.palette.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box sx={styles.subModuleHeader(theme)}>
          <Typography
            variant="h6"
            color={theme.palette.common.white}
            fontWeight={600}
          >
            Sub-Modules
          </Typography>
        </Box>
        {subModuleData && (
          <TanstackTable columns={getSubModuleColumns} data={subModuleData} />
        )}
      </Box>

      <Box
        mt={2}
        sx={{
          border: `1px solid ${theme.palette.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box sx={styles.subModuleHeader(theme)}>
          <Typography
            variant="h6"
            color={theme.palette.common.white}
            fontWeight={600}
          >
            Sub-Modules
          </Typography>
        </Box>
        {rightsData && (
          <TanstackTable columns={getRightsColumns} data={rightsData} />
        )}
      </Box>
    </Box>
  );
};

export default ModuleCreation;
