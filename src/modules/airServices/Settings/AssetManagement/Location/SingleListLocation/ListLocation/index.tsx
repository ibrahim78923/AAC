import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import {
  AddPlusPrimaryIcon,
  DeleteIcon,
  DropdownMenuIcon,
  EditPenIcon,
} from '@/assets/icons';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AlertModals } from '@/components/AlertModals';

export const ListLocation = ({ continents, handleCollapse }: any) => {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  return (
    <>
      <Box bgcolor={theme?.palette?.grey[400]} p={1}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
          bgcolor={theme?.palette?.grey[100]}
          key={uuidv4()}
          boxShadow={2}
          padding={1.5}
          borderRadius={2}
          sx={{ cursor: 'pointer' }}
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => setShowIcon(false)}
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
            {showIcon && <AddPlusPrimaryIcon />}
            {showIcon && <EditPenIcon />}
            {showIcon && (
              <Box onClick={() => setIsOpenAlert(true)} display={'flex'}>
                <DeleteIcon />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <AlertModals
        message={'Are you Sure?'}
        type={'delete'}
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
        handleSubmitBtn={() => setIsOpenAlert(false)}
      />
    </>
  );
};
