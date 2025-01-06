import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import { IconCloseDialog } from '@/assets/icons';
import { CommonDialogProps } from './CommonDialog.interface';
import { LoadingButton } from '@mui/lab';
import { styles } from './CommonDialog.style';

export default function CommonDialog(props: CommonDialogProps) {
  const {
    title,
    closeIcon = true,
    onSubmit,
    okText = 'Save',
    cancelText,
    children,
    isLoading,
    renderFooter,
    width = 'sm',
    isFooter = true,
    ...dialogProps
  } = props;

  const isTitle = () => !!title;

  return (
    <Dialog {...dialogProps} fullWidth sx={styles.dialog(width)}>
      {title && <DialogTitle sx={styles.dialogTitle}>{title}</DialogTitle>}

      {closeIcon && (
        <IconButton
          aria-label="close"
          onClick={(event) => props?.onClose?.(event, 'escapeKeyDown')}
          sx={(theme) => styles.closeButton(theme, isTitle())}
        >
          <IconCloseDialog />
        </IconButton>
      )}

      <DialogContent sx={styles?.dialogContent}>{children}</DialogContent>

      {isFooter && (
        <DialogActions>
          {renderFooter ? (
            <>{renderFooter}</>
          ) : (
            <>
              {cancelText && (
                <Button
                  onClick={(event) => props?.onClose?.(event, 'escapeKeyDown')}
                  variant="outlined"
                  color="inherit"
                  className="small"
                >
                  {cancelText}
                </Button>
              )}
              <LoadingButton
                onClick={onSubmit}
                loading={isLoading}
                variant="contained"
                size="small"
                sx={{
                  height: '36px',
                }}
              >
                {okText}
              </LoadingButton>
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
