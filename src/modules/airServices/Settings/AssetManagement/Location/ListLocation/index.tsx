import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import {
  AddPlusPrimaryIcon,
  DeleteIcon,
  DropdownMenuIcon,
  EditPenIcon,
  PlusSharedColorIcon,
} from '@/assets/icons';
import React from 'react';

export const ListLocation = ({ continents, country }: any) => {
  const theme: any = useTheme();
  const [showIcon, setShowIcon] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const handleClickicon = () => {
    // console.log('clicked!');
  };
  return (
    <Box bgcolor={theme?.palette?.grey[400]} p={1}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
        bgcolor={theme?.palette?.grey[100]}
        boxShadow={2}
        padding={1.5}
        borderRadius={2}
        sx={{ cursor: 'pointer' }}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        <Box display={'flex'}>
          <Box onClick={() => setShowDropdownMenu(true)} display={'flex'}>
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
            <Box onClick={handleClickicon} display={'flex'}>
              <AddPlusPrimaryIcon />
            </Box>
          )}
          {showIcon && (
            <Box onClick={handleClickicon} display={'flex'}>
              {' '}
              <EditPenIcon />
            </Box>
          )}
          {showIcon && (
            <Box onClick={handleClickicon} display={'flex'}>
              <DeleteIcon />
            </Box>
          )}
        </Box>
      </Box>
      {showDropdownMenu && (
        <Box
          p={5}
          border={`.1rem solid ${theme?.palette?.grey[700]}`}
          bgcolor={theme?.palette?.grey[700]}
          boxShadow={2}
          borderRadius={2}
          mt={1}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            border={`.1rem solid ${theme?.palette?.grey[700]}`}
            bgcolor={theme?.palette?.grey[100]}
            padding={1}
            sx={{ cursor: 'pointer' }}
          >
            <Box display={'flex'}>
              <Typography color={'primary'}>L</Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  margin: '0 2rem',
                  border: `.1rem solid ${theme?.palette?.grey[700]}`,
                  backgroundColor: 'transparent',
                }}
              />
              <Typography>{country}</Typography>
            </Box>
          </Box>
          <Box mt={1}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mr: 5 }}
              startIcon={<PlusSharedColorIcon />}
            >
              Add City
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
