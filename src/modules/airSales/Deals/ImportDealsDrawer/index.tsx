import React from 'react';

import { Typography, Box } from '@mui/material';

import ImportMapColumnsDeal from './ImportColumns';

import useImportDeal from './useImportDeal';

import { styles } from './ImportDealsDrawer.style';
import CommonDrawer from '@/components/CommonDrawer';

const ImportDealsDrawer = ({ open, onClose }: any) => {
  const { handleSubmit, isColumnsSelect, theme } = useImportDeal();
  const okTitle = isColumnsSelect ? 'Import' : 'Next';

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      submitHandler={handleSubmit}
      footer
      isOk
      okText={okTitle}
      title="Import"
    >
      <Typography sx={styles.selectColTypography(theme)}>
        {isColumnsSelect
          ? 'Map Columns from your file to the right CRM fields. Your 5 unmapped columns won’t be imported'
          : 'Uploaded file must have these columns'}
      </Typography>

      <Typography variant="h6" sx={styles.Typograpghy(theme)}>
        Step {isColumnsSelect ? '2' : '1'} of 2
      </Typography>
      {!isColumnsSelect ? (
        <Box sx={{ mt: '20px' }}>
          <ul
            style={{
              paddingLeft: '30px',
              color: theme?.palette?.grey[500],
            }}
          >
            <li>Name</li>
            <li>Deal Value</li>
          </ul>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.grey[600], my: '10px' }}
          >
            Import Deals
          </Typography>
        </Box>
      ) : (
        <ImportMapColumnsDeal />
      )}
    </CommonDrawer>
  );
};

export default ImportDealsDrawer;
