import React from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { IconPlusAddContractsFields } from '@/assets/icons';
import { styles } from './AddFields.styles';
import NoData from '@/components/NoData';
import { getFieldIcon } from '@/utils/contracts';
import FieldIcon from '../../../components/FieldIcon';
import Search from '@/components/Search';
import ModalCreateDataField from './ModalCreateDataField';
import useAddFields from './useAddFields';

interface AddFieldsProps {
  data: any;
}

export default function AddFields({ data }: AddFieldsProps) {
  const {
    anchorEl,
    open,
    handleClick,
    handleClose,

    methods,
    openModalCreateDataField,
    handleOpenModalCreateDataField,
    handleCloseModalCreateDataField,
    handleSubmitCreateDataField,
  } = useAddFields();

  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="outlined"
        className="small"
        color="inherit"
        startIcon={<IconPlusAddContractsFields />}
        fullWidth
      >
        Add Fields
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: { sx: { width: anchorEl?.offsetWidth || 'auto' } },
        }}
        sx={styles?.menu}
      >
        {(!data || data?.length === 0) && (
          <MenuItem disableRipple sx={styles?.plainItem}>
            <NoData height="auto" image={false} />
          </MenuItem>
        )}
        {data?.length > 0 && (
          <>
            <MenuItem disableRipple sx={styles?.search}>
              <Search placeholder="Search fields" size="small" fullWidth />
            </MenuItem>
            {data?.map((field: any) => (
              <MenuItem sx={styles?.fieldItem} key={field?.name}>
                <FieldIcon size={30}>{getFieldIcon(field?.type)}</FieldIcon>
                <Box>{field?.name}</Box>
              </MenuItem>
            ))}
          </>
        )}

        <MenuItem
          sx={styles.createNewField}
          disableGutters
          onClick={handleOpenModalCreateDataField}
        >
          <Box sx={styles?.icon}>
            <IconPlusAddContractsFields />
          </Box>
          Create new field
        </MenuItem>
      </Menu>

      <ModalCreateDataField
        open={openModalCreateDataField}
        onClose={handleCloseModalCreateDataField}
        methods={methods}
        onSubmit={handleSubmitCreateDataField}
      />
    </Box>
  );
}
