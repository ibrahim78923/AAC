import React from 'react';
import { Box, Typography } from '@mui/material';
import NoData from '@/components/NoData';
import { styles } from './AllFields.style';
import FieldIcon from '../../../components/FieldIcon';
import { getFieldIcon } from '@/utils/contracts';
import { FIELD_TYPES } from '@/utils/contracts';
import DataFieldText from '../../../form-fields/DataFieldText';
import DataFieldDate from '../../../form-fields/DataFieldDate';
import DataFieldCheckbox from '../../../form-fields/DataFieldCheckbox';
import DataFieldNumber from '../../../form-fields/DataFieldNumber';

const getDataField = (field: any) => {
  switch (field?.type) {
    case FIELD_TYPES?.TEXT:
      return <DataFieldText data={field} />;

    case FIELD_TYPES?.DATE:
      return <DataFieldDate data={field} />;

    case FIELD_TYPES?.NUMBER:
      return <DataFieldNumber data={field} />;

    case FIELD_TYPES?.CHECKBOX:
      return <DataFieldCheckbox data={field} />;

    default:
      return <DataFieldText />;
  }
};

export default function AllFields({ data }: any) {
  return (
    <Box sx={styles.allFields}>
      <Box sx={styles?.header}>
        <Typography variant="h6" sx={styles?.title}>
          All Fields
        </Typography>
      </Box>

      {!data || (data?.length === 0 && <NoData height="auto" />)}
      {data?.length > 0 &&
        data?.map((field: any) => (
          <Box key={field?.id} sx={styles?.field}>
            <FieldIcon size={30}>{getFieldIcon(field?.type)}</FieldIcon>
            <Box sx={styles?.fieldInfo}>
              <Box sx={styles?.fieldName}>{field?.name}</Box>
              {getDataField(field)}
            </Box>
          </Box>
        ))}
    </Box>
  );
}
