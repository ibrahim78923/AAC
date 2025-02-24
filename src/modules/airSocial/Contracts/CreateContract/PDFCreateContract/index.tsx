import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styles } from './PDFCreateContract.style';
import { IconAddText, IconAddSignature } from '@/assets/icons';
import DefaultAttachment from '../form-fields/DefaultAttachmentEdit';
import usePDFCreateContract from './usePDFCreateContract';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { mockUsers } from './data';
import ContractTitle from '../form-fields/ContractTitle';

export default function PDFCreateContract() {
  const {
    textComponents,
    handleAddText,
    handleDeleteText,

    anchorEl,
    open,
    handleClick,
    handleClose,
    signatureFields,
    handleAddSignature,
    handleDeleteSignature,
  } = usePDFCreateContract();

  return (
    <Grid container spacing={'24px'}>
      <Grid item xs={12} sm={8}>
        <ContractTitle height={56} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.buttonCard}>
          <Button
            variant="contained"
            size="small"
            className="small"
            startIcon={<IconAddText />}
            onClick={handleAddText}
            disabled
          >
            Add text
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.buttonCard}>
          <Button
            variant="contained"
            size="small"
            className="small"
            startIcon={<IconAddSignature />}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
            disabled
          >
            Add signature
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
              '& .MuiList-root.MuiMenu-list': {
                minWidth: '220px',
              },
            }}
          >
            {mockUsers.map((user) => (
              <MenuItem
                key={user?.id}
                sx={{ gap: '10px' }}
                onClick={() => {
                  handleAddSignature(user?.name);
                  handleClose();
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: 'primary.main',
                    fontSize: '13px',
                    width: '35px',
                    height: '35px',
                  }}
                ></Avatar>
                <Box sx={{ '& .MuiTypography-root': { lineHeight: '1.2' } }}>
                  <Typography variant="body1">{user?.name}</Typography>
                  <Typography variant="body2">{user?.role}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DefaultAttachment
          addTextComponent={textComponents}
          addSignatureFields={signatureFields}
          onClickTextDelete={handleDeleteText}
          onClickSignatureDelete={handleDeleteSignature}
        />
      </Grid>
    </Grid>
  );
}
