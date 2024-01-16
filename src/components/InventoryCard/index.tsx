import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CardPropsI } from './InventoryCard.interface';
import { AlertModals } from '../AlertModals';

export const InventoryCard = ({
  heading,
  status,
  children,
  showChild,
  openDeleteModal,
  setOpenDeleteModal,
  handleDelete,
  setDelateRecord,
  deletedRecordId,
}: CardPropsI) => {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  const handleDeleteIcon = () => {
    setDelateRecord(deletedRecordId);
    setOpenDeleteModal(true);
  };
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'start'}
        flexWrap={'wrap'}
        borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
        boxShadow={2}
        padding={1.5}
        borderRadius={2}
        marginBottom={2}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'.5rem'}
          sx={{ cursor: 'pointer' }}
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
        >
          {showIcon && <RemoveCircleOutlineIcon onClick={handleDeleteIcon} />}
          <Typography variant="h6" color={theme?.palette?.primary?.main}>
            {heading}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            margin: '0 2rem',
            border: `.1rem solid ${theme?.palette?.grey[700]}`,
            backgroundColor: 'transparent',
          }}
        />
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyItems={'center'}
          gap={'.3rem'}
        >
          <Typography color={theme?.palette?.grey[900]}>Status:</Typography>
          <Typography>{status}</Typography>
        </Box>
        {showChild && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                margin: '0 2rem',
                border: `.1rem solid ${theme?.palette?.grey[700]}`,
                backgroundColor: 'transparent',
              }}
            />
            {children}
          </>
        )}
      </Box>

      <AlertModals
        type="delete"
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleSubmitBtn={handleDelete}
        message="Are you sure want to delete this record?"
      />
    </>
  );
};
