import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  useTheme,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { inputTypeList } from './data';
import { fieldTypes } from '@/utils/form-builder';

const EditDialog = ({ open, onClose, field, onChange, addOption }: any) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle
        sx={{
          fontSize: '18px !important',
          fontWeight: '700',
          pt: '15px',
          pb: '15px',
          borderBottom: `1px solid ${theme?.palette?.grey[400]}`,
        }}
      >
        {'Edit Field'}
      </DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme?.palette?.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: '15px' }}>
        <Grid container spacing={2}>
          {/* Required */}
          {(field?.type === fieldTypes?.text ||
            field?.type === fieldTypes?.textarea ||
            field?.type === fieldTypes?.select ||
            field?.type === fieldTypes?.file) && (
            <Grid item xs={12}>
              <FormControlLabel
                label="Required"
                control={
                  <Checkbox
                    checked={field?.required}
                    onChange={(e) =>
                      onChange(field?._id, { required: e.target.checked })
                    }
                  />
                }
              />
            </Grid>
          )}

          {/* Label */}
          {(field?.type === fieldTypes?.text ||
            field?.type === fieldTypes?.textarea ||
            field?.type === fieldTypes?.select ||
            field?.type === fieldTypes?.file) && (
            <Grid item xs={12}>
              <Box>Label:</Box>
              <TextField
                fullWidth
                size="small"
                value={field.label}
                onChange={(e) =>
                  onChange(field?._id, { label: e?.target?.value })
                }
              />
            </Grid>
          )}

          {/* Placeholder */}
          {(field?.type === fieldTypes?.text ||
            field?.type === fieldTypes?.textarea ||
            field?.type === fieldTypes?.select ||
            field?.type === fieldTypes?.file) && (
            <Grid item xs={12}>
              <Box>Placeholder:</Box>
              <TextField
                fullWidth
                size="small"
                value={field?.placeholder}
                onChange={(e) =>
                  onChange(field?._id, { placeholder: e?.target?.value })
                }
              />
            </Grid>
          )}

          {/* Button Types */}
          {field?.type === fieldTypes?.button && (
            <>
              <Grid item xs={12}>
                <Box>Type:</Box>
                <TextField
                  fullWidth
                  size="small"
                  select
                  onChange={(e) =>
                    onChange(field?._id, { buttonType: e?.target?.value })
                  }
                  value={field?.buttonType}
                >
                  <MenuItem value="button">Button</MenuItem>
                  <MenuItem value="reset">Reset</MenuItem>
                  <MenuItem value="submit">Submit</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box>Text:</Box>
                <TextField
                  fullWidth
                  size="small"
                  value={field?.buttonText}
                  onChange={(e) =>
                    onChange(field?._id, { buttonText: e?.target?.value })
                  }
                />
              </Grid>
            </>
          )}

          {/* Input types */}
          {field?.type === fieldTypes?.text && (
            <Grid item xs={12}>
              <Box>Subtype:</Box>
              <TextField
                fullWidth
                size="small"
                select
                onChange={(e) =>
                  onChange(field?._id, { subtype: e?.target?.value })
                }
                value={field?.subtype}
              >
                {inputTypeList?.map((option: any) => (
                  <MenuItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {/* Select Options */}
          {field?.type === fieldTypes?.select && (
            <Grid item xs={12}>
              <Box
                component={'ul'}
                sx={{
                  listStyle: 'none',
                  padding: '5px 0',
                  margin: '0',
                  border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
                  '& > li + li': {
                    borderTop: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
                  },
                }}
              >
                {field?.values?.map((option: any) => (
                  <Box
                    component="li"
                    key={option?.value}
                    sx={{
                      display: 'flex',
                      gap: '5px',
                      padding: '5px 10px 5px 0',
                    }}
                  >
                    <Checkbox
                      checked={option?.selected}
                      onChange={(e) =>
                        onChange(field._id, {
                          values: field.values.map((opt: any) =>
                            opt.value === option.value
                              ? { ...opt, selected: e.target.checked }
                              : opt,
                          ),
                        })
                      }
                    />
                    <TextField
                      fullWidth
                      size="small"
                      value={option?.label}
                      onChange={(e) =>
                        onChange(field?._id, {
                          values: field?.values?.map((opt: any) =>
                            opt.value === option?.value
                              ? { ...opt, label: e?.target?.value }
                              : opt,
                          ),
                        })
                      }
                    />
                    <TextField
                      fullWidth
                      size="small"
                      value={option?.value}
                      onChange={(e) =>
                        onChange(field?._id, {
                          values: field?.values?.map((opt: any) =>
                            opt.value === option?.value
                              ? { ...opt, value: e?.target?.value }
                              : opt,
                          ),
                        })
                      }
                    />
                    <IconButton
                      onClick={() => onChange(field._id, {}, option.value)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Button
                  size="small"
                  endIcon={<AddIcon />}
                  onClick={() => addOption(field._id)}
                >
                  Add Option
                </Button>
              </Box>
            </Grid>
          )}
          {field?.type === fieldTypes?.divider && (
            <>
              <Grid item xs={12}>
                <Box>Color:</Box>
                <MuiColorInput
                  fullWidth
                  size="small"
                  format="hex"
                  value={field?.dividerColor}
                  onChange={(newValue) =>
                    onChange(field?._id, { dividerColor: newValue })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box>Width:</Box>
                <TextField
                  fullWidth
                  size="small"
                  value={field?.dividerWidth}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    if (/^\d*$/.test(value)) {
                      const numericValue =
                        value === '' ? '' : Math.max(0, Number(value));
                      onChange(field?._id, { dividerWidth: numericValue });
                    }
                  }}
                  helperText="Enter only number (minimum 0)."
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </Grid>
            </>
          )}
          {field?.type === fieldTypes?.space && (
            <>
              <Grid item xs={12}>
                <Box>Vertical Space:</Box>
                <TextField
                  fullWidth
                  size="small"
                  value={field?.space}
                  onChange={(e) => {
                    const value = e?.target?.value;
                    if (/^\d*$/.test(value)) {
                      const numericValue =
                        value === '' ? '' : Math.max(0, Number(value));
                      onChange(field?._id, { space: numericValue });
                    }
                  }}
                  helperText="Enter only number (minimum 0)."
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
