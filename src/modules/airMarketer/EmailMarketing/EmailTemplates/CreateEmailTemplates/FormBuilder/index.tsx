import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import FormField from './FormField';
import FormControls from './FormControls';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { styles } from './styles';
import { isNullOrEmpty } from '@/utils';
import { BackArrowIcon } from '@/assets/icons';
import { Field } from './interface';
import { fieldTypes, ItemTypes } from '@/constants/form-builder';
import { useState } from 'react';
import CommonModal from '@/components/CommonModal';
import CustomLabel from '@/components/CustomLabel';
import { usePostEmailTemplatesMutation } from '@/services/airMarketer/emailTemplates';
import { enqueueSnackbar } from 'notistack';

const FormBuilder = ({ fields, setFields, setOpenModal }: any) => {
  const theme = useTheme();

  const handleDrop = (item: any) => {
    if (!item?.type) return;

    const newField: Field = {
      _id: uuidv4(),
      type: item?.type,
      name: `field-${fields?.length + 1}`,
      label: `Label ${item?.type}`,
      value:
        item.type === fieldTypes?.text || item.type === fieldTypes?.textarea
          ? ''
          : undefined,
      values:
        item?.type === fieldTypes?.select
          ? [
              { label: 'Option 1', value: 'option-1', selected: false },
              { label: 'Option 2', value: 'option-2', selected: false },
            ]
          : undefined,
      required: false,
      space: item?.type === fieldTypes?.space ? 20 : undefined,
      dividerWidth: item?.type === fieldTypes?.divider ? 1 : undefined,
      dividerColor:
        item?.type === fieldTypes?.divider
          ? theme?.palette?.custom?.light_lavender_gray
          : undefined,
      buttonType: item?.type === fieldTypes?.button ? 'submit' : undefined,
      buttonText: item?.type === fieldTypes?.button ? 'Submit' : undefined,
    };
    setFields([...fields, newField]);
  };

  const [isTitleModal, setIsTitleModal] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item: any, monitor) => {
      const didDropInside = monitor.didDrop();
      if (!didDropInside && item.source === 'control') {
        handleDrop(item);
      }
    },
  });

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const draggedField = fields[dragIndex];
    const updatedFields = [...fields];
    updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, draggedField);
    setFields(updatedFields);
  };

  const handleRemove = (id?: string) => {
    setFields(fields.filter((field: any) => field?._id !== id));
  };

  const handleFieldChange = (
    id: string,
    updatedField: Partial<Field>,
    deleteOption?: string,
  ) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: Field) => {
        if (field?._id === id) {
          if (deleteOption) {
            return {
              ...field,
              values: field?.values?.filter(
                (opt) => opt.value !== deleteOption,
              ),
            };
          } else {
            return { ...field, ...updatedField };
          }
        }
        return field;
      }),
    );
  };

  const addOption = (id: string) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: any) => {
        if (field._id === id) {
          return {
            ...field,
            values: [
              ...field?.values,
              {
                label: `Option ${field?.values?.length + 1}`,
                value: `option-${field?.values?.length + 1}`,
                selected: false,
              },
            ],
          };
        }
        return field;
      }),
    );
  };

  const handelPostTemplateProcess = () => {
    if (fields?.length > 0) {

      setIsTitleModal(true);
    } else {
      enqueueSnackbar('Nothing to post!', {
        variant: 'error',
      });
    }
  };

  const [postEmailTemplate] = usePostEmailTemplatesMutation();

  const handelPostTemplate: () => void = async () => {
    const payload = {
      name: titleValue,
      data: fields,
    };
    try {
      await postEmailTemplate({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Template created successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', {
        variant: 'error',
      });
    }
  };

  return (
    <Box sx={styles?.wrapper}>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Box
            sx={{
              background: theme.palette?.common?.white,
              borderRadius: '8px',
              p: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h5"
                display={'flex'}
                alignItems={'center'}
                sx={{ pb: 2 }}
              >
                {' '}
                <Box sx={{ cursor: 'pointer', marginRight: '10px' }}>
                  {' '}
                  <BackArrowIcon />
                </Box>{' '}
                Back To Templates
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Button variant="outlined" onClick={() => setOpenModal(true)}>
                  Preview
                </Button>
                <Button variant="contained" onClick={handelPostTemplateProcess}>
                  Save
                </Button>
              </Box>
            </Box>
            <Box sx={styles?.contentPaper}>
              <Box ref={drop} sx={styles?.dropZone}>
                {isNullOrEmpty(fields) && (
                  <Box
                    sx={{
                      border: `1px dashed ${theme?.palette?.grey[900]}`,
                      borderRadius: '8px',
                      height: '180px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Drag and Drop the content to build your own custom Form
                    </Typography>
                  </Box>
                )}
                {fields.map((field: Field, index: number) => {
                  return (
                    <FormField
                      id={field?._id}
                      key={field?._id}
                      index={index}
                      field={field}
                      onRemove={handleRemove}
                      onChange={handleFieldChange}
                      addOption={addOption}
                      moveField={moveField}
                      source="form"
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box sx={styles?.sideBar}>
            <FormControls />
          </Box>
        </Grid>
      </Grid>

      <CommonModal
        open={isTitleModal}
        handleClose={() => setIsTitleModal(false)}
        handleCancel={() => setIsTitleModal(false)}
        handleSubmit={handelPostTemplate}
        title=""
        okText="Save"
        isSubmitDisabled={titleValue?.length > 0 ? false : true}
        footer
      >
        <>
          <CustomLabel label="Template Title" />
          <TextField
            fullWidth
            placeholder="Enter Tile"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            sx={{
              '& input': {
                height: '11px',
                color: theme?.palette?.blue?.main,
              },
            }}
          />
        </>
      </CommonModal>
    </Box>
  );
};

export default FormBuilder;
