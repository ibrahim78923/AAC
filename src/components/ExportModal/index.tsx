import * as React from 'react';
import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { ExportModalImage } from '@/assets/images';
import Image from 'next/image';
import { EXPORT_TYPE, MESSAGE_EXPORT_FILE_TYPE } from '@/constants/strings';

export const ExportModal = ({ open, onSubmit, handleClose }: any) => {
  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <DialogTitle
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            justifyContent={'center'}
            display={'flex'}
            flexDirection={'row'}
            gap={2}
          >
            <Image
              src={ExportModalImage}
              alt={'export-image'}
              height={24}
              width={24}
              style={{ marginTop: '0.4rem' }}
            />
            <Typography variant="h3">Export Record</Typography>
          </Box>
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </DialogTitle>

        <DialogContent dividers>
          <Typography>File Format</Typography>
          <Grid
            container
            mt={2}
            justifyContent={'space-between'}
            display={'flex'}
            flexDirection={'row'}
            alignContent={'center'}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                sx={{ mr: '12rem' }}
                value={MESSAGE_EXPORT_FILE_TYPE?.[EXPORT_TYPE?.CSV]}
                control={<Radio />}
                label="CSV"
              />
              <FormControlLabel
                value={MESSAGE_EXPORT_FILE_TYPE?.[EXPORT_TYPE?.XLS]}
                control={<Radio />}
                label="XLS"
              />
            </RadioGroup>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <LoadingButton
            onClick={handleClose}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant="contained" onClick={onSubmit}>
            Export
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
