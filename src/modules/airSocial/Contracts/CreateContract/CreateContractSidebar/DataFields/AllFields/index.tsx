import React, { useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styles } from './AllFields.style';
import FieldIcon from '../../../components/FieldIcon';
import { getFieldIcon } from '@/utils/contracts';
import { FIELD_TYPES } from '@/utils/contracts';
import DataFieldText from '../../../form-fields/DataFieldText';
import DataFieldDate from '../../../form-fields/DataFieldDate';
import DataFieldCheckbox from '../../../form-fields/DataFieldCheckbox';
import DataFieldNumber from '../../../form-fields/DataFieldNumber';
import { defaultFieldsData } from '../../../CreateContract.data';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const allFields = [...defaultFieldsData, ...data];

  return (
    <Box sx={styles.allFields}>
      <Box sx={styles?.header}>
        <Typography variant="h6" sx={styles?.title}>
          All Fields
        </Typography>
      </Box>

      {/* {!data || (data?.length === 0 && <NoData height="auto" />)} */}
      {allFields?.length > 0 &&
        allFields?.map((field: any) => (
          <Box key={field?.id} sx={styles?.field}>
            <FieldIcon size={30}>{getFieldIcon(field?.type)}</FieldIcon>
            <Box sx={styles?.fieldInfo}>
              <Box sx={styles?.fieldName}>{field?.label}</Box>
              {getDataField(field)}
            </Box>
            <IconButton onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    padding: '10px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem>properties</MenuItem>
              <MenuItem>Duplicate field</MenuItem>
              <Divider />

              <MenuItem>Delete field</MenuItem>
              <Typography variant="body2" color={'#667085'}>
                connot be removed because <br /> it is part of the default field
                set
              </Typography>
            </Menu>
          </Box>
        ))}
    </Box>
  );
}
