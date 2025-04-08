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
import ContractTitle from '../form-fields/ContractTitle';
import { useFormContext, useWatch } from 'react-hook-form';
import NoData from '@/components/NoData';



function PDFCreateContract() {
  const {
    handleAddText,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleAddSignature,
  } = usePDFCreateContract();

  const { watch } = useFormContext();
  const defaultAttachment = watch('attachment');
  const signeeValues = useWatch({
    name: 'signees',
  });

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
            disabled={!defaultAttachment}
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
            disabled={!defaultAttachment}
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
            {(!signeeValues || signeeValues?.length === 0) && (
              <MenuItem disableRipple sx={styles?.plainItem}>
                <NoData height="auto" image={false} />
              </MenuItem>
            )}


            {signeeValues.map((signee: any, index: number) => (
              <MenuItem
                key={signee?._id || `${signee?.name}-${index}`}
                sx={{ gap: '10px' }}
                onClick={() => {
                  handleClose();
                  handleAddSignature(signee);
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
                  <Typography variant="body1">{signee?.name}</Typography>
                  <Typography variant="body2">{signee?.email}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DefaultAttachment />
      </Grid>
    </Grid>
  );
}

export default React.memo(PDFCreateContract);
