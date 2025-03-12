import React from 'react';
import { Box, Typography } from '@mui/material';
import { getFieldIcon } from '@/utils/contracts';
import { FIELD_TYPES } from '@/utils/contracts';
import FieldIcon from '../../../CreateContract/components/FieldIcon';
import { styles } from './DataFields.style';

export default function DataFields({ dataFieldsData }: any) {
  return (
    <Box sx={styles.allFields}>
      <Box sx={styles?.header}>
        <Typography variant="h6" sx={styles?.title}>
          All Fields
        </Typography>
      </Box>

      {dataFieldsData?.map((field: any, index: number) => {
        const getFieldValue = () => {
          if (field?.[field.name] === '' || field?.[field.name] === null) {
            return '--';
          }
          if (field?.type === FIELD_TYPES?.DATE) {
            return new Date(field?.[field.name]).toLocaleDateString();
          }
          return field?.[field.name];
        };

        return (
          <Box key={field?.id || `field-${index}`} sx={styles?.field}>
            <FieldIcon size={30}>{getFieldIcon(field?.type)}</FieldIcon>
            <Box sx={styles?.fieldInfo}>
              <Box sx={styles?.fieldName}>{field?.label}</Box>
              <Box sx={styles?.fieldValue}>{getFieldValue()}</Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
