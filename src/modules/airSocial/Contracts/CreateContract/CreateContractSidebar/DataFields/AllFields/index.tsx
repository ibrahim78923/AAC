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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModalDuplicateDataField from './ModalDuplicateDataField';
import useAllFields from './useAllFields';
import ModalPropertiesField from './ModalPropertiesField';

const getDataField = (index: number, field: any) => {
  switch (field?.type) {
    case FIELD_TYPES?.TEXT:
      return <DataFieldText index={index} data={field} />;

    case FIELD_TYPES?.DATE:
      return <DataFieldDate index={index} data={field} />;

    case FIELD_TYPES?.NUMBER:
      return <DataFieldNumber index={index} data={field} />;

    case FIELD_TYPES?.CHECKBOX:
      return <DataFieldCheckbox index={index} data={field} />;

    case FIELD_TYPES?.SELECT:
      return <DataFieldCheckbox index={index} data={field} />;

    default:
      return <DataFieldText index={index} data={field} />;
  }
};

export default function AllFields({
  data,
  handleAddDynamicField,
  handleUpdateDynamicField,
  handleRemoveDynamicField,
}: any) {
  const {
    allFields,
    methods,
    openModalCreateDataField,
    handleCloseModalCreateDataField,
    handleSubmitCreateDataField,
    handleCloseModal,
    openModal,
    PropertiesMethods,
    handleSubmitPropertiesField,
    selectedField,
    AddDescription,
    fields,
    append,
    remove,
    register,
    setOpenModalCreateDataField,
    setIndexValue,
    setOpenModal,
    setSelectedField,
    setValue,
  } = useAllFields(handleAddDynamicField, handleUpdateDynamicField, data);

  return (
    <Box sx={styles.allFields}>
      <Box sx={styles?.header}>
        <Typography variant="h6" sx={styles?.title}>
          All Fields
        </Typography>
      </Box>

      {/* {!data || (data?.length === 0 && <NoData height="auto" />)} */}
      {allFields?.length > 0 &&
        allFields?.map((field: any, index: number) => (
          <Box key={field?.id || `field-${index}`} sx={styles?.field}>
            <FieldIcon size={30}>{getFieldIcon(field?.type)}</FieldIcon>
            <Box sx={styles?.fieldInfo}>
              <Box sx={styles?.fieldName}>{field?.label}</Box>
              {getDataField(index, field)}
            </Box>
            <CustomMenu
              field={field}
              index={index}
              setOpenModalCreateDataField={setOpenModalCreateDataField}
              setIndexValue={setIndexValue}
              setOpenModal={setOpenModal}
              setSelectedField={setSelectedField}
              handleRemoveDynamicField={handleRemoveDynamicField}
            />
          </Box>
        ))}

      <ModalDuplicateDataField
        open={openModalCreateDataField}
        onClose={handleCloseModalCreateDataField}
        methods={methods}
        onSubmit={handleSubmitCreateDataField}
      />

      <ModalPropertiesField
        open={openModal}
        onClose={handleCloseModal}
        methods={PropertiesMethods}
        onSubmit={handleSubmitPropertiesField}
        selectedField={selectedField}
        AddDescription={AddDescription}
        fields={fields}
        append={append}
        remove={remove}
        register={register}
        setValue={setValue}
      />
    </Box>
  );
}

const CustomMenu = ({
  field,
  index,
  setOpenModalCreateDataField,
  setIndexValue,
  setOpenModal,
  setSelectedField,
  handleRemoveDynamicField,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, field: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedField(field);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenPropertiesModal = (index: any) => {
    setIndexValue(index);
    setOpenModal(true);
    handleClose();
  };

  const handleOpenModalCreateDataField = () => {
    handleClose();
    setOpenModalCreateDataField(true);
  };

  return (
    <>
      <IconButton onClick={(event) => handleClick(event, field)}>
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
        <MenuItem onClick={() => handleOpenPropertiesModal(index)}>
          properties
        </MenuItem>
        <MenuItem onClick={handleOpenModalCreateDataField}>
          Duplicate field
        </MenuItem>
        <Divider />

        <MenuItem
          disabled={[0, 1, 2, 3, 4]?.includes(index)}
          onClick={() => handleRemoveDynamicField(index)}
        >
          Delete field
        </MenuItem>
        <Typography variant="body2" color={'#667085'}>
          connot be removed because <br /> it is part of the default field set
        </Typography>
      </Menu>
    </>
  );
};
