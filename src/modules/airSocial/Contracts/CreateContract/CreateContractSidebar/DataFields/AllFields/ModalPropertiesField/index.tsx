import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CommonDialog from '@/components/CommonDialog';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import {
  PropertiesCheckboxFields,
  PropertiesDateFields,
  PropertiesNumberFields,
  PropertiesSelectFields,
  PropertiesTextFields,
} from './AddPropertiesFields.data';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  methods: any;
  onSubmit: () => void;
  selectedField: any;
  AddDescription: any;
  fields: any;
  append: any;
  remove: any;
  register: any;
  setValue: any;
}

export default function ModalPropertiesField({
  open,
  onClose,
  methods,
  onSubmit,
  selectedField,
  AddDescription,
  fields,
  append,
  remove,
  register,
  setValue,
}: ModalProps) {
  const renderModalContent = () => {
    switch (selectedField?.type) {
      case 'date':
        return `${selectedField?.label}`;
      case 'text':
        return `${selectedField?.label}`;
      case 'checkbox':
        return `${selectedField?.label}`;
      case 'select':
        return `${selectedField?.label}`;
      case 'number':
        return `${selectedField?.label}`;
      default:
        return `${selectedField?.label}`;
    }
  };

  const renderShowField = () => {
    switch (selectedField?.type) {
      case 'date':
        return PropertiesDateFields;
      case 'text':
        return PropertiesTextFields;
      case 'checkbox':
        return PropertiesCheckboxFields;
      case 'select':
        return PropertiesSelectFields;
      case 'number':
        return PropertiesNumberFields;
      default:
        return PropertiesNumberFields;
    }
  };

  useEffect(() => {
    selectedField?.options?.forEach((opt: any) => {
      append({ label: opt?.label, value: opt?.label });
    });
  }, [selectedField]);

  return (
    <CommonDialog
      title={renderModalContent()}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      okText={'Create'}
      cancelText={'Cancel'}
      width={'416px'}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={'22px'}>
          {renderShowField()?.map((item: any, index: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={item?.componentProps?.name}
              sx={{ paddingTop: '10px !important' }}
            >
              {index === 2 && AddDescription && (
                <RHFTextField
                  type="text"
                  name="description"
                  label=""
                  placeholder="enter text...."
                  fullWidth
                  sx={{ marginBottom: '20px' }}
                  rows={4}
                  multiline
                  required={AddDescription}
                />
              )}
              {index === 1 &&
                AddDescription &&
                selectedField?.type === 'checkbox' && (
                  <RHFTextField
                    type="text"
                    name="description"
                    label=""
                    placeholder="enter text...."
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    rows={4}
                    multiline
                    required={AddDescription}
                  />
                )}
              {selectedField?.type === 'checkbox' && index === 0 && (
                <Box>
                  {index === 0 && (
                    <Grid item xs={5}>
                      <FormLabel sx={{ display: 'flex' }}>
                        <Typography variant="body2"> Field options</Typography>
                      </FormLabel>
                    </Grid>
                  )}
                  {fields?.map((item: any, index: any) => (
                    <Grid container key={item.id} sx={{ gap: 1, mb: '10px' }}>
                      <Grid item xs={10}>
                        <TextField
                          size="small"
                          placeholder="option"
                          fullWidth
                          {...register(`options.${index}.label`)}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setValue(`options.${index}.label`, newValue);
                            setValue(`options.${index}.value`, newValue);
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton onClick={() => remove(index)}>
                          <CancelIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}

                  <Button
                    onClick={() => append({ label: '', value: '' })}
                    sx={() => ({
                      color: '#667085',
                      marginBottom: '15px',
                      fontWeight: '500',
                    })}
                    startIcon={<ControlPointOutlinedIcon />}
                  >
                    Add option
                  </Button>
                </Box>
              )}
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
              {selectedField?.type === 'select' && index === 2 && (
                <Typography variant="body2" color={'#98A2B3'}>
                  Add a label that's going to show next to the checkbox in the
                  document content
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDialog>
  );
}
