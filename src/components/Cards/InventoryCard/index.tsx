import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { AlertModals } from '../../AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { splitCapitalizedWords } from '@/utils/api';
import { InventoryCardPropsI } from '../Cards.interface';

export const InventoryCard = (props: InventoryCardPropsI) => {
  const {
    heading,
    status,
    children,
    showChild,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    setDelateRecord,
    deletedRecordId,
    deleteIsLoading,
    hasDeleteIcon = true,
  } = props;

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
        sx={{ cursor: 'pointer' }}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Box display={'flex'} alignItems={'center'} gap={'.5rem'}>
          {hasDeleteIcon && showIcon && (
            <RemoveCircleOutlineIcon onClick={handleDeleteIcon} />
          )}
          <Typography
            variant={'h6'}
            color={theme?.palette?.primary?.main}
            textTransform={'capitalize'}
          >
            {heading?.toLowerCase()}
          </Typography>
        </Box>
        {status && (
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

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyItems={'center'}
              gap={'.3rem'}
            >
              <Typography color={theme?.palette?.grey[900]}>Status:</Typography>
              <Typography textTransform={'capitalize'} variant={'body1'}>
                {splitCapitalizedWords(status)}
              </Typography>
            </Box>
          </>
        )}
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
      {openDeleteModal && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          handleSubmitBtn={handleDelete}
          message="Are you sure want to delete this record?"
          loading={deleteIsLoading}
          disableCancelBtn={deleteIsLoading}
        />
      )}
    </>
  );
};
