import React from 'react';
import { Box } from '@mui/material';
import { styles } from './DataFields.styles';
import AddFields from './AddFields';
// import { FIELD_TYPES } from '@/utils/contracts';
import AllFields from './AllFields';

export default function DataFields({
  handleAddDynamicField,
  allDataFields,
  handleUpdateDynamicField,
  handleRemoveDynamicField,
}: any) {
  return (
    <Box sx={styles?.dataFields}>
      <AddFields
        data={allDataFields}
        handleAddDynamicField={handleAddDynamicField}
      />

      <AllFields
        data={allDataFields}
        handleAddDynamicField={handleAddDynamicField}
        handleUpdateDynamicField={handleUpdateDynamicField}
        handleRemoveDynamicField={handleRemoveDynamicField}
      />
    </Box>
  );
}
