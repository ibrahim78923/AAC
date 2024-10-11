import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { EXPORT_TYPE } from '@/constants/strings';
import { useState } from 'react';
import { ExportReportIcon } from '@/assets/icons';
import { errorSnackbar } from '@/utils/api';
import { ExportModalPropsI } from './ExportModal.interface';

export const ExportModal = (props: ExportModalPropsI) => {
  const {
    open,
    onSubmit,
    handleClose,
    disableCancelBtn,
    isDisableSubmitBtn = false,
    loading,
  } = props;
  const [exportType, setExportType] = useState('');
  return (
    <>
      <Dialog
        onClose={() => {
          handleClose?.();
          setExportType?.('');
        }}
        open={open}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <ExportReportIcon />
              <Typography variant="h4" color="slateBlue.main">
                Export Record
              </Typography>
            </Box>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => handleClose?.()}
            />
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" color="slateBlue.main" my={2}>
            File Format
          </Typography>
          <RadioGroup
            row
            sx={{ justifyContent: 'space-between' }}
            name="exportType"
            value={exportType}
            onChange={(e: any) => setExportType(e?.target?.value)}
          >
            <FormControlLabel
              sx={{ flex: 0.5 }}
              value={EXPORT_TYPE?.CSV}
              control={<Radio />}
              label="CSV"
            />
            <FormControlLabel
              sx={{ flex: 0.5 }}
              value={EXPORT_TYPE?.XLS}
              control={<Radio />}
              label="XLS"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
          <LoadingButton
            className="small"
            onClick={() => {
              handleClose?.();
              setExportType?.('');
            }}
            color="secondary"
            variant="outlined"
            disabled={disableCancelBtn}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            className="small"
            variant="contained"
            disabled={isDisableSubmitBtn}
            loading={loading}
            onClick={() => {
              if (!!!exportType)
                return errorSnackbar('Please select a file format to export');
              onSubmit?.(exportType);
              setExportType?.('');
            }}
          >
            Export
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
