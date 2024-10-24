import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { EXPORT_TYPE } from '@/constants/strings';
import { useState } from 'react';
import { ExportModalPropsI } from './ExportModal.interface';
import { errorSnackbar } from '@/lib/snackbar';
import { CustomCommonDialog } from '../CustomCommonDialog';

export const ExportModal = (props: ExportModalPropsI) => {
  const { open, onSubmit, handleClose, disableCancelBtn, loading } = props;

  const [exportType, setExportType] = useState('');

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={open}
        closePortal={() => {
          handleClose?.();
          setExportType?.('');
        }}
        dialogTitle=" Export Record"
        submitButtonText="Assign"
        showSubmitLoader={loading}
        disabledCancelButton={disableCancelBtn}
        handleSubmitButton={() => {
          if (!!!exportType)
            return errorSnackbar('Please select a file format to export');
          onSubmit?.(exportType);
          setExportType?.('');
        }}
      >
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
      </CustomCommonDialog>
    </>
  );
};
