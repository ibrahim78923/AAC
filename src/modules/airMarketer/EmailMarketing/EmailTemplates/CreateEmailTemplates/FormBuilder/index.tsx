import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import FormField from './FormField';
import FormControls from './FormControls';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { styles } from './styles';
import { isNullOrEmpty } from '@/utils';
import { BackArrowIcon } from '@/assets/icons';
import { Field } from './interface';
import { fieldTypes, ItemTypes } from '@/constants/form-builder';

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
            <Box>
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

              <Button variant="outlined" onClick={() => setOpenModal(true)}>
                Preview
              </Button>
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
    </Box>
  );
};

export default FormBuilder;
