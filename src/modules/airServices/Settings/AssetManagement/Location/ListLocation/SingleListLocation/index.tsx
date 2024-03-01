import { Box, Divider, Typography } from '@mui/material';
import { DropdownMenuIcon } from '@/assets/icons';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import React from 'react';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import router from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { useSingleListLocation } from './useSingleListLocation';

export const SingleListLocation = ({
  continents,
  handleCollapse,
  editData,
}: any) => {
  const {
    showIcon,
    setShowIcon,
    theme,
    setIsOpenAlert,
    isOpenAlert,
    handleDeleteSubmit,
  } = useSingleListLocation();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
        bgcolor={'white'}
        boxShadow={2}
        padding={1.5}
        borderRadius={2}
        sx={{ cursor: 'pointer' }}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        mb={2}
        mt={2}
      >
        <Box display={'flex'}>
          <Box onClick={handleCollapse} display={'flex'}>
            <DropdownMenuIcon />
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
          <Typography>{continents}</Typography>
        </Box>
        <Box gap={1} display={'flex'}>
          {showIcon && (
            <AddCircleRoundedIcon
              color="primary"
              fontSize="small"
              onClick={() =>
                router?.push({
                  pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                })
              }
            />
          )}
          {showIcon && (
            <BorderColorIcon
              fontSize="small"
              color="primary"
              onClick={() =>
                router?.push({
                  pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                  query: {
                    editData: JSON.stringify(editData),
                  },
                })
              }
            />
          )}
          {showIcon && (
            <DeleteIcon
              fontSize="small"
              color="primary"
              onClick={() => setIsOpenAlert(true)}
            />
          )}
        </Box>
      </Box>
      <AlertModals
        message={'Are you sure you want to delete this list?'}
        type={ALERT_MODALS_TYPE?.DELETE}
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
        handleSubmitBtn={handleDeleteSubmit}
      />
    </>
  );
};
